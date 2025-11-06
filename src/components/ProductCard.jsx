import React from "react";
import { Link } from "react-router-dom";

// ✅ Hàm format tiền kiểu Việt Nam
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

export default function ProductCard({ product }) {
  const stars = Math.round(product.rating || 0);

  // ✅ Ảnh chính và ảnh hover
  const mainImage =
    product.media?.[0]?.url ||
    product.image_url ||
    product.image ||
    "https://via.placeholder.com/400x400?text=No+Image";

  const hoverImage =
    product.media?.[1]?.url ||
    product.images?.[1] ||
    product.image_url ||
    mainImage;

  const hasHoverImage = hoverImage && hoverImage !== mainImage;

  // ✅ Sản phẩm mới (7 ngày)
  const isNew =
    new Date(product.created_at) >
    new Date(Date.now() - 1000 * 60 * 60 * 24 * 7);

  // ✅ Giảm giá
  const discountPercent = product.discount || 0;
  const originalPrice = discountPercent
    ? Math.floor(product.price / (1 - discountPercent / 100))
    : product.price;

  return (
    <div className="group relative bg-white rounded-xl shadow hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Ảnh sản phẩm */}
      <div className="relative w-full h-64 overflow-hidden">
        <img
          src={mainImage}
          alt={product.name}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            hasHoverImage ? "group-hover:opacity-0" : ""
          }`}
        />
        {hasHoverImage && (
          <img
            src={hoverImage}
            alt={`${product.name} hover`}
            className="absolute top-0 left-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}

        {/* Badges */}
        {isNew && (
          <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
            🆕 Mới
          </span>
        )}
        {discountPercent > 0 && (
          <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
            🔥 -{discountPercent}%
          </span>
        )}

        {/* Overlay nút xem chi tiết */}
        <Link
          to={`/product/${product.id}`}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 opacity-0 group-hover:opacity-100 transition-all duration-300 text-white font-semibold text-sm rounded"
        >
          🔍 Xem chi tiết
        </Link>
      </div>

      {/* Nội dung */}
      <div className="p-4 flex flex-col justify-between h-36">
        <h3 className="text-gray-800 font-semibold truncate mb-1">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 text-yellow-400 text-sm mb-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>{i < stars ? "⭐" : "☆"}</span>
          ))}
          <span className="text-gray-500 text-xs ml-2">
            {product.rating?.toFixed(1) || "0.0"}/5
          </span>
        </div>

        {/* ✅ Giá hiển thị đúng chuẩn VND */}
        <div className="flex items-baseline gap-2">
          <span className="text-red-600 font-bold text-lg">
            {formatVND(product.price)}
          </span>
          {discountPercent > 0 && (
            <span className="text-gray-400 line-through text-sm">
              {formatVND(originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
