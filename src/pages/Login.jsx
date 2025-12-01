import React from "react";
import LoginForm from "@components/LoginForm";

export default function Login() {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "url('/bg-login.jpg')",
      }}
    >
      {/* FORM LOGIN — glassmorphism */}
      <div
        className="
          relative z-10 
          w-full max-w-md
          p-8
          rounded-2xl
          bg-white/20 
          backdrop-blur-md 
          shadow-2xl
          border border-white/30
        "
      >
        <LoginForm />
      </div>
    </div>
  );
}
