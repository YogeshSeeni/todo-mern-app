const express = require("express");
const app = express();
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");

require("dotenv").config();
const port = process.env.PORT || 5000;

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to DB!");
  }
);

app.use(express.json());
app.use("/api/user", authRoutes);

app.listen(port, () => {
  console.log("Server Started!");
});
