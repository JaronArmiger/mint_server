require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const authRouter = require("./routes/auth");
const categoryRouter = require("./routes/category");
const farmRouter = require("./routes/farm");
const productRouter = require("./routes/product");

const DB_URI = process.env.DB_URI;

const app = express();

app.use(express.json());

app.use(authRouter);
app.use(categoryRouter);
app.use(farmRouter);
app.use(productRouter);

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
