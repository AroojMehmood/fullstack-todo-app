import { useState } from "react";
import { useTodos } from "../context/TodoContext.jsx";

// Form component — sirf naya todo add karne ke liye responsible hai.
// Ab onAdd prop ki zarurat nahi — addTodo seedha TodoContext se milta hai.
const TodoForm = () => {
  const { addTodo } = useTodos();
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmed = text.trim();
    if (!trimmed) return;

    setSubmitting(true);
    await addTodo(trimmed);
    setSubmitting(false);
    setText("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={submitting}
        aria-label="New todo text"
      />
      <button type="submit" disabled={submitting || !text.trim()}>
        {submitting ? "Adding..." : "Add"}
      </button>
    </form>
  );
};

export default TodoForm;