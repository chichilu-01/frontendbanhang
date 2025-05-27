import { useEffect, useState } from "react";
import API from "@/api/axios";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Lỗi khi tải sản phẩm:", err))
      .finally(() => setLoading(false));
  }, []);

  const addToCart = async (productId, productName) => {
    try {
      const response = await API.post("/cart/add", {
        product_id: productId,
        quantity: 1,
      });

      if (response.status === 200 || response.status === 201) {
        // Tạo hiệu ứng thông báo
        const notification = document.createElement("div");
        notification.className =
          "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-out";
        notification.textContent = `✅ Đã thêm "${productName}" vào giỏ hàng`;
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

  return (
    <div className="p-3 sm:p-6 max-w-7xl mx-auto">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-8 text-center sm:text-left">🛍️ Danh sách sản phẩm</h1>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="spinner-pro"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-2xl p-3 sm:p-4 shadow-md hover:shadow-lg transition-all duration-300 bg-white hover:transform hover:scale-105"
            >
              <h2 className="text-lg sm:text-xl font-semibold mb-2 line-clamp-2">{product.name}</h2>
              <p className="text-gray-700 mb-2 text-sm sm:text-base line-clamp-3">{product.description}</p>
              <p className="text-green-600 font-bold text-lg sm:text-xl mb-4">
                {Math.floor(product.price).toLocaleString('vi-VN').replace(/,/g, '.')} ₫
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
    </div>
  );
}