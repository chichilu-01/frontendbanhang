import React from "react";
import { Link } from "react-router-dom";

// Format giá tiền
const formatVND = (value) => {
  const num = Number(value) || 0;
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(num);
};

export default function ProductCard({ product }) {
  const rating = Number(product.average_rating ?? 0);

  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.25 ? 1 : 0;
  const emptyStars = 5 - fullStars - hasHalf;

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

  const isNew =
    new Date(product.created_at) >
    new Date(Date.now() - 1000 * 60 * 60 * 24 * 7);

  const discountPercent = product.discount || 0;
  const originalPrice = discountPercent
    ? Math.floor(product.price / (1 - discountPercent / 100))
    : product.price;

  return (
    <div
      className="
        group relative rounded-xl 
        bg-white border border-gray-200 
        shadow-sm hover:shadow-xl 
        transition-all duration-300 
        hover:-translate-y-2 
        overflow-hidden
      "
    >
      {/* Ảnh sản phẩm */}
      <div className="relative w-full h-64 overflow-hidden bg-gray-50">
        <img
          src={mainImage}
          alt={product.name}
          className={`
            w-full h-full object-cover transition-all duration-500 
            ${hasHoverImage ? "group-hover:opacity-0 group-hover:scale-105" : "group-hover:scale-105"}
          `}
        />

        {hasHoverImage && (
          <img
            src={hoverImage}
            alt="hover"
            className="
              absolute inset-0 w-full h-full object-cover 
              opacity-0 group-hover:opacity-100 
              transition-all duration-500 group-hover:scale-105
            "
          />
        )}

        {/* Badge New */}
        {isNew && (
          <span
            className="
              absolute top-3 left-3 
              bg-gradient-to-r from-green-500 to-emerald-600 
              text-white text-xs font-bold 
              px-3 py-1 rounded-full shadow-md
            "
          >
            🆕 Mới
          </span>
        )}

        {/* Badge Discount */}
        {discountPercent > 0 && (
          <span
            className="
              absolute top-3 right-3 
              bg-gradient-to-r from-red-500 to-rose-600 
              text-white text-xs font-bold 
              px-3 py-1 rounded-full shadow
            "
          >
            🔥 -{discountPercent}%
          </span>
        )}

        {/* Overlay */}
        <Link
          to={`/product/${product.id}`}
          className="
            absolute inset-0 flex items-end justify-center
            bg-black/0 group-hover:bg-black/30
            transition-all duration-300 opacity-0 group-hover:opacity-100
          "
        >
          <div
            className="
              mb-4 px-4 py-2 
              bg-white/90 backdrop-blur 
              rounded-full text-gray-800 
              font-semibold text-sm shadow-lg
            "
          >
            🔍 Xem chi tiết
          </div>
        </Link>
      </div>

      {/* Nội dung */}
      <div className="p-4 flex flex-col justify-between h-36">
        <h3 className="text-gray-800 font-semibold text-[15px] line-clamp-2 mb-2 leading-tight">
          {product.name}
        </h3>

        {/* ⭐ Rating đẹp hơn */}
        <div className="flex items-center gap-1 text-yellow-400 text-sm mb-2">
          {Array(fullStars)
            .fill(0)
            .map((_, i) => (
              <span key={`full-${i}`}>★</span>
            ))}

          {hasHalf === 1 && <span>⯨</span>}

          {Array(emptyStars)
            .fill(0)
            .map((_, i) => (
              <span key={`empty-${i}`} className="text-gray-300">
                ☆
              </span>
            ))}

          <span className="text-gray-500 text-xs ml-1">
            {rating.toFixed(1)}/5
          </span>
        </div>

        {/* Giá */}
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
