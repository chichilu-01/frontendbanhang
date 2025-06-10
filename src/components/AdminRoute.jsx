import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@context/AuthContext";

export default function AdminRoute({ children }) {
  const { user } = useAuth();
  console.log("🔍 USER:", user);

  if (!user) return <Navigate to="/login" replace />;
  if (!user.is_admin) return <Navigate to="/" replace />;

  return children;
}
