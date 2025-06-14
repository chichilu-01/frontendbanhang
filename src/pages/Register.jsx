import React from "react";
import RegisterForm from "@components/RegisterForm";

export default function Register() {
  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <RegisterForm />
      </div>
    </div>
  );
}
