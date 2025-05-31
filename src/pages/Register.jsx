import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "@/api/axios";
import { showToast } from "@/utils/toast";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      await API.post("/api/auth/register", form);
      showToast("📩 Mã xác nhận đã gửi đến email");
      setStep(2);
    } catch {
      showToast("Email đã được sử dụng", "error");
    }
  };

  const handleVerify = async () => {
    try {
      await API.post("/api/auth/verify-code", {
        email: form.email,
        code: otp,
      });
      showToast("✅ Đăng ký thành công!");
      navigate("/login");
    } catch {
      showToast("Mã không đúng hoặc hết hạn", "error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow space-y-4">
      <h2 className="text-2xl font-bold">📝 Đăng ký tài khoản</h2>

      {step === 1 && (
        <>
          <input
            type="text"
            name="name"
            placeholder="Họ tên"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <button onClick={handleRegister} className="btn-primary w-full">
            Gửi mã xác nhận
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            type="text"
            placeholder="Nhập mã xác nhận"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button onClick={handleVerify} className="btn-primary w-full">
            Xác nhận & Đăng ký
          </button>
        </>
      )}
    </div>
  );
}
