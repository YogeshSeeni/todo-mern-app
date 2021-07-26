const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
var cors = require("cors");

const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todo");

require("dotenv").config();
const port = process.env.PORT || 5000;
app.use(cors());

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to DB!");
  }
);

const jwtVerify = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};

app.get("/", (req, res) => {
  res.send("MERN App Backend");
});

app.get("/verifytoken", (req, res) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    res.send("Valid");
  } catch (err) {
    res.status(400).send("Invalid");
  }
});

app.use(express.json());
app.use("/api/user", authRoutes);
app.use("/todo", jwtVerify, todoRoutes);

app.listen(port, () => {
  console.log("Server Started!");
});
