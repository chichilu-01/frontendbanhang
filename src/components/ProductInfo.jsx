import React, { useEffect, useState } from "react";

// ===================== FORMAT GIÁ VN =====================
const formatVND = (value) => {
  const num = Number(value) || 0;
  return num.toLocaleString("vi-VN") + "₫";
};

// ===================== BẢN ĐỒ MÀU =====================
const COLOR_MAP = {
  đen: { r: 30, g: 30, b: 30 },
  trắng: { r: 240, g: 240, b: 240 },
  xanh: { r: 70, g: 130, b: 200 },
  đỏ: { r: 200, g: 50, b: 50 },
  vàng: { r: 220, g: 200, b: 40 },
};

// ===================== TÍNH MÀU CHỦ ĐẠO CỦA ẢNH =====================
const getDominantColor = (imgUrl) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imgUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

      let r = 0,
        g = 0,
        b = 0,
        count = 0;
      for (let i = 0; i < data.length; i += 4 * 50) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        count++;
      }

      resolve({ r: r / count, g: g / count, b: b / count });
    };
  });
};

// ===================== TÍNH ĐỘ GIỐNG NHAU GIỮA 2 MÀU =====================
const colorDistance = (c1, c2) => {
  return Math.sqrt(
    Math.pow(c1.r - c2.r, 2) +
      Math.pow(c1.g - c2.g, 2) +
      Math.pow(c1.b - c2.b, 2),
  );
};

export default function ProductInfo({
  product,
  addToCart,
  mainImage,
  setMainImage,
}) {
  // ===================== CHUẨN HOÁ LIST =====================
  const normalize = (list) => {
    if (!list) return [];

    try {
      let clean = list;

      // Nếu là JSON array → parse
      if (typeof clean === "string" && clean.trim().startsWith("[")) {
        clean = JSON.parse(clean);
      }

      // Nếu là string → tách theo dấu phẩy
      if (typeof clean === "string") {
        return clean
          .replace(/"/g, "") // ⭐ XÓA TOÀN BỘ DẤU "
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      }

      // Nếu đã là array → loại bỏ dấu "
      if (Array.isArray(clean)) {
        return clean.map((s) => s.replace(/"/g, "").trim());
      }

      return [];
    } catch {
      return [];
    }
  };

  const sizes = normalize(product?.sizes);
  const colors = normalize(product?.colors);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  // RESET size & màu khi đổi sản phẩm
  useEffect(() => {
    setSelectedSize(sizes[0] || "");
    setSelectedColor(colors[0] || "");
  }, [product?.id]);

  // ===================== TÌM ẢNH THEO MÀU =====================
  const findImageByColor = async (color) => {
    if (!product.media || product.media.length === 0) return null;

    const target = COLOR_MAP[color.toLowerCase()];
    if (!target) return null;

    let bestImg = null;
    let bestScore = Infinity;

    for (const img of product.media) {
      const dominant = await getDominantColor(img.url);
      const score = colorDistance(target, dominant);

      if (score < bestScore) {
        bestScore = score;
        bestImg = img.url;
      }
    }

    return bestImg;
  };

  // ===================== THÊM VÀO CART =====================
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

  // ===================== DISCOUNT =====================
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

      {/* ===================== SIZE ===================== */}
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

      {/* ===================== MÀU ===================== */}
      {colors.length > 0 && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Chọn màu</label>
          <div className="flex gap-2 flex-wrap">
            {colors.map((color) => (
              <button
                key={color}
                onClick={async () => {
                  setSelectedColor(color);

                  const autoImg = await findImageByColor(color);
                  if (autoImg) setMainImage(autoImg);
                }}
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
