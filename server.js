import express from "express";
import ejs from "ejs";
import pg from "pg";
import env from "dotenv";
import bcrypt from "bcrypt";
import session from "express-session";
import flash from "connect-flash";


const app = express();
const port = process.env.PORT || 3000;
env.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
}));


app.use(flash());
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

const saltRounds = 10;

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
})
db.connect();




app.use(express.static("public"));

//Home Page / Login page for admin
app.get("/", (req,res)=>{

  res.render("index.ejs");
});

app.get("/clients", (req,res)=>{
  res.render("clients.ejs");
});

app.get("/expenses", (req,res)=>{
  res.render("expenses.ejs");
});

app.get("/parents", async (req, res) => {
  try {
    // Query to fetch parents along with emergency contacts and children's names
    const result = await db.query(`
      SELECT
        p.parent_id,
        p.first_name AS parent_first_name,
        p.last_name AS parent_last_name,
        p.email,
        p.phone_number,
        p.address,
        p.updated_at,
        ec.contact_name AS emergency_contact_name,
        ec.contact_relationship,
        ec.contact_phone AS emergency_contact_phone,
        ec.contact_address AS emergency_contact_address,
        ec.contact_email AS emergency_contact_email,
        c.child_id,
        c.first_name AS child_first_name,
        c.last_name AS child_last_name
      FROM parent p
      LEFT JOIN emergency_contact ec ON p.parent_id = ec.parent_id
      LEFT JOIN child c ON p.parent_id = c.parent_id
      ORDER BY p.updated_at DESC;
    `);

    const rows = result.rows;

    // Organize parents, children, and emergency contacts
    const parentsMap = {};
    rows.forEach(row => {
      const parentId = row.parent_id;

      // Check if we already created a parent entry
      if (!parentsMap[parentId]) {
        parentsMap[parentId] = {
          parent_id: row.parent_id,
          first_name: row.parent_first_name,
          last_name: row.parent_last_name,
          email: row.email,
          phone_number: row.phone_number,
          address: row.address,
          updated_at: row.updated_at,
          emergency_contact: {
            name: row.emergency_contact_name,
            relationship: row.contact_relationship,
            phone: row.emergency_contact_phone,
            address: row.emergency_contact_address,
            email: row.emergency_contact_email,
          },
          children: []
        };
      }

      // Add child if exists
      if (row.child_id) {
        parentsMap[parentId].children.push({
          child_id: row.child_id,
          first_name: row.child_first_name,
          last_name: row.child_last_name,
        });
      }
    });

    // Convert parentsMap to an array
    const parents = Object.values(parentsMap);
    console.log(parents);

    // Render dashboard with parents data
    res.render("parents.ejs", { parents });
  } catch (error) {
    console.error("Error fetching data:", error);
    req.flash("error", "Failed to load data");
    res.redirect("/");
  }
});


//Admin Page 
app.post("/admin", async (req, res) => {
  const email_attempt = req.body["email"];
  const password_attempt = req.body["password"];

  try {
    const result = await db.query("SELECT email, password_hash FROM admin WHERE email = $1", [email_attempt]);

    if (result.rows.length === 0) {
      req.flash("error", "Email not found");
      return res.redirect("/");
    }

    const password_hash = result.rows[0].password_hash;
    const isMatch = await bcrypt.compare(password_attempt, password_hash);

    if (isMatch) {
      console.log("Login successful");
      res.send("Login successful");
    } else {
      req.flash("error", "Invalid password");
      return res.redirect("/");
    }
  } catch (error) {
    console.error("Error during login:", error);
    req.flash("error", "Internal server error");
    res.redirect("/");
  }
});



app.listen(port, ()=>{
  console.log(`Server is listening for requests on port ${port}`);
})

