// src/pages/ForgotPassword.jsx
import { useState } from "react";
import API from "../api/axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSendCode = async () => {
    try {
      await API.post("/api/auth/forgot-password", { email });
      alert("📩 Đã gửi mã xác nhận đến email");
      setStep(2);
    } catch (err) {
      alert("❌ Không gửi được mã xác nhận");
    }
  };

  const handleVerifyCode = async () => {
    try {
      await API.post("/api/auth/verify-reset-code", { email, code });
      alert("✅ Mã đúng, mời nhập mật khẩu mới");
      setStep(3);
    } catch (err) {
      alert("❌ Mã không hợp lệ hoặc đã hết hạn");
    }
  };

  const handleResetPassword = async () => {
    try {
      await API.post("/api/auth/reset-password", { email, newPassword });
      alert("🔐 Đặt lại mật khẩu thành công!");
      window.location.href = "/login";
    } catch (err) {
      alert("❌ Không đặt lại được mật khẩu");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-xl font-bold">🔁 Quên mật khẩu</h1>

      {step === 1 && (
        <>
          <input
            type="email"
            placeholder="Nhập email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full"
            required
          />
          <button
            onClick={handleSendCode}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Gửi mã xác nhận
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            type="text"
            placeholder="Nhập mã xác nhận"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="border p-2 w-full"
            required
          />
          <button
            onClick={handleVerifyCode}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Xác minh mã
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <input
            type="password"
            placeholder="Nhập mật khẩu mới"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border p-2 w-full"
            required
          />
          <button
            onClick={handleResetPassword}
            className="bg-purple-500 text-white px-4 py-2 rounded"
          >
            Đổi mật khẩu
          </button>
        </>
      )}
    </div>
  );
}
