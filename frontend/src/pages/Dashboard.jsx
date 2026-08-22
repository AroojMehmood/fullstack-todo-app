import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchDashboardStats } from "../api/dashboardApi.js";
import { useAuth } from "../context/AuthContext.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import Loader from "../components/Loader.jsx";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadStats = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchDashboardStats();
      setStats(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="todo-card" style={{ maxWidth: "800px" }}>
      <header className="todo-header" style={{ textAlign: "left" }}>
        <h1>Welcome, {user?.name?.split(" ")[0]}</h1>
        <p className="todo-subtext">
          Here's what's happening across your projects.
        </p>
      </header>

      <ErrorMessage message={error} onRetry={loadStats} />

      {loading ? (
        <Loader />
      ) : stats ? (
        <>
          <div className="dashboard-stats-grid">
            <div className="stat-card">
              <span className="stat-number">{stats.totalProjects}</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{stats.totalTasks}</span>
              <span className="stat-label">Total Tasks</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{stats.completedTasks}</span>
              <span className="stat-label">Completed</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{stats.pendingTasks}</span>
              <span className="stat-label">Pending</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{stats.highPriorityTasks}</span>
              <span className="stat-label">High Priority</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{stats.totalTodos}</span>
              <span className="stat-label">Todos</span>
            </div>
          </div>

          <div className="dashboard-recent">
            <h3>Recent Projects</h3>
            {stats.recentProjects.length === 0 ? (
              <p className="todo-subtext">
                No projects yet.{" "}
                <Link to="/projects" className="link-plain">
                  Create one
                </Link>
                .
              </p>
            ) : (
              <ul className="todo-list">
                {stats.recentProjects.map((p) => (
                  <li key={p.id} className="todo-item">
                    <Link
                      to={`/projects/${p.id}`}
                      style={{
                        color: "#3E3554",
                        fontWeight: 600,
                        textDecoration: "none",
                      }}
                    >
                      {p.title}
                    </Link>
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

export default Dashboard;
