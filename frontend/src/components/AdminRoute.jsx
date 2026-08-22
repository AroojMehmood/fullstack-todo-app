import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Sirf role === 'admin' walon ko andar jaane deta hai.
// Baaqi logged-in users (jo admin nahi) unhe dashboard pe wapas bhej deta hai.
const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;