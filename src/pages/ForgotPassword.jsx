import { useState } from "react";
import API from "../api/axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    if (!email.includes("@")) return alert("❗ Vui lòng nhập email hợp lệ");
    setLoading(true);
    try {
      await API.post("/api/auth/forgot-password", { email });
      alert("📩 Mã xác nhận đã được gửi đến email");
      setStep(2);
    } catch (err) {
      console.error("❌ Gửi mã thất bại:", err);
      alert(
        err.response?.data?.error || "❌ Không gửi được mã. Vui lòng thử lại.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (code.trim().length < 4) return alert("❗ Mã xác nhận không hợp lệ");
    setLoading(true);
    try {
      await API.post("/api/auth/verify-reset-code", { email, code });
      alert("✅ Mã đúng. Nhập mật khẩu mới");
      setStep(3);
    } catch (err) {
      console.error("❌ Sai mã:", err);
      alert(err.response?.data?.error || "❌ Mã không đúng hoặc đã hết hạn");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword.length < 6)
      return alert("❗ Mật khẩu phải từ 6 ký tự trở lên");
    setLoading(true);
    try {
      await API.post("/api/auth/reset-password", { email, newPassword });
      alert("🔐 Mật khẩu đã được đổi. Hãy đăng nhập lại.");
      window.location.href = "/login";
    } catch (err) {
      console.error("❌ Lỗi đặt lại mật khẩu:", err);
      alert(err.response?.data?.error || "❌ Không đặt lại được mật khẩu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-4 bg-white shadow-md rounded-xl mt-10">
      <h1 className="text-xl font-bold text-center mb-4">🔁 Quên mật khẩu</h1>

      {step === 1 && (
        <>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            onClick={handleSendCode}
            disabled={loading}
            className="w-full mt-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Đang gửi mã..." : "📩 Gửi mã xác nhận"}
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <label className="block mb-1 text-sm font-medium">Mã xác nhận</label>
          <input
            type="text"
            placeholder="Nhập mã gồm 6 ký tự"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <button
            onClick={handleVerifyCode}
            disabled={loading}
            className="w-full mt-3 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            {loading ? "Đang xác minh..." : "✅ Xác minh mã"}
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <label className="block mb-1 text-sm font-medium">Mật khẩu mới</label>
          <input
            type="password"
            placeholder="Mật khẩu mới (tối thiểu 6 ký tự)"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <button
            onClick={handleResetPassword}
            disabled={loading}
            className="w-full mt-3 bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
          >
            {loading ? "Đang đổi mật khẩu..." : "🔐 Đặt lại mật khẩu"}
          </button>
        </>
      )}
    </div>
  );
}
