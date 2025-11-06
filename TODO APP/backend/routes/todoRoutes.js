const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");

//Beginning CRUD

//read/get
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find(); //fetches all todos
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//create new todo
router.post("/", async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo); //201 = created
  } catch (err) {
    res.status(400).json({ message: err.message }); //400 = bad request
  }
});

//update
router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id); // Add req.params.id here!
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    todo.completed = !todo.completed; //flips the status of the todo when called
    const updated = await todo.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//delete

router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Todo deleted successfuly" });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
