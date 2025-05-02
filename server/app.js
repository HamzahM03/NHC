import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./config/db.js";



const app = express();
app.use(express.json());

connectDB();


app.get("/", (req,res)=>{
  res.send ("hello world!");
})

app.listen(3000, () => {
  console.log(`Listening for requests on port 3000`);
})