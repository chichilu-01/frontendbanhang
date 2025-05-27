import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API from "../api/axios";
import MediaList from "../components/MediaList";
import ProductMedia from "../components/ProductMedia";
import UploadMultipleMedia from "../components/UploadMultipleMedia";
import ProductRating from "../components/ProductRating";
import { AuthContext } from "../context/AuthContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshMedia, setRefreshMedia] = useState(0);
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    axios
      .get(`https://backendbanhang-production.up.railway.app/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("❌ Lỗi khi lấy sản phẩm:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const triggerReload = () => setRefreshMedia((prev) => prev + 1);

  const addToCart = async () => {
    if (!user) {
      alert("Vui lòng đăng nhập để thêm vào giỏ hàng");
      return;
    }

    try {
      const response = await API.post("/cart/add", {
        product_id: parseInt(id),
        quantity: 1,
      });

      if (response.status === 200 || response.status === 201) {
        const notification = document.createElement("div");
        notification.className =
          "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-out";
        notification.textContent = `✅ Đã thêm "${product.name}" vào giỏ hàng`;
        document.body.appendChild(notification);

        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification);
          }
        }, 3000);
      }
    } catch (error) {
      console.error("Lỗi thêm vào giỏ hàng:", error);
      const errorMsg =
        error.response?.data?.message || "Lỗi khi thêm vào giỏ hàng";
      alert(`❌ ${errorMsg}`);
    }
  };

  if (loading) return <p className="p-6">Đang tải...</p>;
  if (!product)
    return <p className="p-6 text-red-500">Không tìm thấy sản phẩm.</p>;

  return (
    <div className="p-3 sm:p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6">
        {product.main_image && (
          <img
            src={product.main_image}
            alt={product.name}
            className="w-full h-64 object-cover rounded-xl mb-6"
          />
        )}
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-center sm:text-left">
          {product.name}
        </h1>

        <p className="text-gray-700 mb-4 text-sm sm:text-base leading-relaxed">
          {product.description}
        </p>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <p className="text-green-600 font-bold text-xl sm:text-2xl lg:text-3xl">
            {Math.floor(product.price).toLocaleString("vi-VN")} ₫
          </p>

          <div className="flex items-center text-yellow-400 text-lg">
            <span>⭐⭐⭐⭐⭐</span>
            <span className="text-gray-600 ml-2 text-sm">(128 đánh giá)</span>
          </div>
        </div>

        <button
          onClick={addToCart}
          className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 font-semibold text-lg shadow-lg"
        >
          🛒 Thêm vào giỏ hàng
        </button>
      </div>

      {/* 👉 Admin chỉ */}
      {isAdmin && (
        <>
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
              📤 Upload ảnh / video
            </h2>
            <UploadMultipleMedia productId={id} onUploaded={triggerReload} />
          </div>

          <div className="mt-6 bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
              🗂️ Media đã upload
            </h2>
            <MediaList productId={id} refreshTrigger={refreshMedia} />
          </div>
        </>
      )}

      <div className="mt-6 bg-white rounded-2xl shadow-lg p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
          🖼️ Thư viện sản phẩm
        </h2>
        <ProductMedia productId={id} />
      </div>

      <ProductRating productId={id} />
    </div>
  );
}
