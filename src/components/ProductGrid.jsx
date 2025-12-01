import React from "react";
import { Edit, Trash2 } from "lucide-react";

const formatVND = (value) => {
  const num = Number(value) || 0;
  return num.toLocaleString("vi-VN") + "₫";
};

export default function ProductGrid({ products, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
      {products.map((p) => (
        <div
          key={p.id}
          className="border rounded-lg shadow hover:shadow-lg transition p-3 bg-white"
        >
          <img
            src={p.image_url}
            className="w-full h-40 object-cover rounded"
            alt="product"
          />

          <h3 className="font-semibold mt-2 line-clamp-1">{p.name}</h3>

          <p className="text-red-600 font-bold">{formatVND(p.price)}</p>

          <p className="text-sm text-gray-600 mt-1">
            Tồn kho: <span className="font-semibold">{p.stock}</span>
          </p>

          <div className="flex justify-between mt-3">
            <button
              onClick={() => onEdit(p)}
              className="flex items-center gap-1 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              <Edit size={16} /> Sửa
            </button>

            <button
              onClick={() => onDelete(p.id)}
              className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              <Trash2 size={16} /> Xoá
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
