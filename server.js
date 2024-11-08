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

app.get("/", (req,res)=>{

  res.render("index.ejs");
})



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

