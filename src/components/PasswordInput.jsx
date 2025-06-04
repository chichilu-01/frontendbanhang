import React, { useState } from "react";

export default function PasswordInput({ value, onChange }) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label className="block text-sm font-medium mb-1">Mật khẩu</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border px-3 py-2 rounded pr-10"
          required
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-2 top-2 text-sm text-gray-500"
        >
          {show ? "🙈" : "👁️"}
        </button>
      </div>
    </div>
  );
}
