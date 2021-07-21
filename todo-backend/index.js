const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todo");

require("dotenv").config();
const port = process.env.PORT || 5000;

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

app.use(express.json());
app.use("/api/user", authRoutes);
app.use("/todo", jwtVerify, todoRoutes);

app.listen(port, () => {
  console.log("Server Started!");
});
