import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { verifyResetCode } from "@services/api"; // ✅ dùng API chuẩn

export default function VerifyResetCodeForm() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code) return toast.error("Vui lòng nhập mã xác nhận!");

    setLoading(true);
    try {
      await verifyResetCode({ code });
      toast.success("✅ Mã xác nhận hợp lệ!");
      setTimeout(() => {
        navigate("/reset-password"); // ✅ điều hướng sang đặt lại mật khẩu
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.error || "Mã xác nhận không đúng!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center">Xác nhận mã</h2>
      <input
        type="text"
        placeholder="Nhập mã đã gửi tới email"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        disabled={loading}
      >
        {loading ? "Đang kiểm tra..." : "Xác nhận"}
      </button>
    </form>
  );
}
