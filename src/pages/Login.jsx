import React from "react";
import LoginForm from "@components/LoginForm";

export default function Login() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url("/bg-login.jpg")`,
      }}
    >
      {/* lớp phủ mờ nền để form nổi bật */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>

      {/* form đăng nhập */}
      <div className="relative z-10">
        <LoginForm />
      </div>
    </div>
  );
}
