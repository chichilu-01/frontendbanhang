import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function ResetPasswordForm() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const email = state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Không có email");

    try {
      await axios.post(`/api/auth/reset-password`, { email, newPassword });
      toast.success("🔐 Đặt lại thành công!");
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.error || "Lỗi khi đặt lại");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-center">Mật khẩu mới</h2>
      <input
        type="password"
        placeholder="Mật khẩu mới"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Đặt lại
      </button>
    </form>
  );
}
