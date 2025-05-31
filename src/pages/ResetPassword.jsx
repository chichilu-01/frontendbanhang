import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "@/api/axios";
import { showToast } from "@/utils/toast";

export default function ResetPassword() {
  const [form, setForm] = useState({ email: "", newPassword: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/api/auth/reset-password", form);
      showToast("🔐 Đặt lại mật khẩu thành công");
      navigate("/login");
    } catch {
      showToast("Không thể đặt lại mật khẩu", "error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded space-y-4">
      <h2 className="text-2xl font-bold">🔄 Đặt lại mật khẩu</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="newPassword"
          type="password"
          placeholder="Mật khẩu mới"
          value={form.newPassword}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="btn-primary w-full">
          Đặt lại mật khẩu
        </button>
      </form>
    </div>
  );
}
