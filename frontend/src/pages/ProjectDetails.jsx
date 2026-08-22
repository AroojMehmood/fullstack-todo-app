import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { TaskProvider, useTasks } from "../context/TaskContext.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import Loader from "../components/Loader.jsx";

const statusOptions = ["todo", "in-progress", "completed"];
const priorityOptions = ["low", "medium", "high"];

const statusLabels = {
  todo: "To Do",
  "in-progress": "In Progress",
  completed: "Completed",
};
const priorityLabels = { low: "Low", medium: "Medium", high: "High" };

const ProjectTasks = () => {
  const { tasks, loading, error, reloadTasks, addTask, editTask, removeTask } =
    useTasks();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editPriority, setEditPriority] = useState("medium");
  const [editError, setEditError] = useState("");
  const [editSubmitting, setEditSubmitting] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    setFormError("");

    const trimmed = title.trim();
    if (!trimmed) {
      setFormError("Task title is required.");
      return;
    }

    setSubmitting(true);
    try {
      await addTask({ title: trimmed, priority, status: "todo" });
      setTitle("");
      setPriority("medium");
      setShowForm(false);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusChange = async (task, newStatus) => {
    await editTask(task.id, { status: newStatus });
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditPriority(task.priority);
    setEditError("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditError("");
  };

  const handleEditSave = async (task) => {
    setEditError("");
    const trimmed = editTitle.trim();
    if (!trimmed) {
      setEditError("Task title is required.");
      return;
    }

    setEditSubmitting(true);
    try {
      await editTask(task.id, { title: trimmed, priority: editPriority });
      setEditingId(null);
    } catch (err) {
      setEditError(err.message);
    } finally {
      setEditSubmitting(false);
    }
  };

  const handleDelete = async (task) => {
    if (window.confirm(`Delete task "${task.title}"?`)) {
      await removeTask(task.id);
    }
  };

  return (
    <>
      <div className="todo-header-row">
        <header
          className="todo-header"
          style={{ marginBottom: 0, textAlign: "left" }}
        >
          <h2>Tasks</h2>
        </header>
        <button className="logout-btn" onClick={() => setShowForm((s) => !s)}>
          {showForm ? "Cancel" : "+ New Task"}
        </button>
      </div>

      {showForm && (
        <form className="todo-form form-stacked" onSubmit={handleCreate}>
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={submitting}
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="select-input"
            disabled={submitting}
          >
            {priorityOptions.map((p) => (
              <option key={p} value={p}>
                {priorityLabels[p]} priority
              </option>
            ))}
          </select>
          <ErrorMessage message={formError} />
          <button type="submit" disabled={submitting}>
            {submitting ? "Adding..." : "Add Task"}
          </button>
        </form>
      )}

      <ErrorMessage message={error} onRetry={reloadTasks} />

      {loading ? (
        <Loader />
      ) : tasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">✅</div>
          <p className="empty-state-title">No tasks yet</p>
          <p className="empty-state-subtext">
            Add your first task for this project.
          </p>
        </div>
      ) : (
        <ul className="todo-list">
          {tasks.map((task) =>
            editingId === task.id ? (
              <li
                key={task.id}
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
                  value={editPriority}
                  onChange={(e) => setEditPriority(e.target.value)}
                  className="select-input"
                  style={{ marginTop: "8px" }}
                  disabled={editSubmitting}
                >
                  {priorityOptions.map((p) => (
                    <option key={p} value={p}>
                      {priorityLabels[p]} priority
                    </option>
                  ))}
                </select>
                <ErrorMessage message={editError} />
                <div className="todo-actions" style={{ marginTop: "8px" }}>
                  <button
                    className="btn-save"
                    onClick={() => handleEditSave(task)}
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
              <li
                key={task.id}
                className={`todo-item${task.status === "completed" ? " completed" : ""}`}
              >
                <div style={{ flex: 1 }}>
                  <span className="todo-text">{task.title}</span>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#7A7393",
                      marginTop: "2px",
                    }}
                  >
                    {priorityLabels[task.priority]} priority
                  </div>
                </div>
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task, e.target.value)}
                  className="select-input task-status-select"
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>
                      {statusLabels[s]}
                    </option>
                  ))}
                </select>
                <div className="todo-actions">
                  <button className="btn-edit" onClick={() => startEdit(task)}>
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(task)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ),
          )}
        </ul>
      )}
    </>
  );
};

const ProjectDetails = () => {
  const { id } = useParams();

  return (
    <div className="todo-card" style={{ maxWidth: "700px" }}>
      <Link
        to="/projects"
        style={{
          fontSize: "0.85rem",
          color: "#A855F7",
          textDecoration: "none",
        }}
      >
        ← Back to Projects
      </Link>
      <TaskProvider projectId={id}>
        <div style={{ marginTop: "16px" }}>
          <ProjectTasks />
        </div>
      </TaskProvider>
    </div>
  );
};

export default ProjectDetails;
