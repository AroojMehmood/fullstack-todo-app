import { useState } from "react";

// Ek single todo ko represent karta hai.
// Teen kaam: complete toggle karna, edit karna, delete karna.
// Saare actual API calls parent (App.jsx) mein hote hain — yeh component sirf UI + local edit-state sambhalta hai.
const TodoItem = ({ todo, onToggle, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [busy, setBusy] = useState(false);

  const startEdit = () => {
    setEditText(todo.text);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const saveEdit = async () => {
    const trimmed = editText.trim();
    if (!trimmed) return; // Khali text save nahi hone dena

    setBusy(true);
    await onEdit(todo.id, trimmed);
    setBusy(false);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    setBusy(true);
    await onDelete(todo.id);
    // Agar delete fail ho jaye to busy false karo taake button dobara enable ho
    setBusy(false);
  };

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id, !todo.completed)}
        disabled={busy}
        aria-label={`Mark "${todo.text}" as ${todo.completed ? "incomplete" : "complete"}`}
      />

      {isEditing ? (
        <input
          type="text"
          className="edit-input"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          autoFocus
          disabled={busy}
          onKeyDown={(e) => {
            if (e.key === "Enter") saveEdit();
            if (e.key === "Escape") cancelEdit();
          }}
        />
      ) : (
        <span className="todo-text">{todo.text}</span>
      )}

      <div className="todo-actions">
        {isEditing ? (
          <>
            <button className="btn-save" onClick={saveEdit} disabled={busy}>
              Save
            </button>
            <button className="btn-cancel" onClick={cancelEdit} disabled={busy}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button className="btn-edit" onClick={startEdit} disabled={busy}>
              Edit
            </button>
            <button className="btn-delete" onClick={handleDelete} disabled={busy}>
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
