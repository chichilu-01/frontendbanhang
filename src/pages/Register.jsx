// src/pages/Register.jsx
import React from "react";
import RegisterForm from "@components/RegisterForm";

export default function Register() {
  return (
    <div
      className="
        min-h-screen w-full flex items-center justify-center 
        bg-cover bg-center relative
      "
      style={{ backgroundImage: "url('/bg-login.jpg')" }}
    >
      {/* Overlay tối + blur nhẹ */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Card Register Form */}
      <div
        className="
          relative z-10 w-[90%] max-w-md p-8
          bg-white/10 backdrop-blur-2xl 
          rounded-3xl shadow-2xl border border-white/20
        "
      >
        <h2 className="text-2xl font-bold text-center text-white mb-4">
          Đăng ký tài khoản
        </h2>

        <RegisterForm />
      </div>
    </div>
  );
}
