import React from "react";
import { Link } from "react-router-dom";

// Format VND
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

  // ⭐ STAR CALC
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

  const hasHover = hoverImage && hoverImage !== mainImage;

  const isNew =
    new Date(product.created_at) >
    new Date(Date.now() - 1000 * 60 * 60 * 24 * 7);

  const discount = product.discount || 0;
  const originalPrice = discount
    ? Math.floor(product.price / (1 - discount / 100))
    : product.price;

  return (
    <div
      className="
      group relative bg-white/80 backdrop-blur-xl border border-gray-100
      rounded-2xl shadow-md hover:shadow-xl 
      transition-all duration-300 hover:-translate-y-2
      overflow-hidden cursor-pointer
    "
    >
      {/* IMAGE */}
      <div className="relative w-full h-64 overflow-hidden">
        <img
          src={mainImage}
          alt={product.name}
          className={`
            w-full h-full object-cover rounded-t-2xl
            transition-all duration-500 
            group-hover:scale-105
            ${hasHover ? "group-hover:opacity-0" : ""}
          `}
        />
        {hasHover && (
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

        {/* NEW BADGE */}
        {isNew && (
          <span
            className="
            absolute top-3 left-3 
            bg-gradient-to-r from-green-500 to-emerald-600
            text-white text-xs font-semibold 
            px-3 py-1 rounded-full shadow
          "
          >
            🆕 Mới
          </span>
        )}

        {/* DISCOUNT BADGE */}
        {discount > 0 && (
          <span
            className="
            absolute top-3 right-3 
            bg-gradient-to-r from-red-500 to-rose-600
            text-white text-xs font-semibold 
            px-3 py-1 rounded-full shadow
          "
          >
            🔥 -{discount}%
          </span>
        )}

        {/* OVERLAY BUTTON – PRO */}
        <Link
          to={`/product/${product.id}`}
          className="
            absolute inset-0 flex items-end justify-center
            bg-gradient-to-t from-black/50 to-transparent 
            opacity-0 group-hover:opacity-100 
            transition-all duration-300
          "
        >
          <span
            className="
              mb-4 px-4 py-2 bg-white/90 backdrop-blur 
              rounded-full text-gray-800 font-semibold text-sm
              shadow-lg hover:bg-white transition
            "
          >
            🔍 Xem chi tiết
          </span>
        </Link>
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <h3 className="text-gray-900 font-semibold text-[15px] mb-1 line-clamp-1">
          {product.name}
        </h3>

        {/* RATING PRO */}
        <div className="flex items-center gap-1 mb-1">
          {Array(fullStars)
            .fill(0)
            .map((_, i) => (
              <svg
                key={`full-${i}`}
                className="w-4 h-4 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967..." />
              </svg>
            ))}

          {hasHalf === 1 && (
            <svg
              className="w-4 h-4 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 2l1.286 3.967..." />
            </svg>
          )}

          {Array(emptyStars)
            .fill(0)
            .map((_, i) => (
              <svg
                key={`empty-${i}`}
                className="w-4 h-4 text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 2l1.286 3.967..." />
              </svg>
            ))}

          <span className="text-gray-500 text-xs ml-1">
            {rating.toFixed(1)}
          </span>
        </div>

        {/* PRICE */}
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-red-600 font-bold text-lg">
            {formatVND(product.price)}
          </span>

          {discount > 0 && (
            <span className="text-gray-400 line-through text-sm">
              {formatVND(originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
