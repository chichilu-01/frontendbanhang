// src/components/auth/LoginForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@services/api";
import { useAuth } from "@context/AuthContext";
import PasswordInput from "@components/PasswordInput";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginUser(form);
      const { token, user } = res.data;
      login(token, user);
      toast.success("Đăng nhập thành công!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.error || "Sai email hoặc mật khẩu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 to-indigo-50 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Đăng nhập
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Nhập email của bạn"
              className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              required
            />
          </div>

          <PasswordInput
            value={form.password}
            onChange={(val) => setForm((prev) => ({ ...prev, password: val }))}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-105 text-white py-2 rounded-lg shadow-md transition-all"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <div className="flex justify-between text-sm mt-4 text-gray-600">
          <button
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:underline"
          >
            Đăng ký
          </button>
          <button
            onClick={() => navigate("/forgot-password")}
            className="text-blue-600 hover:underline"
          >
            Quên mật khẩu?
          </button>
        </div>
      </div>
    </div>
  );
}
