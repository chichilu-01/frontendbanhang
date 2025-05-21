import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post("/api/auth/register", form) // ✅ Đã sửa
      .then(() => {
        alert("✅ Đăng ký thành công, mời đăng nhập");
        navigate("/login");
      })
      .catch(() => alert("❌ Đăng ký thất bại"));
  };

  return (
    <div>
      <h1>📝 Đăng ký</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Tên"
          value={form.name}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="password"
          type="password"
          placeholder="Mật khẩu"
          value={form.password}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Đăng ký</button>
      </form>
    </div>
  );
}
