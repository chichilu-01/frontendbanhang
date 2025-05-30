import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Checkout() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleOrder = async () => {
    if (!user) {
      alert("⚠️ Vui lòng đăng nhập để đặt hàng");
      return navigate("/login");
    }

    try {
      await API.post("/api/orders"); // 👉 endpoint chuẩn
      alert("✅ Đặt hàng thành công!");
      navigate("/");
    } catch (err) {
      console.error("❌ Lỗi đặt hàng:", err);
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Lỗi khi đặt hàng. Vui lòng thử lại.";
      alert(`❌ ${msg}`);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md mt-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">
        🧾 Xác nhận đặt hàng
      </h1>
      <p className="text-gray-700 mb-6 text-center">
        Bạn có chắc muốn đặt hàng với các sản phẩm trong giỏ không?
      </p>
      <button
        onClick={handleOrder}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
      >
        ✅ Đặt hàng ngay
      </button>
    </div>
  );
}
