require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// const productRouter = require("./routes/product");

const DB_URI = process.env.DB_URI;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("the color violet");
});

mongoose
  .connect(DB_URI)
  .then(() => console.log("db connected"))
  .catch((e) => console.log(e));

app.listen(process.env.PORT || 3000, () => {
  console.log("let's go");
});
