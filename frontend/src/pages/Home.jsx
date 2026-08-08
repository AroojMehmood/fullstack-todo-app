import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoForm from "../components/TodoForm.jsx";
import TodoList from "../components/TodoList.jsx";
import Loader from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import { fetchTodos, addTodo, updateTodo, deleteTodo } from "../api/todoApi.js";

function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadTodos();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

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

  const handleAdd = async (text) => {
    setError("");
    try {
      const newTodo = await addTodo(text);
      setTodos((prev) => [...prev, newTodo]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggle = async (id, completed) => {
    setError("");
    try {
      const updated = await updateTodo(id, { completed });
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = async (id, text) => {
    setError("");
    try {
      const updated = await updateTodo(id, { text });
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  };

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
        <div className="todo-header-row">
          <header className="todo-header" style={{ marginBottom: 0, textAlign: "left" }}>
            <h1>My Todos</h1>
            {!loading && todos.length > 0 && (
              <p className="todo-subtext">
                {completedCount} of {todos.length} completed
              </p>
            )}
          </header>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

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

export default Home;