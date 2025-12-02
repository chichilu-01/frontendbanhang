import React, { useEffect, useState } from "react";
import { getProducts } from "@services/api";
import ProductCard from "@components/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProducts();
        console.log("📦 DATA SẢN PHẨM:", res.data);
        setProducts(res.data);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const bannerImages = [
    "https://res.cloudinary.com/di3kcy96q/image/upload/v1762412469/banner3_xcfrtl.png",
    "https://res.cloudinary.com/di3kcy96q/image/upload/v1762412467/banner1_f5vake.jpg",
    "https://res.cloudinary.com/di3kcy96q/image/upload/v1762412467/banner2_upweqp.jpg",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🎨 Hero Banner */}
      <section className="mb-12 relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop
          className="h-[400px] md:h-[600px] rounded-2xl overflow-hidden shadow-lg"
        >
          {bannerImages.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-full">
                {/* ✅ Ảnh hiển thị full khung */}
                <img
                  src={img}
                  alt={`Banner ${i + 1}`}
                  className="block w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/1200x600?text=Banner+Not+Found";
                  }}
                />
                {/* Overlay chữ */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-10">
                  <h2 className="text-white text-3xl md:text-5xl font-extrabold drop-shadow-lg tracking-wide">
                    ✨ Welcome to MyShop ✨
                  </h2>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 🌟 Danh mục nổi bật */}
      <section className="max-w-6xl mx-auto px-4 mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          🌟 Danh mục nổi bật
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {[
            "Thời trang",
            "Giày dép",
            "Túi xách",
            "Công nghệ",
            "Phụ kiện",
            "Khác",
          ].map((cat, i) => (
            <div
              key={i}
              className="bg-white border rounded-xl py-4 text-center text-gray-700 font-medium shadow hover:shadow-xl cursor-pointer transition-transform duration-300 hover:-translate-y-2"
            >
              {cat}
            </div>
          ))}
        </div>
      </section>

      {/* 🆕 Sản phẩm mới */}
      <section className="max-w-6xl mx-auto px-4 mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            🆕 Sản phẩm mới nhất
          </h2>
          <Link
            to="/products"
            className="text-sm text-blue-600 hover:underline"
          >
            Xem tất cả →
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-[200px] text-gray-500 text-lg">
            ⏳ Đang tải sản phẩm...
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">
            Hiện chưa có sản phẩm nào được thêm.
          </p>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop={products.length > 1}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 10 },
              640: { slidesPerView: 2, spaceBetween: 15 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 25 },
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="transition-transform duration-300 hover:scale-105">
                  <ProductCard product={product} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>

      {/* 🧩 Footer */}
      <footer className="mt-16 py-8 bg-gray-900 text-gray-300 text-center">
        <p>© {new Date().getFullYear()} MyShop. All rights reserved.</p>
        <p className="text-sm mt-2">Built with ❤️ by Minh Phuong</p>
      </footer>
    </div>
  );
}
