// src/components/CartSummary.jsx
import React from "react";

export default function CartSummary({ total }) {
  return (
    <div className="text-right mt-6">
      <div className="text-lg font-bold">
        Tổng cộng: {total.toLocaleString()}₫
      </div>
      <button className="mt-4 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700">
        Tiến hành thanh toán
      </button>
    </div>
  );
}
