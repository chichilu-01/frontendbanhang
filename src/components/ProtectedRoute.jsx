import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth(); // giả sử có `loading` khi đang kiểm tra token

  // ✅ Nếu đang load user (từ localStorage / API), có thể thêm spinner hoặc return null
  if (loading) {
    return <div className="p-6">Đang kiểm tra đăng nhập...</div>;
  }

  // ✅ Nếu chưa đăng nhập, chuyển hướng về trang login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

/*Chặn truy cập nếu chưa đăng nhập.
Tự động chuyển về /login nếu chưa có user trong AuthContext.*/
