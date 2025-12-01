import React, { useEffect, useState } from "react";

// ===================== FORMAT GIÁ VN =====================
const formatVND = (value) => {
  const num = Number(value) || 0;
  return num.toLocaleString("vi-VN") + "₫";
};

export default function ProductInfo({ product, addToCart, mainImage}) {
  // ---- CHUẨN HOÁ LIST ----
  const normalize = (list) => {
    if (!list) return [];
    if (Array.isArray(list)) return list.map((v) => v?.toString());
    if (typeof list === "string") return list.split(",").map((s) => s.trim());
    return [];
  };

  const sizes = normalize(product?.sizes);
  const colors = normalize(product?.colors);

  // ---- STATE ----
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  // ⭐ Reset lại chọn size/màu khi đổi sản phẩm!
  useEffect(() => {
    setSelectedSize(sizes[0] || "");
    setSelectedColor(colors[0] || "");
  }, [product?.id]);

  // ---- ADD CART ----
  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor)
      return alert("Vui lòng chọn size và màu!");

    const safe = {
      ...product,
      id: product.id,
      selectedSize,
      selectedColor,
      image_url: mainImage || product.image_url || product.gallery?.[0] || "",
    };

    addToCart(safe);
  };

  // ---- DISCOUNT ----
  const discountPercent = product?.discount || 0;
  const originalPrice = discountPercent
    ? Math.floor(product.price / (1 - discountPercent / 100))
    : product.price;

  return (
    <div>
      {/* TÊN */}
      <h1 className="text-3xl font-bold mb-3 text-gray-900">
        {product?.name || "Không tên"}
      </h1>

      {/* SAO */}
      <div className="flex items-center gap-1 text-yellow-400 mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i}>{i < product.rating ? "★" : "☆"}</span>
        ))}
        <span className="text-gray-500 text-sm ml-2">
          {product?.rating?.toFixed?.(1) || "0.0"} / 5
        </span>
      </div>

      {/* GIÁ */}
      <div className="mb-4">
        <span className="text-2xl text-red-600 font-bold">
          {formatVND(product?.price)}
        </span>

        {discountPercent > 0 && (
          <>
            <span className="ml-2 text-gray-400 line-through text-sm">
              {formatVND(originalPrice)}
            </span>
            <span className="ml-2 bg-red-500 text-white px-2 py-0.5 rounded text-xs">
              -{discountPercent}%
            </span>
          </>
        )}
      </div>

      {/* TỒN KHO */}
      <p className="text-sm text-gray-600 mb-4">
        {product?.stock > 0 ? `Còn ${product.stock} sản phẩm` : "❌ Hết hàng"}
      </p>

      {/* SIZE */}
      {sizes.length > 0 && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Chọn size</label>
          <div className="flex gap-2 flex-wrap">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 rounded border text-sm transition-all ${
                  selectedSize === size
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white hover:bg-gray-100 border-gray-300"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* MÀU */}
      {colors.length > 0 && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Chọn màu</label>
          <div className="flex gap-2 flex-wrap">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-3 py-1 rounded border text-sm transition-all ${
                  selectedColor === color
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white hover:bg-gray-100 border-gray-300"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* MÔ TẢ */}
      <p className="text-gray-700 mb-6">{product?.description}</p>

      {/* BUTTON */}
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
