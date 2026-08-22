import { useState, useEffect } from "react";
import { fetchAdminOverview } from "../api/adminApi.js";
import ErrorMessage from "../components/ErrorMessage.jsx";
import Loader from "../components/Loader.jsx";

const Admin = () => {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOverview = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchAdminOverview();
      setOverview(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOverview();
  }, []);

  return (
    <div className="todo-card" style={{ maxWidth: "800px" }}>
      <header className="todo-header" style={{ textAlign: "left" }}>
        <h1>Admin Overview</h1>
        <p className="todo-subtext">Application-level data across all users.</p>
      </header>

      <ErrorMessage message={error} onRetry={loadOverview} />

      {loading ? (
        <Loader />
      ) : overview ? (
        <>
          <div className="dashboard-stats-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            <div className="stat-card">
              <span className="stat-number">{overview.totalUsers}</span>
              <span className="stat-label">Total Users</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{overview.totalProjects}</span>
              <span className="stat-label">Total Projects</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{overview.totalTasks}</span>
              <span className="stat-label">Total Tasks</span>
            </div>
          </div>

          <div className="dashboard-recent">
            <h3>Registered Users</h3>
            {overview.users.length === 0 ? (
              <p className="todo-subtext">No users found.</p>
            ) : (
              <ul className="todo-list">
                {overview.users.map((u) => (
                  <li key={u.id || u._id} className="todo-item">
                    <div style={{ flex: 1 }}>
                      <span className="todo-text">{u.name}</span>
                      <div style={{ fontSize: "0.75rem", color: "#7A7393" }}>{u.email}</div>
                    </div>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        padding: "4px 10px",
                        borderRadius: "8px",
                        background: u.role === "admin" ? "#E7B9FF" : "#F0F0F5",
                        color: "#3E3554",
                      }}
                    >
                      {u.role}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Admin;