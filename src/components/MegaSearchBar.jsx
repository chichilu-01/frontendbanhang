import React, { useState, useEffect } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { getProducts } from "@services/api";
import { Link, useNavigate } from "react-router-dom";

export default function MegaSearchBar() {
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const navigate = useNavigate();

  // --- AUTOCOMPLETE ---
  useEffect(() => {
    if (!keyword.trim()) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await getProducts(`?search=${keyword}`);
        setSuggestions(res.data.slice(0, 6));
      } catch (err) {
        console.log("Suggestion error:", err);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [keyword]);

  const handleSearch = () => {
    const query = new URLSearchParams();

    if (keyword) query.append("search", keyword);
    if (category) query.append("category", category);
    if (minPrice) query.append("min", minPrice);
    if (maxPrice) query.append("max", maxPrice);

    navigate(`/products?${query.toString()}`);
  };

  return (
    <div className="relative w-full">
      {/* Search Container */}
      <div
        className="
          flex items-center gap-3 
          bg-white/40 backdrop-blur-xl
          border border-white/50 
          shadow-lg 
          px-4 py-3 rounded-2xl
          transition-all duration-300
          focus-within:bg-white/70 focus-within:shadow-2xl
        "
      >
        <Search className="text-gray-700" size={22} />

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
          <SlidersHorizontal size={20} />
        </button>

        {/* Nút Search */}
        <button
          onClick={handleSearch}
          className="
            bg-gradient-to-r from-blue-500 to-purple-500 
            text-white px-4 py-2 rounded-xl 
            shadow hover:shadow-xl transition
          "
        >
          Tìm
        </button>
      </div>

      {/* AUTOCOMPLETE */}
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

      {/* FILTER DROPDOWN */}
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
              <option value="giay">Giày dép</option>
              <option value="tuixach">Túi xách</option>
              <option value="phukien">Phụ kiện</option>
            </select>
          </label>

          {/* Price */}
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
