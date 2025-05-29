import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";
import { useMiniCart } from "../context/MiniCartContext";

import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { motion } from "framer-motion";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { openMiniCart } = useMiniCart();

  // Load sản phẩm
  useEffect(() => {
    API.get("/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi tải sản phẩm:", err);
        setLoading(false);
      });
  }, []);

  // Thêm vào giỏ hàng
  const addToCart = async (productId, productName) => {
    try {
      const response = await API.post("/cart/add", {
        product_id: productId,
        quantity: 1,
      });

      if (response.status === 200 || response.status === 201) {
        toast.success(`✅ Đã thêm "${productName}" vào giỏ hàng`);
        openMiniCart();
      }
    } catch (err) {
      console.error("Lỗi thêm vào giỏ:", err);
      if (err.response?.status === 401) {
        toast.error("❌ Cần đăng nhập trước");
      } else {
        toast.error("❌ Có lỗi xảy ra khi thêm vào giỏ hàng");
      }
    }
  };

  // Particles
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner-pro"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800 transition-colors duration-500">
      {/* Background động */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: "transparent" },
          fullScreen: { enable: true, zIndex: 0 },
          particles: {
            number: { value: 40 },
            size: { value: 2 },
            move: { enable: true, speed: 0.5 },
            opacity: { value: 0.3 },
            color: { value: "#60a5fa" },
            links: { enable: true, color: "#60a5fa", opacity: 0.4 },
          },
        }}
      />

      {/* Hero section */}
      <section className="relative z-10 text-white bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            🛍️ Chào mừng đến Shop
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl mb-8 opacity-90"
          >
            Khám phá những sản phẩm tuyệt vời với giá tốt nhất
          </motion.p>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8 }}
            className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-8 py-3"
          >
            <span className="text-lg font-semibold">
              {products.length} sản phẩm đang chờ bạn
            </span>
          </motion.div>
        </div>
      </section>

      {/* Danh sách sản phẩm */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Sản phẩm nổi bật
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        {products.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-300 py-8">
            Chưa có sản phẩm nào
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="card-3d bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                <div className="relative aspect-w-16 aspect-h-9 flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-100 to-purple-200 dark:from-gray-700 dark:to-gray-800">
                  <span className="text-5xl animate-bounce">📦</span>
                  <div className="absolute top-2 right-2 glass-pro rounded-full px-3 py-1">
                    <span className="text-xs font-semibold text-purple-600">
                      HOT
                    </span>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xl font-bold gradient-text">
                      {Math.floor(product.price)
                        ?.toLocaleString("vi-VN")
                        .replace(/,/g, ".")}{" "}
                      ₫
                    </span>
                    <span className="text-yellow-400 text-sm animate-pulse">
                      ⭐⭐⭐⭐⭐
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 mt-4">
                    <Link
                      to={`/products/${product.id}`}
                      className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 text-center font-semibold"
                    >
                      👁️ Xem chi tiết
                    </Link>
                    <button
                      onClick={() => addToCart(product.id, product.name)}
                      className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 font-semibold"
                    >
                      🛒 Thêm giỏ hàng
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
