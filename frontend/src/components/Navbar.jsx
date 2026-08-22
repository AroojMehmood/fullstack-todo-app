import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) => `nav-link${isActive ? " nav-link-active" : ""}`;

  return (
    <nav className="app-navbar">
      <div className="navbar-brand">TaskFlow</div>
      <div className="navbar-links">
        <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
        <NavLink to="/projects" className={linkClass}>Projects</NavLink>
        <NavLink to="/todos" className={linkClass}>Todos</NavLink>
        {user?.role === "admin" && (
          <NavLink to="/admin" className={linkClass}>Admin</NavLink>
        )}
      </div>
      <div className="navbar-user">
        <span className="navbar-username">{user?.name}</span>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;