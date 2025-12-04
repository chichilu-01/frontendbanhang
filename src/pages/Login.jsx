import React from "react";
import LoginForm from "@components/LoginForm";

export default function Login() {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/bg-login.jpg')",
      }}
    >
      <div className="w-[90%] max-w-md p-8 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20">
        <LoginForm />
      </div>
    </div>
  );
}
