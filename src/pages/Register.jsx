import React from "react";

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Đăng ký tài khoản
        </h1>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Họ tên"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="w-full border px-3 py-2 rounded"
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  );
}
