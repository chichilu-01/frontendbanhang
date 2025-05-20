import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Cart() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    API.get("/cart")
      .then((res) => setItems(res.data))
      .catch(() => alert("❌ Bạn cần đăng nhập để xem giỏ hàng"));
  }, []);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div>
      <h1>🛒 Giỏ hàng</h1>
      {items.length === 0 ? (
        <p>Không có sản phẩm nào</p>
      ) : (
        <div>
          {items.map((item) => (
            <div key={item.product_id}>
              <strong>{item.name}</strong> - {item.quantity} × {item.price}¥
            </div>
          ))}
          <hr />
          <h3>Tổng cộng: {total}¥</h3>
        </div>
      )}
    </div>
  );
}
