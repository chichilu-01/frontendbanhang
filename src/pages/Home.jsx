import React, { useEffect, useState } from "react";
import { getProducts } from "@services/api";
import ProductCard from "@components/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

function SearchInput() {
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // 🔎 Load gợi ý tự động
  useEffect(() => {
    if (!keyword.trim()) {
      setSuggestions([]);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        const res = await getProducts(`?search=${keyword}`);
        setSuggestions(res.data.slice(0, 5));
      } catch (err) {
        console.log("Suggestion error:", err);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [keyword]);

  const handleSearch = () => {
    const query = new URLSearchParams();

    if (keyword) query.append("search", keyword);
    if (category) query.append("category", category);
    if (minPrice) query.append("min", minPrice);
    if (maxPrice) query.append("max", maxPrice);

    window.location.href = `/products?${query.toString()}`;
  };

  return (
    <div className="relative w-full">

      {/* Ô tìm kiếm */}
      <div className="flex items-center gap-3 bg-white/40 backdrop-blur-xl border border-white/50 shadow-lg px-4 py-3 rounded-2xl focus-within:bg-white/70 focus-within:shadow-2xl transition-all duration-300">

        <span className="text-gray-700">🔍</span>

        <input
          type="text"
          className="w-full bg-transparent outline-none text-gray-800"
          placeholder="Tìm kiếm sản phẩm, danh mục..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        {/* Nút Filter */}
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="p-2 rounded-xl hover:bg-white/60 transition"
        >
          ⚙️
        </button>

        {/* Nút Search */}
        <button
          onClick={handleSearch}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl shadow hover:shadow-xl transition"
        >
          Tìm
        </button>
      </div>

      {/* AUTOCOMPLETE GỢI Ý */}
      {suggestions.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-xl overflow-hidden z-40">
          {suggestions.map((item) => (
            <Link
              key={item.id}
              to={`/product/${item.id}`}
              className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}

      {/* FILTER BOX */}
      {showFilter && (
        <div className="absolute left-0 right-0 mt-3 bg-white rounded-2xl shadow-xl p-4 z-40">
          <h3 className="font-semibold text-gray-700 mb-2">Bộ lọc nâng cao</h3>

          {/* Category */}
          <label className="block mb-3">
            <span className="text-gray-600">Danh mục:</span>
            <select
              className="w-full mt-1 p-2 border rounded-xl"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Tất cả</option>
              <option value="ao">Áo</option>
              <option value="quan">Quần</option>
              <option value="giay">Giày</option>
              <option value="tuixach">Túi xách</option>
              <option value="phukien">Phụ kiện</option>
            </select>
          </label>

          {/* PRICE */}
          <div className="flex items-center gap-3">
            <input
              type="number"
              placeholder="Giá từ..."
              className="flex-1 p-2 border rounded-xl"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />

            <input
              type="number"
              placeholder="Đến..."
              className="flex-1 p-2 border rounded-xl"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
}


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
                  <h2
                    className="
                      relative inline-block 
                      text-4xl md:text-6xl font-pacifico
                      bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 
                      bg-clip-text text-transparent
                      tracking-wide 
                      leading-[1.3]               /* tăng chiều cao để không bị cắt chữ g */
                      px-6 py-4                   /* tạo khoảng cách thoáng cho font */
                    "
                  >
                    ✨ Welcome to MyShop ✨{/* Hiệu ứng shimmer */}
                    <span
                      className="
                        absolute inset-0 
                        bg-gradient-to-r from-transparent via-white/60 to-transparent
                        animate-shimmer
                        pointer-events-none
                      "
                      style={{ transform: "skewX(-20deg)" }}
                    />
                  </h2>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 🔎 Modern Search Bar */}
      <div className="max-w-3xl mx-auto px-4 -mt-10 mb-10 relative z-20">
        <div className="
          flex items-center gap-3 
          bg-white/30 backdrop-blur-xl 
          border border-white/40 shadow-lg
          px-4 py-3 rounded-2xl
          transition-all duration-300
          focus-within:shadow-2xl focus-within:bg-white/50
        ">
          <SearchInput />
        </div>
      </div>

      {/* 🌟 Danh mục nổi bật */}
      <section className="max-w-6xl mx-auto px-4 mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          🌟 Danh mục nổi bật
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {[
            { label: "Thời trang", key: "thoitrang" },
            { label: "Áo", key: "ao" },
            { label: "Quần", key: "quan" },
            { label: "Giày dép", key: "giay" },
            { label: "Túi xách", key: "tuixach" },
            { label: "Phụ kiện", key: "phukien" },
          ].map((cat) => (
            <Link
              key={cat.key}
              to={`/products?category=${cat.key}`}
              className="bg-white border rounded-xl py-4 text-center text-gray-700 font-medium shadow hover:shadow-xl cursor-pointer transition-transform duration-300 hover:-translate-y-2"
            >
              {cat.label}
            </Link>
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
    </div>
  );
}
