import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "@services/api";
import { useCart } from "@context/CartContext";
import ProductGallery from "@components/ProductGallery";
import ProductInfo from "@components/ProductInfo";
import ProductReviews from "@components/ProductReviews";
import AdminMediaGallery from "@components/AdminMediaGallery";
import { API } from "@services/api";

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [media, setMedia] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [showLightbox, setShowLightbox] = useState(false);

  const { addToCart } = useCart();

  // ----------------------------------------
  // ⭐ CHUẨN HOÁ size & màu (mọi loại trả về)
  // ----------------------------------------
  const normalizeList = (list) => {
    if (!list) return [];

    if (Array.isArray(list)) {
      return list.map((item) =>
        typeof item === "string"
          ? item
          : item?.value || item?.name || item?.label || "",
      );
    }

    if (typeof list === "string") {
      return list.split(",").map((s) => s.trim());
    }

    return [];
  };

  const fetchData = async () => {
    try {
      const res = await getProductById(id);
      const productData = res.data;

      // 🖼 Load media
      const mediaRes = await API.get(`/media/product/${id}`);
      const mediaData = mediaRes.data || [];

      // ⭐ chuẩn hoá sizes & colors
      const fixedSizes = normalizeList(productData.sizes);
      const fixedColors = normalizeList(productData.colors);

      const prepared = {
        ...productData,
        sizes: fixedSizes,
        colors: fixedColors,
      };

      setProduct(prepared);
      setMedia(mediaData);

      // Ảnh chính
      setMainImage(
        mediaData.find((m) => m.is_main)?.url || mediaData[0]?.url || "",
      );
    } catch (error) {
      console.error("❌ Lỗi khi tải chi tiết sản phẩm:", error);
      setProduct(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (!product) return <div className="p-6">Đang tải...</div>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
      {/* --- ẢNH SẢN PHẨM --- */}
      <ProductGallery
        images={media}
        mainImage={mainImage}
        setMainImage={setMainImage}
        showLightbox={showLightbox}
        setShowLightbox={setShowLightbox}
        name={product.name}
      />

      {/* --- THÔNG TIN + SIZE + MÀU + ADD CART --- */}
      <ProductInfo
        product={product}
        addToCart={addToCart}
        mainImage={mainImage}
      />

      {/* --- ĐÁNH GIÁ --- */}
      <div className="md:col-span-2">
        <ProductReviews productId={product.id} />
      </div>

      {/* --- ADMIN MEDIA --- */}
      <div className="md:col-span-2">
        <AdminMediaGallery
          productId={product.id}
          images={media}
          onRefresh={fetchData}
        />
      </div>
    </div>
  );
}
