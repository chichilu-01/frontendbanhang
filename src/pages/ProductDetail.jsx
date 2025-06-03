//Trang chính: gọi API, truyền props
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "@services/api";
import { useCart } from "@context/CartContext";
import ProductGallery from "@components/ProductGallery";
import ProductInfo from "@components/ProductInfo";
import ProductReviews from "@components/ProductReviews";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [showLightbox, setShowLightbox] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);
        const data = res.data;
        setProduct(data);
        setMainImage(data.image || data.images?.[0] || "");
      } catch (error) {
        console.error("Lỗi khi tải chi tiết sản phẩm:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div className="p-6">Đang tải...</div>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
      <ProductGallery
        images={product.images}
        mainImage={mainImage}
        setMainImage={setMainImage}
        showLightbox={showLightbox}
        setShowLightbox={setShowLightbox}
        name={product.name}
      />
      <ProductInfo product={product} addToCart={addToCart} />
      <ProductReviews productId={product.id} />
    </div>
  );
}
