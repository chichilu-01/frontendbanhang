// src/pages/MyOrders.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://backendbanhang-production.up.railway.app/api/orders/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("❌ Lỗi khi tải đơn hàng:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Đang tải đơn hàng...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📦 Đơn hàng của bạn</h1>
      {orders.length === 0 ? (
        <p>Chưa có đơn hàng nào.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="border rounded-xl p-4">
              <p>
                <strong>Mã đơn:</strong> {order.id}
              </p>
              <p>
                <strong>Ngày:</strong>{" "}
                {new Date(order.created_at).toLocaleDateString("vi-VN")}
              </p>
              <p>
                <strong>Trạng thái:</strong> {order.status}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
