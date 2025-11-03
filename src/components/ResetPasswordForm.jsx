// 📄 src/components/auth/ResetPasswordForm.jsx
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
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      toast.error(err.response?.data?.error || "Lỗi đặt lại mật khẩu!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 to-indigo-50 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Đặt lại mật khẩu
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Mật khẩu mới"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:scale-105 text-white py-2 rounded-lg shadow-md transition-all"
            disabled={loading}
          >
            {loading ? "Đang cập nhật..." : "Đặt lại mật khẩu"}
          </button>
        </form>

        <div className="text-center text-sm mt-4 text-gray-600">
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline"
          >
            Quay lại đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
}
