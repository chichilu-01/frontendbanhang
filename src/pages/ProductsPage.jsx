import React, { useEffect, useState } from "react";
import { getProducts } from "@services/api";
import ProductCard from "@components/ProductCard"; // dùng giống Home

const formatVND = (value) => (Number(value) || 0).toLocaleString("vi-VN") + "₫";

const CATEGORIES = [
  { key: "all", label: "Tất cả" },
  { key: "giay", label: "Giày / Dép" },
  { key: "ao", label: "Áo" },
  { key: "quan", label: "Quần" },
];

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [activeCat, setActiveCat] = useState("all");
  const [loading, setLoading] = useState(false);

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

  const filterByCategory = (p) => {
    const name = (p.name || "").toLowerCase();

    if (activeCat === "giay") {
      return (
        name.includes("giày") ||
        name.includes("giay") ||
        name.includes("dép") ||
        name.includes("dep")
      );
    }
    if (activeCat === "ao") {
      return name.includes("áo") || name.includes("ao ");
    }
    if (activeCat === "quan") {
      return name.includes("quần") || name.includes("quan ");
    }
    return true; // all
  };

  const filtered = products.filter(filterByCategory);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🗂️ Sản phẩm</h1>

      {/* Nút lọc */}
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
