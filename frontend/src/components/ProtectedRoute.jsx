import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Yeh component kisi bhi page ko "wrap" karta hai jo sirf logged-in users dekh sakte hain.
// Ab localStorage seedha check karne ke bajaye AuthContext se isAuthenticated leta hai.
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;