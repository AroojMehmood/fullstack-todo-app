import { useState } from "react";
import { useTodos } from "../context/TodoContext.jsx";

// Ek single todo ko represent karta hai. `todo` data prop se aata hai,
// lekin toggle/edit/delete actions ab seedha TodoContext se milte hain —
// TodoList ke through drill nahi karte.
const TodoItem = ({ todo }) => {
  const { toggleTodo, editTodo, deleteTodoItem } = useTodos();
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
    if (!trimmed) return;

    setBusy(true);
    await editTodo(todo.id, trimmed);
    setBusy(false);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    setBusy(true);
    await deleteTodoItem(todo.id);
    setBusy(false);
  };

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id, !todo.completed)}
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