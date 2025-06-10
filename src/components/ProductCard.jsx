import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const stars = Math.round(product.rating || 0);

  const isNew =
    new Date(product.created_at) >
    new Date(Date.now() - 1000 * 60 * 60 * 24 * 7); // trong 7 ngày
  const discountPercent = 30; // giả lập
  const originalPrice = Math.floor(product.price / (1 - discountPercent / 100));

  const hasHoverImage =
    Array.isArray(product.images) && product.images.length > 1;

  return (
    <div className="rounded-xl border bg-white shadow hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col group relative">
      <Link to={`/product/${product.id}`} className="block relative">
        <div className="relative w-full h-40 overflow-hidden">
          <img
            src={
              product.image_url ||
              product.image ||
              "https://via.placeholder.com/300"
            }
            alt={product.name}
            className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
          />
          {hasHoverImage && (
            <img
              src={product.images[1]}
              alt="Ảnh phụ"
              className="w-full h-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          )}
        </div>

        {/* Badge mới */}
        {isNew && (
          <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
            🆕 Mới
          </span>
        )}

        {/* Badge giảm giá */}
        <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
          🔥 -{discountPercent}%
        </span>
      </Link>

      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-800 truncate mb-1">
            {product.name}
          </h2>

          <div className="flex items-center gap-1 text-yellow-400 text-sm mb-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>{i < stars ? "⭐" : "☆"}</span>
            ))}
            <span className="text-gray-500 text-xs ml-2">
              {product.rating?.toFixed?.(1) || "0.0"}/5
            </span>
          </div>

          <div className="mb-2">
            <p className="text-red-600 font-bold text-lg">
              💰 {product.price?.toLocaleString("vi-VN")}₫
            </p>
            <p className="text-gray-500 text-sm line-through">
              {originalPrice.toLocaleString("vi-VN")}₫
            </p>
          </div>

          {product.stock <= 0 && (
            <span className="inline-block text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">
              ❌ Hết hàng
            </span>
          )}
        </div>

        <Link
          to={`/product/${product.id}`}
          className="mt-4 inline-block text-center bg-blue-600 text-white text-sm px-4 py-1.5 rounded hover:bg-blue-700 transition"
        >
          🔍 Xem chi tiết
        </Link>
      </div>
    </div>
  );
}
