// Routes file — yahan URLs define hote hain aur unhe controller functions se jodte hain.

const express = require("express");
const router = express.Router();
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

router.get("/", getTodos);       // GET    /api/todos
router.post("/", createTodo);    // POST   /api/todos
router.put("/:id", updateTodo);  // PUT    /api/todos/:id
router.delete("/:id", deleteTodo); // DELETE /api/todos/:id

module.exports = router;
