// === File: /src/components/EditProductModal.jsx ===
//Chỉ lo hiển thị modal
import React from "react";
import ProductForm from "./ProductForm";

export default function EditProductModal({ product, onClose, onSave }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">
          {product?.id ? "Sửa sản phẩm" : "Thêm sản phẩm"}
        </h2>
        <ProductForm product={product} onClose={onClose} onSave={onSave} />
      </div>
    </div>
  );
}
