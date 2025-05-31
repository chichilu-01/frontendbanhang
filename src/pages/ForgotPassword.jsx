import { useState } from "react";
import API from "@/api/axios";
import { showToast } from "@/utils/toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1);

  const handleSendCode = async () => {
    if (!email.includes("@")) return showToast("Email không hợp lệ", "error");

    try {
      await API.post("/api/auth/forgot-password", { email });
      showToast("📩 Mã xác nhận đã gửi đến email");
      setStep(2);
    } catch {
      showToast("Lỗi gửi mã", "error");
    }
  };

  const handleVerifyCode = async () => {
    try {
      await API.post("/api/auth/verify-reset-code", { email, code });
      showToast("✅ Mã hợp lệ, tiếp tục đặt lại mật khẩu");
      setStep(3);
    } catch {
      showToast("Mã không đúng hoặc đã hết hạn", "error");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const newPassword = e.target.newPassword.value;

    try {
      await API.post("/api/auth/reset-password", { email, newPassword });
      showToast("🔐 Mật khẩu đã được đặt lại");
      window.location.href = "/login";
    } catch {
      showToast("Không đặt lại được mật khẩu", "error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow space-y-4">
      <h2 className="text-2xl font-bold">🔑 Quên mật khẩu</h2>

      {step === 1 && (
        <>
          <input
            type="email"
            placeholder="Nhập email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button onClick={handleSendCode} className="btn-primary w-full">
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
            className="w-full p-2 border rounded"
          />
          <button onClick={handleVerifyCode} className="btn-primary w-full">
            Xác minh mã
          </button>
        </>
      )}

      {step === 3 && (
        <form onSubmit={handleResetPassword} className="space-y-3">
          <input
            type="password"
            name="newPassword"
            placeholder="Mật khẩu mới"
            required
            className="w-full p-2 border rounded"
          />
          <button type="submit" className="btn-primary w-full">
            Đặt lại mật khẩu
          </button>
        </form>
      )}
    </div>
  );
}
