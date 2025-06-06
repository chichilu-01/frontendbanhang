import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const stars = Math.round(product.rating || 0);

  return (
    <div className="rounded-xl border bg-white shadow hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col">
      <Link to={`/product/${product.id}`} className="block">
        <img
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.name}
          className="w-full h-40 object-cover"
        />
      </Link>

      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-800 truncate mb-1">
            {product.name}
          </h2>

          <div className="flex items-center gap-1 text-yellow-400 text-sm mb-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>{i < stars ? "★" : "☆"}</span>
            ))}
            <span className="text-gray-500 text-xs ml-2">
              {product.rating?.toFixed?.(1) || "0.0"}/5
            </span>
          </div>

          <p className="text-blue-600 font-bold text-lg mb-2">
            {product.price?.toLocaleString()}₫
          </p>

          {product.stock <= 0 && (
            <span className="inline-block text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">
              Hết hàng
            </span>
          )}
        </div>

        <Link
          to={`/product/${product.id}`}
          className="mt-4 inline-block text-center bg-blue-600 text-white text-sm px-4 py-1.5 rounded hover:bg-blue-700 transition"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
}
