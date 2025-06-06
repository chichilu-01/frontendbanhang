// src/components/CartItem.jsx
import React from "react";

export default function CartItem({ item, onRemove, onQuantityChange }) {
  return (
    <div className="flex justify-between items-center border p-4 rounded">
      <div>
        <h2 className="font-semibold">{item.name}</h2>
        <p className="text-sm text-gray-500">
          Size: {item.selectedSize} | Màu: {item.selectedColor}
        </p>
        <p className="text-blue-600 font-medium">
          {item.price.toLocaleString()}₫ × {item.quantity}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="number"
          min={1}
          value={item.quantity}
          onChange={(e) =>
            onQuantityChange(
              item.id,
              item.selectedSize,
              item.selectedColor,
              parseInt(e.target.value),
            )
          }
          className="w-16 px-2 py-1 border rounded"
        />
        <button
          onClick={() =>
            onRemove(item.id, item.selectedSize, item.selectedColor)
          }
          className="text-red-600 hover:underline"
        >
          Xoá
        </button>
      </div>
    </div>
  );
}
