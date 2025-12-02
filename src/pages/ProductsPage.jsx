import React, { useEffect, useState } from "react";
import { getProducts } from "@services/api";
import ProductCard from "@components/ProductCard";
import { useSearchParams } from "react-router-dom"; // 👈 thêm

// Các tab filter hiển thị trên trang
const CATEGORIES = [
  { key: "all", label: "Tất cả" },
  { key: "thoitrang", label: "Thời trang" },
  { key: "giay", label: "Giày / Dép" },
  { key: "tuixach", label: "Túi xách" },
  { key: "congnghe", label: "Công nghệ" },
  { key: "phukien", label: "Phụ kiện" },
  { key: "khac", label: "Khác" },
];

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();

  // Lấy category từ URL lần đầu
  const [activeCat, setActiveCat] = useState(() => {
    return searchParams.get("category") || "all";
  });

  // Nếu URL đổi (vd: user click từ Home lần nữa khi đang ở /products),
  // thì cập nhật lại activeCat
  useEffect(() => {
    const cat = searchParams.get("category") || "all";
    setActiveCat(cat);
  }, [searchParams]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await getProducts();
        setProducts(res.data || []);
      } catch (err) {
        console.error("Lỗi load products:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Hàm lọc theo category
  const filterByCategory = (p) => {
    const name = (p.name || "").toLowerCase();
    const cat = (p.category || "").toLowerCase();

    if (activeCat === "thoitrang") {
      return cat === "thời trang".toLowerCase();
    }

    if (activeCat === "giay") {
      // ưu tiên cột category, nếu chưa set thì fallback theo tên
      if (cat === "giày dép".toLowerCase()) return true;
      return (
        name.includes("giày") ||
        name.includes("giay") ||
        name.includes("dép") ||
        name.includes("dep")
      );
    }

    if (activeCat === "tuixach") {
      if (cat === "túi xách".toLowerCase()) return true;
      return (
        name.includes("túi") ||
        name.includes("tui") ||
        name.includes("túi xách")
      );
    }

    if (activeCat === "congnghe") {
      if (cat === "công nghệ".toLowerCase()) return true;
      return name.includes("công nghệ") || name.includes("cong nghe");
    }

    if (activeCat === "phukien") {
      if (cat === "phụ kiện".toLowerCase()) return true;
      return name.includes("phụ kiện") || name.includes("phu kien");
    }

    if (activeCat === "khac") {
      // Những sản phẩm không thuộc các nhóm trên
      const knownCats = [
        "thời trang",
        "giày dép",
        "túi xách",
        "công nghệ",
        "phụ kiện",
      ];
      return !knownCats.includes(cat);
    }

    // "all"
    return true;
  };

  const filtered = products.filter(filterByCategory);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🗂️ Sản phẩm</h1>

      {/* Nút lọc (tab) */}
      <div className="flex flex-wrap gap-2 mb-4">
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() => setActiveCat(c.key)}
            className={
              "px-4 py-2 rounded-full text-sm border " +
              (activeCat === c.key
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 hover:bg-gray-50")
            }
          >
            {c.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Đang tải sản phẩm...</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-500">Không có sản phẩm phù hợp.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
