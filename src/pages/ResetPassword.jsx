// src/pages/ResetPassword.jsx
import React from "react";
import ResetPasswordForm from "@components/ResetPasswordForm";

export default function ResetPassword() {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/bg-login.jpg')" }}
    >
      <div className="w-[90%] max-w-md p-8 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20">
        <h2 className="text-2xl font-bold text-center text-white mb-4">
          Đặt lại mật khẩu
        </h2>
        <ResetPasswordForm />
      </div>
    </div>
  );
}
