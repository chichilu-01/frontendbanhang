import React from "react";
import VerifyResetCodeForm from "@components/VerifyResetCodeForm";

export default function VerifyResetCode() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <VerifyResetCodeForm />
      </div>
    </div>
  );
}
