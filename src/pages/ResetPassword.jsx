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
      .catch(() => alert("❌ Mã xác nhận không hợp lệ"));
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">🔐 Đặt lại mật khẩu</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
        <input
          name="code"
          placeholder="Mã xác nhận"
          value={form.code}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
        <input
          name="newPassword"
          type="password"
          placeholder="Mật khẩu mới"
          value={form.newPassword}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Đặt lại mật khẩu
        </button>
      </form>
    </div>
  );
}