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
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🛒 Giỏ hàng</h1>
      {items.length === 0 ? (
        <p>Không có sản phẩm nào</p>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.product_id} className="flex justify-between">
              <span>
                <strong>{item.name}</strong> - {item.quantity} ×{" "}
                {Math.floor(item.price).toLocaleString('vi-VN').replace(/,/g, '.')} ₫
              </span>
            </div>
          ))}
          <hr className="my-4" />
          <h3 className="text-lg font-semibold">
            Tổng cộng:{" "}
            {Math.floor(total).toLocaleString('vi-VN').replace(/,/g, '.')} ₫
          </h3>
        </div>
      )}
    </div>
  );
}
