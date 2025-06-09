// === File: /src/components/EditProductModal.jsx ===
// Chỉ lo hiển thị modal

import React from "react";
import ProductForm from "./ProductForm";

export default function EditProductModal({ product, onClose, onSave }) {
  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
      onClick={onClose} // bấm nền đen để đóng modal
    >
      <div
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // tránh bấm bên trong bị đóng
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {product?.id ? "Sửa sản phẩm" : "Thêm sản phẩm"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-xl font-bold"
          >
            ×
          </button>
        </div>

        <ProductForm product={product} onClose={onClose} onSave={onSave} />
      </div>
    </div>
  );
}
