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
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
        Sản phẩm nổi bật
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all overflow-hidden"
          >
            <div className="aspect-w-16 aspect-h-9 bg-gray-100 flex items-center justify-center">
              <span className="text-5xl">📦</span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-gray-600 line-clamp-2 mb-3">
                {product.description}
              </p>
              <div className="text-green-600 font-bold text-xl mb-4">
                {Math.floor(product.price)
                  .toLocaleString("vi-VN")
                  .replace(/,/g, ".")}{" "}
                ₫
              </div>
              <div className="flex gap-2">
                <Link
                  to={`/products/${product.id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-blue-700 text-center"
                >
                  👁️ Xem
                </Link>
                <button
                  onClick={() => addToCart(product.id, product.name)}
                  className="bg-green-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-green-700"
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
