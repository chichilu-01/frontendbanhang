import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = (e) => {
    e.preventDefault();
    API.post("/api/auth/register", form)
      .then(() => {
        alert("📩 Mã xác nhận đã gửi đến email. Vui lòng kiểm tra hộp thư.");
        setStep(2);
      })
      .catch(() => alert("❌ Đăng ký thất bại"));
  };

  const handleVerify = (e) => {
    e.preventDefault();
    API.post("/api/auth/verify-code", {
      email: form.email,
      code,
    })
      .then(() => {
        alert("✅ Tạo tài khoản thành công, mời đăng nhập");
        navigate("/api/login");
      })
      .catch(() => alert("❌ Mã xác nhận không đúng hoặc đã hết hạn"));
  };

  return (
    <div>
      <h1>📝 Đăng ký</h1>

      {step === 1 ? (
        <form onSubmit={handleRegister}>
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
          <button type="submit">Gửi mã xác nhận</button>
        </form>
      ) : (
        <form onSubmit={handleVerify}>
          <p>
            ✉️ Mã xác nhận đã gửi đến <strong>{form.email}</strong>
          </p>
          <input
            type="text"
            placeholder="Nhập mã xác nhận"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <br />
          <button type="submit">Xác nhận</button>
        </form>
      )}
    </div>
  );
}
