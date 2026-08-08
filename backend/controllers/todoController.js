const Todo = require("../models/Todo");

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch todos." });
  }
};

const createTodo = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== "string" || text.trim() === "") {
      return res.status(400).json({ message: "Todo text is required." });
    }

    const newTodo = await Todo.create({ text: text.trim(), user: req.user._id });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: "Failed to create todo." });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, completed } = req.body;

    const todo = await Todo.findOne({ _id: id, user: req.user._id });

    if (!todo) {
      return res.status(404).json({ message: `Todo with id ${id} not found.` });
    }

    if (text !== undefined) {
      if (typeof text !== "string" || text.trim() === "") {
        return res.status(400).json({ message: "Todo text cannot be empty." });
      }
      todo.text = text.trim();
    }

    if (completed !== undefined) {
      todo.completed = Boolean(completed);
    }

    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({ message: "Todo not found." });
    }
    res.status(500).json({ message: "Failed to update todo." });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Todo.findOneAndDelete({ _id: id, user: req.user._id });

    if (!deleted) {
      return res.status(404).json({ message: `Todo with id ${id} not found.` });
    }

    res.status(200).json(deleted);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({ message: "Todo not found." });
    }
    res.status(500).json({ message: "Failed to delete todo." });
  }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };