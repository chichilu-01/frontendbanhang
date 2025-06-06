import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "@services/api";

export default function ResetPasswordForm() {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("resetEmail");
    const code = localStorage.getItem("verifiedCode");

    if (!email || !code || !newPassword)
      return toast.error("Thiếu thông tin xác minh! Vui lòng quay lại từ đầu.");

    setLoading(true);
    try {
      await resetPassword({ email, code, newPassword });
      toast.success("🔐 Đặt lại mật khẩu thành công!");
      localStorage.removeItem("resetEmail");
      localStorage.removeItem("verifiedCode");
      setTimeout(() => {
        navigate("/login");
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
