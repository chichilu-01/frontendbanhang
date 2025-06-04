// 📄 src/components/RegisterForm.jsx
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`/api/auth/register`, form);
      toast.success("📩 Mã xác nhận đã gửi đến email!");
      navigate("/verify-code", { state: { email: form.email } });
    } catch (err) {
      toast.error(err?.response?.data?.error || "Lỗi đăng ký");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Đăng ký</h2>

      <input
        type="text"
        name="name"
        placeholder="Họ tên"
        className="w-full border px-3 py-2 rounded"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full border px-3 py-2 rounded"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Mật khẩu"
        className="w-full border px-3 py-2 rounded"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Đang gửi..." : "Đăng ký"}
      </button>
    </form>
  );
}
