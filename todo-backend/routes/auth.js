const router = require("express").Router();
const User = require("../models/User");
const {
  registerValidation,
  loginValidation,
} = require("../models/Validations");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
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

    await user.save();
    res.send("Successfully Register User");
  } catch (e) {
    res.status(400).send("Sorry, something went wrong.");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser) {
      res.status(400).send("Email does not exist");
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
    if (validPassword) {
      const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_SECRET);
      res.send({
        token: token,
      });
    } else {
      res.status(400).send("Invalid Password");
    }
  } catch (e) {
    res.status(400).send("Sorry, something went wrong.");
  }
});

module.exports = router;
