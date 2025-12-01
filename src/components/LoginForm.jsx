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
    <div className="space-y-4">
      <h2 className="text-3xl font-bold text-center mb-4 text-white drop-shadow-lg">
        Đăng nhập
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1 text-white">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Nhập email..."
            className="
              w-full px-4 py-2 rounded-xl
              bg-white/20 border border-white/30 
              text-white placeholder-white/70
              focus:ring-2 focus:ring-blue-400 focus:outline-none
              backdrop-blur-lg
            "
            required
          />
        </div>

        {/* Password */}
        <PasswordInput
          value={form.password}
          onChange={(val) => setForm((prev) => ({ ...prev, password: val }))}
        />

        {/* Nút login */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full py-2 text-white font-semibold
            rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600
            shadow-lg hover:opacity-90 transition
          "
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>

      <div className="flex justify-between text-sm mt-4 text-white/90">
        <button
          onClick={() => navigate("/register")}
          className="hover:underline"
        >
          Đăng ký
        </button>
        <button
          onClick={() => navigate("/forgot-password")}
          className="hover:underline"
        >
          Quên mật khẩu?
        </button>
      </div>
    </div>
  );
}
