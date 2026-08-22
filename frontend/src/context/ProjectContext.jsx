import { createContext, useState, useContext, useEffect } from "react";
import {
  fetchProjects,
  addProject as addProjectApi,
  updateProject as updateProjectApi,
  deleteProject as deleteProjectApi,
} from "../api/projectApi.js";

const ProjectContext = createContext(null);

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addProject = async (payload) => {
    setError("");
    try {
      const newProject = await addProjectApi(payload);
      setProjects((prev) => [newProject, ...prev]);
      return newProject;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const editProject = async (id, updates) => {
    setError("");
    try {
      const updated = await updateProjectApi(id, updates);
      setProjects((prev) => prev.map((p) => (p.id === id ? updated : p)));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const removeProject = async (id) => {
    setError("");
    try {
      await deleteProjectApi(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const value = {
    projects,
    loading,
    error,
    reloadProjects: loadProjects,
    addProject,
    editProject,
    removeProject,
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjects must be used inside a ProjectProvider");
  }
  return context;
};