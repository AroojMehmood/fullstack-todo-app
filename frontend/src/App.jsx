import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm.jsx";
import TodoList from "./components/TodoList.jsx";
import Loader from "./components/Loader.jsx";
import ErrorMessage from "./components/ErrorMessage.jsx";
import { fetchTodos, addTodo, updateTodo, deleteTodo } from "./api/todoApi.js";

// App.jsx = "brain" of the app.
// Yahan saara state rehta hai aur saare API calls yahin se trigger hote hain.
// Components (Form, List, Item) sirf UI dikhate hain aur functions call karte hain jo yahan defined hain.
function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true); // Page load par todos fetch hote waqt true
  const [error, setError] = useState("");

  // Component mount hote hi ek baar todos load karo
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchTodos();
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Naya todo add karo
  const handleAdd = async (text) => {
    setError("");
    try {
      const newTodo = await addTodo(text);
      setTodos((prev) => [...prev, newTodo]);
    } catch (err) {
      setError(err.message);
    }
  };

  // Complete/incomplete toggle karo
  const handleToggle = async (id, completed) => {
    setError("");
    try {
      const updated = await updateTodo(id, { completed });
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  // Todo ka text edit karo
  const handleEdit = async (id, text) => {
    setError("");
    try {
      const updated = await updateTodo(id, { text });
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  // Todo delete karo
  const handleDelete = async (id) => {
    setError("");
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="app-shell">
      <div className="aurora-bg" aria-hidden="true"></div>

      <main className="todo-card">
        <header className="todo-header">
          <h1>My Todos</h1>
          {!loading && todos.length > 0 && (
            <p className="todo-subtext">
              {completedCount} of {todos.length} completed
            </p>
          )}
        </header>

        <TodoForm onAdd={handleAdd} />

        <ErrorMessage message={error} />

        {loading ? (
          <Loader />
        ) : (
          <TodoList
            todos={todos}
            onToggle={handleToggle}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  );
}

export default App;
