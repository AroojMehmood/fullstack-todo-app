// Controller file — yahan actual CRUD logic likha hai.
// Routes sirf batate hain "kaunsa URL", controller batata hai "kya karna hai".

const { todos, getNextId } = require("../data/todos");

// GET /api/todos -> sab todos wapas bhejo
const getTodos = (req, res) => {
  res.status(200).json(todos);
};

// POST /api/todos -> naya todo add karo
const createTodo = (req, res) => {
  const { text } = req.body;

  // Validation: khali ya missing text allow nahi
  if (!text || typeof text !== "string" || text.trim() === "") {
    return res.status(400).json({ message: "Todo text is required." });
  }

  const newTodo = {
    id: getNextId(),
    text: text.trim(),
    completed: false,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
};

// PUT /api/todos/:id -> existing todo edit karo (text aur/ya completed status)
const updateTodo = (req, res) => {
  const id = Number(req.params.id);
  const { text, completed } = req.body;

  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({ message: `Todo with id ${id} not found.` });
  }

  // Agar text bheja gaya hai to update karo, warna purana rehne do
  if (text !== undefined) {
    if (typeof text !== "string" || text.trim() === "") {
      return res.status(400).json({ message: "Todo text cannot be empty." });
    }
    todo.text = text.trim();
  }

  // Agar completed bheja gaya hai to update karo
  if (completed !== undefined) {
    todo.completed = Boolean(completed);
  }

  res.status(200).json(todo);
};

// DELETE /api/todos/:id -> todo delete karo
const deleteTodo = (req, res) => {
  const id = Number(req.params.id);
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: `Todo with id ${id} not found.` });
  }

  const deleted = todos.splice(index, 1);
  res.status(200).json(deleted[0]);
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
