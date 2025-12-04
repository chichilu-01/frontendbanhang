// src/pages/ResetPassword.jsx
import React from "react";
import ResetPasswordForm from "@components/ResetPasswordForm";

export default function ResetPassword() {
  return (
    <div
      className="
        min-h-screen flex items-center justify-center 
        bg-cover bg-center relative
      "
      style={{ backgroundImage: "url('/bg-login.jpg')" }}
    >
      {/* Overlay làm tối nền + blur nhẹ */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Card glass */}
      <div
        className="
          relative z-10 w-[90%] max-w-md p-8 
          bg-white/10 backdrop-blur-2xl 
          rounded-3xl shadow-2xl border border-white/20
        "
      >
        <h2 className="text-2xl font-bold mb-4 text-white text-center">
          Đặt lại mật khẩu
        </h2>
        <ResetPasswordForm />
      </div>
    </div>
  );
}
