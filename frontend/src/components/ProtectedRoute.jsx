import { Navigate } from "react-router-dom";

// Yeh component kisi bhi page ko "wrap" karta hai jo sirf logged-in users dekh sakte hain.
// Agar localStorage mein token nahi hai, to user ko /login pe bhej dete hain.
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;