import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function VerifyResetCodeForm() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const email = state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Thiếu email xác nhận!");

    try {
      await axios.post(`/api/auth/verify-reset-code`, { email, code });
      toast.success("✅ Mã hợp lệ!");
      navigate("/reset-password", { state: { email } });
    } catch (err) {
      toast.error(err?.response?.data?.error || "Mã sai hoặc hết hạn");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-center">Xác thực mã đặt lại</h2>
      <input
        type="number"
        placeholder="Mã xác nhận"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        Xác nhận mã
      </button>
    </form>
  );
}
