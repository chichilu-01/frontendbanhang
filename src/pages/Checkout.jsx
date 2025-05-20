import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();

  const handleOrder = () => {
    API.post("/orders")
      .then(() => {
        alert("✅ Đặt hàng thành công!");
        navigate("/");
      })
      .catch(() => alert("❌ Bạn cần đăng nhập hoặc giỏ hàng trống"));
  };

  return (
    <div>
      <h1>🧾 Xác nhận đặt hàng</h1>
      <p>Bạn có chắc muốn đặt hàng với các sản phẩm trong giỏ?</p>
      <button onClick={handleOrder}>✅ Đặt hàng ngay</button>
    </div>
  );
}
