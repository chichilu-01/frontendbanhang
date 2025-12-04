import React, { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";

// Format VND
const formatVND = (value) => {
  const num = Number(value) || 0;
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(num);
};

export default function CartItem({ item, onRemove, onQuantityChange }) {
  const [shake, setShake] = useState(false);
  const safeId = item.id || item.product_id || item._id || "unknown";

  const imageUrl =
    item.image_url || "https://via.placeholder.com/80?text=No+Image";

  const handleQuantityChange = (newQty) => {
    if (newQty < 1) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }
    onQuantityChange(safeId, item.selectedSize, item.selectedColor, newQty);
  };

  const total = item.quantity * item.price;

  return (
    <div
      className="
        flex flex-col sm:flex-row justify-between items-start sm:items-center
        p-5 rounded-3xl border border-white/40 shadow-lg
        bg-white/60 backdrop-blur-xl 
        hover:shadow-2xl hover:-translate-y-1 transition-all duration-300
      "
    >
      {/* LEFT: IMAGE + INFO */}
      <div className="flex items-start gap-5">
        <div className="relative">
          <img
            src={imageUrl}
            alt={item.name}
            className="
              w-24 h-24 object-cover rounded-2xl 
              shadow-md border border-white/40 
              transition-all duration-500
              group-hover:scale-110 group-hover:rotate-1
            "
          />
        </div>

        <div className="space-y-2">
          <h3 className="font-bold text-gray-900 text-lg leading-tight line-clamp-2">
            {item.name}
          </h3>

          {/* Size & Color */}
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 font-medium">
              Size: {item.selectedSize || "N/A"}
            </span>

            <span
              className="w-5 h-5 rounded-full border shadow-inner"
              style={{ backgroundColor: item.selectedColor || "#ccc" }}
            ></span>
          </div>

          {/* Prices */}
          <p className="text-blue-600 font-semibold text-[15px]">
            {formatVND(item.price)} × {item.quantity}
          </p>

          <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-lg font-bold">
            Tổng: {formatVND(total)}
          </span>
        </div>
      </div>

      {/* RIGHT: Quantity + Remove */}
      <div className="flex items-center gap-6 mt-4 sm:mt-0">
        {/* Neumorphic Counter */}
        <div
          className={`
            flex items-center rounded-full bg-white/70 px-1 py-1 shadow-inner
            backdrop-blur-lg border border-gray-200
            transition ${shake ? "animate-shake" : ""}
          `}
        >
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="
              px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 
              shadow-sm transition active:scale-90
            "
          >
            <Minus size={16} />
          </button>

          <span className="px-4 text-gray-800 font-semibold text-[16px]">
            {item.quantity}
          </span>

          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="
              px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 
              shadow-sm transition active:scale-90
            "
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Delete Button */}
        <button
          onClick={() =>
            onRemove(safeId, item.selectedSize, item.selectedColor)
          }
          className="
            flex items-center gap-1 text-red-600 font-semibold 
            hover:text-red-700 transition-all duration-200 
            hover:-translate-x-1
          "
        >
          <Trash2 size={18} />
          Xoá
        </button>
      </div>
    </div>
  );
}
