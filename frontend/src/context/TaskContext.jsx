import { createContext, useState, useContext, useEffect } from "react";
import {
  fetchTasks,
  addTask as addTaskApi,
  updateTask as updateTaskApi,
  deleteTask as deleteTaskApi,
} from "../api/taskApi.js";

const TaskContext = createContext(null);

// projectId zaroori hai — ye context sirf ek project ke tasks manage karta hai
export const TaskProvider = ({ children, projectId }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const loadTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchTasks(projectId);
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (payload) => {
    setError("");
    try {
      const newTask = await addTaskApi({ ...payload, project: projectId });
      setTasks((prev) => [newTask, ...prev]);
      return newTask;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const editTask = async (id, updates) => {
    setError("");
    try {
      const updated = await updateTaskApi(id, updates);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const removeTask = async (id) => {
    setError("");
    try {
      await deleteTaskApi(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const value = {
    tasks,
    loading,
    error,
    reloadTasks: loadTasks,
    addTask,
    editTask,
    removeTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used inside a TaskProvider");
  }
  return context;
};