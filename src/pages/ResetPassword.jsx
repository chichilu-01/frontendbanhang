import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function ResetPassword() {
  const [form, setForm] = useState({ email: "", code: "", newPassword: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post("/api/auth/reset-password", form)
      .then(() => {
        alert("✅ Mật khẩu đã được đặt lại. Vui lòng đăng nhập lại.");
        navigate("/login");
      })
      .catch(() => alert("❌ Mã xác nhận không hợp lệ hoặc đã hết hạn."));
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">🔁 Đặt lại mật khẩu</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          placeholder="Email đã đăng ký"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2"
        />
        <input
          name="code"
          placeholder="Mã xác nhận"
          value={form.code}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2"
        />
        <input
          name="newPassword"
          type="password"
          placeholder="Mật khẩu mới"
          value={form.newPassword}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Đặt lại mật khẩu
        </button>
      </form>
    </div>
  );
}
