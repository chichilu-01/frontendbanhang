import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      alert("⚠️ Bạn cần đăng nhập để xem giỏ hàng");
      navigate("/login");
      return;
    }

    const fetchCart = async () => {
      try {
        const res = await API.get("/api/cart");
        setItems(res.data);
      } catch (err) {
        console.error("❌ Không lấy được giỏ hàng:", err);
        alert("❌ Lỗi tải giỏ hàng. Vui lòng đăng nhập lại.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user, navigate]);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (loading) return <p className="text-center mt-10">Đang tải giỏ hàng...</p>;

  return (
    <div className="p-3 sm:p-6 max-w-4xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center sm:text-left">
        🛒 Giỏ hàng của bạn
      </h1>

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-lg sm:text-xl text-gray-600 mb-4">
            Không có sản phẩm nào trong giỏ hàng
          </p>
          <a
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Tiếp tục mua sắm
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.product_id}
              className="bg-white rounded-2xl shadow-md p-4 sm:p-6"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Số lượng:{" "}
                    <span className="font-medium">{item.quantity}</span>
                  </p>
                  <p className="text-green-600 font-semibold text-lg">
                    {item.price.toLocaleString("vi-VN")} ₫
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Thành tiền:</p>
                  <p className="font-bold text-lg text-blue-600">
                    {(item.price * item.quantity).toLocaleString("vi-VN")} ₫
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                Tổng cộng:
              </h3>
              <p className="text-2xl sm:text-3xl font-bold text-green-600">
                {total.toLocaleString("vi-VN")} ₫
              </p>
            </div>
            <button
              className="w-full mt-4 bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 text-lg sm:text-lg rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 font-bold shadow-lg min-h-[56px]"
              onClick={() => alert("💳 Tính năng thanh toán đang phát triển!")}
            >
              💳 Thanh toán
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
