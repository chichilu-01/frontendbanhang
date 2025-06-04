import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function VerifyCodeForm() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const email = state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Không có email xác thực!");

    setLoading(true);
    try {
      await axios.post(`/api/auth/verify-code`, { email, code });
      toast.success("✅ Đăng ký thành công!");
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.error || "Mã không đúng");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Xác nhận Email</h2>
      <p className="text-sm text-gray-500 text-center mb-2">
        Nhập mã xác thực đã gửi đến <strong>{email}</strong>
      </p>

      <input
        type="number"
        placeholder="Mã xác thực (6 chữ số)"
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
        {loading ? "Đang xác thực..." : "Xác nhận"}
      </button>
    </form>
  );
}
