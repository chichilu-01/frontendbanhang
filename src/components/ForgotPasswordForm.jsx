import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { forgotPassword as sendForgotPasswordCode } from "@services/authService";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Vui lòng nhập email!");

    setLoading(true);
    try {
      await sendForgotPasswordCode({ email });
      localStorage.setItem("resetEmail", email); // ✅ Lưu lại email
      toast.success("📩 Mã xác nhận đã được gửi đến email!");
      setTimeout(() => {
        navigate("/verify-reset-code"); // ✅ Điều hướng tiếp theo
      }, 1000);
    } catch (err) {
      console.error("Lỗi gửi email:", err);
      toast.error(err.response?.data?.error || "Lỗi gửi email xác nhận!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center">Quên mật khẩu</h2>
      <input
        type="email"
        placeholder="Nhập email đã đăng ký"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Đang gửi..." : "Gửi mã xác nhận"}
      </button>
    </form>
  );
}
