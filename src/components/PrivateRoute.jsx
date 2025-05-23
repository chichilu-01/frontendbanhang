// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function PrivateRoute({ children, role = null }) {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode(token);
    if (role && decoded.role !== role) return <Navigate to="/" />;
    return children;
  } catch {
    return <Navigate to="/login" />;
  }
}
