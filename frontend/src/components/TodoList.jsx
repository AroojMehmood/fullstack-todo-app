import TodoItem from "./TodoItem.jsx";

// List component — sirf todos array ko loop karke TodoItem render karta hai.
// Agar list khali hai to ek friendly empty-state message dikhata hai.
const TodoList = ({ todos, onToggle, onEdit, onDelete }) => {
  if (todos.length === 0) {
    return <p className="empty-state">No todos yet. Add one above to get started ✨</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default TodoList;
