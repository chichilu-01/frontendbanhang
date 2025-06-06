import React, { useState } from "react";

export default function ProductInfo({ product, addToCart }) {
  const sizes = Array.isArray(product?.sizes) ? product.sizes : [];
  const colors = Array.isArray(product?.colors) ? product.colors : [];

  const [selectedSize, setSelectedSize] = useState(sizes[0] || "");
  const [selectedColor, setSelectedColor] = useState(colors[0] || "");

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      return alert("Vui lòng chọn size và màu!");
    }
    addToCart({
      ...product,
      selectedSize,
      selectedColor,
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">
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
          {product?.rating?.toFixed(1) || "0.0"} / 5
        </span>
      </div>

      <p className="text-xl text-blue-600 font-semibold mb-2">
        {product?.price?.toLocaleString?.() || 0}₫
      </p>
      <p className="text-sm text-gray-600 mb-4">
        {product?.stock > 0 ? `Còn ${product.stock} sản phẩm` : "Hết hàng"}
      </p>

      {/* Chọn size */}
      {sizes.length > 0 && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Chọn size</label>
          <div className="flex gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 rounded border ${
                  selectedSize === size ? "bg-blue-600 text-white" : "bg-white"
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
          <div className="flex gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-3 py-1 rounded border ${
                  selectedColor === color
                    ? "bg-blue-600 text-white"
                    : "bg-white"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      <p className="text-gray-700 mb-6">
        {product?.description || "Không có mô tả."}
      </p>

      <button
        onClick={handleAddToCart}
        disabled={product?.stock <= 0}
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {product?.stock <= 0 ? "Hết hàng" : "Thêm vào giỏ hàng"}
      </button>
    </div>
  );
}
