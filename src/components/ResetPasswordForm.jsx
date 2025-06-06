import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "@services/api"; // ✅ dùng API chuẩn

export default function ResetPasswordForm() {
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code || !newPassword)
      return toast.error("Vui lòng nhập mã và mật khẩu mới!");

    setLoading(true);
    try {
      await resetPassword({ code, newPassword });
      toast.success("🔐 Đặt lại mật khẩu thành công!");
      setTimeout(() => {
        navigate("/login"); // ✅ quay lại trang đăng nhập
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.error || "Lỗi đặt lại mật khẩu!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center">Đặt lại mật khẩu</h2>
      <input
        type="text"
        placeholder="Nhập lại mã xác nhận"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />
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
        className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        disabled={loading}
      >
        {loading ? "Đang cập nhật..." : "Đặt lại mật khẩu"}
      </button>
    </form>
  );
}
