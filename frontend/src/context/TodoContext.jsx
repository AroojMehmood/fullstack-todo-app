import { createContext, useState, useContext, useEffect } from "react";
import { fetchTodos, addTodo as addTodoApi, updateTodo, deleteTodo } from "../api/todoApi.js";

// TodoContext: todos, loading, error, aur CRUD functions poore Home page mein share karta hai.
// Isse TodoList aur TodoItem ko seedha data milega — Home se prop-drill karne ki zarurat nahi.
const TodoContext = createContext(null);

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const addTodo = async (text) => {
    setError("");
    try {
      const newTodo = await addTodoApi(text);
      setTodos((prev) => [...prev, newTodo]);
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleTodo = async (id, completed) => {
    setError("");
    try {
      const updated = await updateTodo(id, { completed });
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  const editTodo = async (id, text) => {
    setError("");
    try {
      const updated = await updateTodo(id, { text });
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTodoItem = async (id) => {
    setError("");
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const value = {
    todos,
    loading,
    error,
    reloadTodos: loadTodos,
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodoItem,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

// Custom hook — components isko use karenge context access karne ke liye
export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodos must be used inside a TodoProvider");
  }
  return context;
};