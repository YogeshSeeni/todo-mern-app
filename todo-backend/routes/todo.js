const router = require("express").Router();
const User = require("../models/User");

const uniqueIdGen = () => {
  const min = 0;
  const max = 100000;

  return Math.floor(Math.random() * (max - min) + min);
};

router.get("/gettodos", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) res.send("Not a valid user");

    res.send(user.todos);
  } catch (e) {
    res.status(400).send("Could not fetch todos");
  }
});

router.post("/addtodo", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) res.send("Not a valid user");

    let todo = {
      completed: false,
      body: req.body.body,
      id: uniqueIdGen(),
    };
    user.todos = [...user.todos, todo];
    await user.save();
    res.send(`Added ${req.body.body}`);
  } catch (e) {
    res.status(400).send(`Could not add todo: "${req.body.body}"`);
  }
});

router.delete("/deletetodo", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) res.send("Not a valid user");

    for await (let todo of user.todos) {
      if (todo.id == req.body.id) {
        user.todos.splice(user.todos.indexOf(todo), 1);
        user.save();
        return res.send(`Deleted element with id: ${req.body.id}`);
      }
    }
  } catch (e) {
    res.status(400).send(`Could not delete todo with id: ${req.body.id}`);
  }
});

router.put("/updatetodo", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) res.send("Not a valid user");

    let todos = [];

    for await (let todo of user.todos) {
      if (todo.id == req.body.id) {
        const userIndex = user.todos.indexOf(todo);
        user.todos[userIndex].body = req.body.body;
      }
      todos.push(todo);
    }

    const modifications = await User.updateOne(
      { _id: req.user._id },
      { todos: todos }
    );
    res.send(`Updated todo with id: ${req.body.id}`);
  } catch (e) {
    console.log(e);
    res.status(400).send(`Could not delete todo with id: ${req.body.id}`);
  }
});

module.exports = router;
