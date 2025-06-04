import React from "react";
import VerifyCodeForm from "@components/VerifyCodeForm";

export default function VerifyCode() {
  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <VerifyCodeForm />
      </div>
    </div>
  );
}
