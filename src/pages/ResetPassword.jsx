import React from "react";
import ResetPasswordForm from "@components/ResetPasswordForm";

export default function ResetPassword() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <ResetPasswordForm />
      </div>
    </div>
  );
}
