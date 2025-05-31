import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

export default function ProductsSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/api/products")
      .then((res) => setProducts(res.data))
      .catch(() => alert("❌ Lỗi khi tải sản phẩm"))
      .finally(() => setLoading(false));
  }, []);

  const addToCart = async (productId, productName) => {
    try {
      await API.post("/api/cart/add", { product_id: productId, quantity: 1 });
      alert(`✅ Đã thêm "${productName}" vào giỏ hàng`);
    } catch (err) {
      alert("❌ Cần đăng nhập trước hoặc có lỗi xảy ra");
    }
  };

  if (loading) return <p className="text-center p-6">Đang tải...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
        🚀 Sản phẩm nổi bật
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group"
          >
            <div className="bg-gray-100 aspect-w-1 aspect-h-1 overflow-hidden">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-4 transform group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <span className="text-6xl flex items-center justify-center h-full">
                  📦
                </span>
              )}
            </div>
            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2">
                {product.description}
              </p>
              <div className="text-green-600 font-bold text-lg">
                {Math.floor(product.price)
                  .toLocaleString("vi-VN")
                  .replace(/,/g, ".")}{" "}
                ₫
              </div>
              <div className="flex justify-between mt-2">
                <Link
                  to={`/products/${product.id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg shadow"
                >
                  👁️ Xem
                </Link>
                <button
                  onClick={() => addToCart(product.id, product.name)}
                  className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg shadow"
                >
                  🛒 Thêm
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

