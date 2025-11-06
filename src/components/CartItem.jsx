import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";

// ✅ Hàm format tiền kiểu Việt Nam (chuẩn đẹp)
const formatVND = (value) => {
  const num = Number(value) || 0;
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  })
    .format(num)
    .replace("₫", "₫"); // đảm bảo ký hiệu ở cuối
};

export default function CartItem({ item, onRemove, onQuantityChange }) {
  const safeId = item.id || item.product_id || item._id || "unknown";
  const imageUrl =
    item.image ||
    item.thumbnail ||
    item.mainImage ||
    "https://via.placeholder.com/80?text=No+Image";

  const handleQuantityChange = (newQty) => {
    if (newQty < 1) return;
    onQuantityChange(safeId, item.selectedSize, item.selectedColor, newQty);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-200 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-200">
      {/* --- Ảnh + Thông tin --- */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <img
          src={imageUrl}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-lg border border-gray-100 shadow-sm bg-gray-50"
          onError={(e) =>
            (e.target.src = "https://via.placeholder.com/80?text=No+Image")
          }
        />

        <div>
          <h2 className="font-semibold text-gray-800 text-lg leading-tight">
            {item.name}
          </h2>

          <div className="text-sm text-gray-500 mt-1">
            <p>
              <span className="font-medium text-gray-700">Size:</span>{" "}
              {item.selectedSize || "Không có"}
            </p>
            <p>
              <span className="font-medium text-gray-700">Màu:</span>{" "}
              {item.selectedColor || "Không có"}
            </p>
          </div>

          {/* ✅ Hiển thị giá chuẩn VND */}
          <p className="text-blue-600 font-semibold mt-2">
            {formatVND(item.price)} × {item.quantity}
          </p>
        </div>
      </div>

      {/* --- Điều khiển số lượng + Xoá --- */}
      <div className="flex items-center gap-3 mt-4 sm:mt-0">
        {/* Nút tăng giảm số lượng */}
        <div className="flex items-center border rounded-lg overflow-hidden shadow-sm">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition active:scale-95"
          >
            <Minus size={16} />
          </button>
          <span className="px-4 py-1 text-gray-700 font-medium select-none">
            {item.quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition active:scale-95"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Nút xoá */}
        <button
          onClick={() =>
            onRemove(safeId, item.selectedSize, item.selectedColor)
          }
          className="flex items-center gap-1 text-red-600 font-medium hover:text-red-700 hover:underline transition-all duration-150"
        >
          <Trash2 size={16} /> Xoá
        </button>
      </div>
    </div>
  );
}
