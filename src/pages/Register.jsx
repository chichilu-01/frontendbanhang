// src/pages/Register.jsx
import React from "react";
import RegisterForm from "@components/RegisterForm";

export default function Register() {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/bg-login.jpg')" }}
    >
      <div className="w-[90%] max-w-md p-8 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20">
        <h2 className="text-2xl font-bold text-center text-white mb-4">
          Đăng ký tài khoản
        </h2>
        <RegisterForm />
      </div>
    </div>
  );
}


