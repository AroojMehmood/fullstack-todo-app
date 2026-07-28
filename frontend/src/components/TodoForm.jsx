import { useState } from "react";

// Form component — sirf naya todo add karne ke liye responsible hai.
// onAdd prop ek function hai jo App.jsx se aata hai (parent handle karta hai actual logic).
const TodoForm = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Page reload rokne ke liye (default form behavior)

    const trimmed = text.trim();
    if (!trimmed) return; // Khali text submit nahi hone dena

    setSubmitting(true);
    await onAdd(trimmed);
    setSubmitting(false);
    setText(""); // Input field clear kar do success ke baad
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
