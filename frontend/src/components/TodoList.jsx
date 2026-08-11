import TodoItem from "./TodoItem.jsx";
import { useTodos } from "../context/TodoContext.jsx";

// List component — todos seedha TodoContext se leta hai (props nahi).
const TodoList = () => {
  const { todos } = useTodos();

  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon" aria-hidden="true">📝</div>
        <p className="empty-state-title">No tasks yet</p>
        <p className="empty-state-subtext">
          Add your first task above to get started.
        </p>
        <button
          type="button"
          className="empty-state-btn"
          onClick={() => document.querySelector(".todo-form input")?.focus()}
        >
          + Add a task
        </button>
      </div>
    );
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;