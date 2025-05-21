import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post("/api/auth/login", form)
      .then((res) => {
        login(res.data.token);
        if (remember) {
          localStorage.setItem("rememberEmail", form.email);
        } else {
          localStorage.removeItem("rememberEmail");
        }
        alert("✅ Đăng nhập thành công");
        navigate("/");
      })
      .catch(() => alert("❌ Sai email hoặc mật khẩu"));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">🔐 Đăng nhập</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <div className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Mật khẩu"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 text-sm text-blue-500"
          >
            {showPassword ? "Ẩn" : "Hiện"}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <span className="text-sm">Ghi nhớ đăng nhập</span>
          </label>
          <Link
            to="/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Quên mật khẩu?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
}
