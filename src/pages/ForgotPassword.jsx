import React from "react";
import ForgotPasswordForm from "@components/ForgotPasswordForm";

export default function ForgotPassword() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
