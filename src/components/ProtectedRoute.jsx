import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
/*Chặn truy cập nếu chưa đăng nhập.
Tự động chuyển về /login nếu chưa có user trong AuthContext.*/
