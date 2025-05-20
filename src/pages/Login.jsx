import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post("/users/login", form)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        alert("✅ Đăng nhập thành công");
        navigate("/");
      })
      .catch(() => alert("❌ Sai email hoặc mật khẩu"));
  };

  return (
    <div>
      <h1>🔐 Đăng nhập</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
}
