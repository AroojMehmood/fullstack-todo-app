import { useState } from "react";
import { useProjects } from "../context/ProjectContext.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import Loader from "../components/Loader.jsx";

const statusLabels = {
  active: "Active",
  "on-hold": "On Hold",
  completed: "Completed",
};
const statusOptions = ["active", "on-hold", "completed"];

const Projects = () => {
  const {
    projects,
    loading,
    error,
    reloadProjects,
    addProject,
    editProject,
    removeProject,
  } = useProjects();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Edit state — jis project ki id yahan hai wahi edit mode mein hai
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editStatus, setEditStatus] = useState("active");
  const [editError, setEditError] = useState("");
  const [editSubmitting, setEditSubmitting] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    setFormError("");

    const trimmed = title.trim();
    if (!trimmed) {
      setFormError("Project title is required.");
      return;
    }

    setSubmitting(true);
    try {
      await addProject({ title: trimmed, description: "", status: "active" });
      setTitle("");
      setShowForm(false);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const startEdit = (project) => {
    setEditingId(project.id);
    setEditTitle(project.title);
    setEditStatus(project.status);
    setEditError("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditError("");
  };

  const handleEditSave = async (project) => {
    setEditError("");
    const trimmed = editTitle.trim();
    if (!trimmed) {
      setEditError("Project title is required.");
      return;
    }

    setEditSubmitting(true);
    try {
      await editProject(project.id, { title: trimmed, status: editStatus });
      setEditingId(null);
    } catch (err) {
      setEditError(err.message);
    } finally {
      setEditSubmitting(false);
    }
  };

  const handleDelete = async (project) => {
    if (
      window.confirm(
        `Delete project "${project.title}"? This will also delete its tasks.`,
      )
    ) {
      await removeProject(project.id);
    }
  };

  return (
    <div className="todo-card" style={{ maxWidth: "700px" }}>
      <div className="todo-header-row">
                <header className="todo-header" style={{ marginBottom: 0, textAlign: "left" }}>
          <h1>My Projects</h1>
          <p className="todo-subtext" style={{ marginTop: "4px" }}>
            Click a project to view and manage its tasks.
          </p>
        </header>
        <button className="logout-btn" onClick={() => setShowForm((s) => !s)}>
          {showForm ? "Cancel" : "+ New Project"}
        </button>
      </div>

      {showForm && (
        <form className="todo-form form-stacked" onSubmit={handleCreate}>
          <input
            type="text"
            placeholder="Project title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={submitting}
          />
          <ErrorMessage message={formError} />
          <button type="submit" disabled={submitting}>
            {submitting ? "Creating..." : "Create Project"}
          </button>
        </form>
      )}

      <ErrorMessage message={error} onRetry={reloadProjects} />

      {loading ? (
        <Loader />
      ) : projects.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📁</div>
          <p className="empty-state-title">No projects yet</p>
          <p className="empty-state-subtext">
            Create your first project to get started.
          </p>
        </div>
      ) : (
        <ul className="todo-list">
          {projects.map((project) =>
            editingId === project.id ? (
              <li
                key={project.id}
                className="todo-item"
                style={{ flexDirection: "column", alignItems: "stretch" }}
              >
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="edit-input"
                  disabled={editSubmitting}
                />
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="select-input"
                  style={{ marginTop: "8px" }}
                  disabled={editSubmitting}
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>
                      {statusLabels[s]}
                    </option>
                  ))}
                </select>
                <ErrorMessage message={editError} />
                <div className="todo-actions" style={{ marginTop: "8px" }}>
                  <button
                    className="btn-save"
                    onClick={() => handleEditSave(project)}
                    disabled={editSubmitting}
                  >
                    {editSubmitting ? "Saving..." : "Save"}
                  </button>
                  <button
                    className="btn-cancel"
                    onClick={cancelEdit}
                    disabled={editSubmitting}
                  >
                    Cancel
                  </button>
                </div>
              </li>
            ) : (
              <li key={project.id} className="todo-item">
                <div style={{ flex: 1 }}>
                  <a href={`/projects/${project.id}`} className="link-plain">
                    {project.title}
                  </a>
                  <div style={{ fontSize: "0.75rem", color: "#7A7393" }}>
                    {statusLabels[project.status]}
                  </div>
                </div>
                <div className="todo-actions">
                  <button
                    className="btn-edit"
                    onClick={() => startEdit(project)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(project)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ),
          )}
        </ul>
      )}
    </div>
  );
};

export default Projects;
