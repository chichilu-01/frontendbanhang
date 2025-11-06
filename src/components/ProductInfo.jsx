import React, { useState } from "react";

// ✅ Hàm format giá kiểu Việt Nam
const formatVND = (value) => {
  const num = Number(value) || 0;
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  })
    .format(num)
    .replace("₫", "₫");
};

export default function ProductInfo({ product, addToCart }) {
  const sizes = Array.isArray(product?.sizes)
    ? product.sizes
    : typeof product?.sizes === "string"
      ? product.sizes.split(",").map((s) => s.trim())
      : [];

  const colors = Array.isArray(product?.colors)
    ? product.colors
    : typeof product?.colors === "string"
      ? product.colors.split(",").map((c) => c.trim())
      : [];

  const [selectedSize, setSelectedSize] = useState(sizes[0] || "");
  const [selectedColor, setSelectedColor] = useState(colors[0] || "");

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      return alert("Vui lòng chọn size và màu!");
    }

    const safeProduct = {
      ...product,
      id: product.id || product.product_id || crypto.randomUUID(),
      selectedSize,
      selectedColor,
    };

    console.log("🛒 Adding to cart:", safeProduct);
    addToCart(safeProduct);
  };

  // ✅ Tính toán giảm giá nếu có
  const discountPercent = product.discount || 0;
  const originalPrice = discountPercent
    ? Math.floor(product.price / (1 - discountPercent / 100))
    : product.price;

  return (
    <div>
      {/* Tên sản phẩm */}
      <h1 className="text-3xl font-bold mb-3 text-gray-900">
        {product?.name || "Không tên"}
      </h1>

      {/* Đánh giá sao */}
      <div className="flex items-center gap-1 text-yellow-400 mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i}>
            {i < Math.round(product?.rating || 0) ? "★" : "☆"}
          </span>
        ))}
        <span className="text-gray-500 text-sm ml-2">
          {product?.rating?.toFixed?.(1) || "0.0"} / 5
        </span>
      </div>

      {/* ✅ Hiển thị giá chuẩn Việt Nam */}
      <div className="mb-3">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl text-red-600 font-bold">
            {formatVND(product?.price)}
          </span>
          {discountPercent > 0 && (
            <>
              <span className="text-gray-400 line-through text-sm">
                {formatVND(originalPrice)}
              </span>
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                -{discountPercent}%
              </span>
            </>
          )}
        </div>
      </div>

      {/* Tồn kho */}
      <p className="text-sm text-gray-600 mb-4">
        {product?.stock > 0 ? `Còn ${product.stock} sản phẩm` : "❌ Hết hàng"}
      </p>

      {/* Chọn size */}
      {sizes.length > 0 && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Chọn size</label>
          <div className="flex gap-2 flex-wrap">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 rounded border transition-all ${
                  selectedSize === size
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chọn màu */}
      {colors.length > 0 && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Chọn màu</label>
          <div className="flex gap-2 flex-wrap">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-3 py-1 rounded border transition-all ${
                  selectedColor === color
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mô tả */}
      <p className="text-gray-700 mb-6 leading-relaxed">
        {product?.description || "Không có mô tả."}
      </p>

      {/* Nút thêm vào giỏ */}
      <button
        onClick={handleAddToCart}
        disabled={product?.stock <= 0}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        {product?.stock <= 0 ? "Hết hàng" : "🛒 Thêm vào giỏ hàng"}
      </button>
    </div>
  );
}
