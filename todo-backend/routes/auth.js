const router = require("express").Router();
const User = require("../models/User");
const { registerValidation } = require("../models/Validations");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  try {
    await user.save();
    res.send("Successfully Register User");
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/login", (req, res) => {
  res.send("Login route");
});

module.exports = router;
