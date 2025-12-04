// src/pages/Login.jsx
import React from "react";
import LoginForm from "@components/LoginForm";

export default function Login() {
  return (
    <div
      className="
        min-h-screen w-full flex items-center justify-center 
        bg-cover bg-center relative
      "
      style={{ backgroundImage: "url('/bg-login.jpg')" }}
    >
      {/* Lớp overlay tối 40% */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <div
        className="relative z-10 w-[90%] max-w-md p-8 
        bg-white/10 backdrop-blur-2xl 
        rounded-3xl shadow-2xl border border-white/20"
      >
        <LoginForm />
      </div>
    </div>
  );
}
