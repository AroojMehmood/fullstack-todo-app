import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";

// Sab protected pages isi ke andar render hote hain (Outlet ke through).
const AppLayout = () => {
  return (
    <div className="app-shell">
      <div className="aurora-bg" aria-hidden="true"></div>
      <Navbar />
      <main className="page-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;