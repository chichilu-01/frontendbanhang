import { useState } from "react";
import { resetPassword } from "@services/authService";

export default function ResetPasswordForm() {
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPassword({ code, newPassword });
      setMessage("✅ Đặt lại mật khẩu thành công!");
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || "Thất bại"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleReset} className="space-y-4">
      {/* các input giữ nguyên */}
    </form>
  );
}
