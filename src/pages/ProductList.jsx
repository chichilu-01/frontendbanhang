import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "@/api/axios";

const ALL_SIZES = ["S", "M", "L", "XL"];
const ALL_COLORS = ["Đỏ", "Xanh", "Vàng", "Đen", "Trắng"];

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({
    gender: "",
    sizes: [],
    colors: [],
    sort: "",
    minPrice: "",
    maxPrice: "",
    search: "",
    status: "",
    brand: "",
  });
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggest, setShowSuggest] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const limit = 12;

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await API.get("/api/products", {
        params: {
          gender: filter.gender,
          sizes: filter.sizes.join(","),
          colors: filter.colors.join(","),
          sort: filter.sort,
          minPrice: filter.minPrice,
          maxPrice: filter.maxPrice,
          search: filter.search,
          status: filter.status,
          brand: filter.brand,
          page,
          limit,
        },
      });
      setProducts(res.data.data);
      setTotal(res.data.total);
    } catch (err) {
      console.error("Lỗi khi lấy sản phẩm:", err);
      setError("Không thể tải danh sách sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  const fetchSuggestions = async (text) => {
    if (!text) return setSuggestions([]);
    try {
      const res = await API.get("/api/products/suggest", {
        params: { keyword: text },
      });
      setSuggestions(res.data);
    } catch (err) {
      console.error("Gợi ý thất bại", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, filter]);

  const toggleFilter = (type, value) => {
    const updated = filter[type].includes(value)
      ? filter[type].filter((v) => v !== value)
      : [...filter[type], value];
    setFilter({ ...filter, [type]: updated });
    setPage(1);
  };

  const handleSearchChange = (e) => {
    const text = e.target.value;
    setFilter({ ...filter, search: text });
    fetchSuggestions(text);
    setShowSuggest(true);
  };

  const applySuggestion = (text) => {
    setFilter({ ...filter, search: text });
    setShowSuggest(false);
    setPage(1);
  };

  const resetFilter = () => {
    setFilter({
      gender: "",
      sizes: [],
      colors: [],
      sort: "",
      minPrice: "",
      maxPrice: "",
      search: "",
      status: "",
      brand: "",
    });
    setPage(1);
  };

  const addToCart = async (productId, productName) => {
    try {
      const response = await API.post("/api/cart/add", {
        product_id: productId,
        quantity: 1,
      });

      if (response.status === 200 || response.status === 201) {
        const notification = document.createElement("div");
        notification.className =
          "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-out";
        notification.textContent = `✅ Đã thêm \"${productName}\" vào giỏ hàng`;
        document.body.appendChild(notification);

        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification);
          }
        }, 3000);
      }
    } catch (err) {
      console.error("Lỗi thêm vào giỏ:", err);
      if (err.response?.status === 401) {
        alert("❌ Cần đăng nhập trước");
      } else {
        alert("❌ Có lỗi xảy ra khi thêm vào giỏ hàng");
      }
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 max-w-7xl mx-auto">
      <aside className="w-full lg:w-1/4 bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-3">🔎 Bộ lọc</h2>

        <input
          type="text"
          placeholder="Tìm theo tên"
          className="border px-3 py-2 rounded w-full mb-2"
          value={filter.search}
          onChange={handleSearchChange}
          onFocus={() => setShowSuggest(true)}
          onBlur={() => setTimeout(() => setShowSuggest(false), 200)}
        />
        {showSuggest && suggestions.length > 0 && (
          <ul className="border rounded bg-white max-h-48 overflow-y-auto text-sm mb-3">
            {suggestions.map((s, i) => (
              <li
                key={i}
                className="px-3 py-1 cursor-pointer hover:bg-emerald-100"
                onClick={() => applySuggestion(s)}
              >
                {s}
              </li>
            ))}
          </ul>
        )}

        <label className="block font-medium mt-2">Giới tính</label>
        <select
          className="border rounded w-full px-3 py-2 mb-2"
          value={filter.gender}
          onChange={(e) => setFilter({ ...filter, gender: e.target.value })}
        >
          <option value="">Tất cả</option>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </select>

        <label className="block font-medium mt-2">Size</label>
        {ALL_SIZES.map((size) => (
          <label key={size} className="block text-sm">
            <input
              type="checkbox"
              className="mr-2"
              checked={filter.sizes.includes(size)}
              onChange={() => toggleFilter("sizes", size)}
            />
            {size}
          </label>
        ))}

        <label className="block font-medium mt-2">Màu sắc</label>
        {ALL_COLORS.map((color) => (
          <label key={color} className="block text-sm">
            <input
              type="checkbox"
              className="mr-2"
              checked={filter.colors.includes(color)}
              onChange={() => toggleFilter("colors", color)}
            />
            {color}
          </label>
        ))}

        <button
          className="mt-4 w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
          onClick={resetFilter}
        >
          ❌ Xóa bộ lọc
        </button>
      </aside>

      <main className="flex-1">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
          🛍️ Danh sách sản phẩm ({total})
        </h1>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="spinner-pro"></div>
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : products.length === 0 ? (
          <p className="text-gray-500 text-center">
            Không có sản phẩm nào khớp bộ lọc.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="border rounded-2xl p-3 sm:p-4 shadow-md hover:shadow-lg transition-all duration-300 bg-white hover:transform hover:scale-105"
              >
                <h2 className="text-lg sm:text-xl font-semibold mb-2 line-clamp-2">
                  {product.name}
                </h2>
                <p className="text-gray-700 mb-2 text-sm sm:text-base line-clamp-3">
                  {product.description}
                </p>
                <p className="text-green-600 font-bold text-lg sm:text-xl mb-4">
                  {Math.floor(product.price)
                    .toLocaleString("vi-VN")
                    .replace(/,/g, ".")}{" "}
                  ₫
                </p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:justify-between">
                  <Link
                    to={`/products/${product.id}`}
                    className="bg-blue-600 text-white px-6 py-3 text-base sm:text-sm rounded-xl hover:bg-blue-700 transition-colors text-center font-semibold min-h-[48px] flex items-center justify-center"
                  >
                    Chi tiết
                  </Link>
                  <button
                    onClick={() => addToCart(product.id, product.name)}
                    className="bg-green-600 text-white px-6 py-3 text-base sm:text-sm rounded-xl hover:bg-green-700 transition-colors font-semibold min-h-[48px] flex items-center justify-center"
                  >
                    Thêm giỏ
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-6 gap-2 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`px-3 py-1 rounded border transition ${page === i + 1 ? "bg-emerald-600 text-white" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
