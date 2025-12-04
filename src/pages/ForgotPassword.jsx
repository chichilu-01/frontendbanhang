// src/pages/ForgotPassword.jsx
import React from "react";
import ForgotPasswordForm from "@components/ForgotPasswordForm";

export default function ForgotPassword() {
  return (
    <div
      className="
        min-h-screen flex items-center justify-center 
        bg-cover bg-center relative
      "
      style={{ backgroundImage: "url('/bg-login.jpg')" }}
    >
      {/* Lớp làm tối nhẹ */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Card */}
      <div
        className="relative z-10 w-[90%] max-w-md p-8 
          bg-white/10 backdrop-blur-2xl
          rounded-3xl shadow-2xl border border-white/20"
      >
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
