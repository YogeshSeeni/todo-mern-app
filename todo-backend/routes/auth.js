const router = require("express").Router();
const User = require("../model/User");

router.post("/register", (req, res) => {
  res.send("Register route");
});

router.post("/login", (req, res) => {
  res.send("Login route");
});

module.exports = router;
