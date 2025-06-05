// src/pages/ResetPassword.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { email, code } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || password.length < 6) {
      return toast.error("Mật khẩu phải từ 6 ký tự");
    }

    try {
      await axios.post("/api/auth/reset-password", { email, code, password });
      toast.success("🎉 Đặt lại mật khẩu thành công!");
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.error || "Lỗi đặt lại mật khẩu");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-semibold text-center">
        🔐 Nhập mật khẩu mới
      </h2>
      <input
        type="password"
        placeholder="Mật khẩu mới"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        Đặt lại mật khẩu
      </button>
    </form>
  );
}
