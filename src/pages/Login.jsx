import React from "react";
import LoginForm from "@components/LoginForm";

export default function Login() {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/bg-login.jpg')",
      }}
    >
      {/* LỚP MỜ TOÀN MÀN HÌNH */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

      {/* FORM ĐĂNG NHẬP */}
      <div className="relative z-10 w-full max-w-md px-6">
        <LoginForm />
      </div>
    </div>
  );
}
