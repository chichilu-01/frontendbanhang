import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`/api/auth/forgot-password`, { email });
      toast.success("📩 Mã đặt lại mật khẩu đã gửi qua email");
      navigate("/verify-reset", { state: { email } });
    } catch (err) {
      toast.error(err?.response?.data?.error || "Lỗi gửi email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-center">Quên mật khẩu</h2>
      <input
        type="email"
        placeholder="Email tài khoản"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded"
        disabled={loading}
      >
        {loading ? "Đang gửi..." : "Gửi mã đặt lại"}
      </button>
    </form>
  );
}
