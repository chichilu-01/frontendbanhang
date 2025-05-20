import { useEffect, useState } from "react";
import API from "../api/axios";

export default function AdminPanel() {
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    API.get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => alert("❌ Lỗi tải sản phẩm"));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Bạn có chắc muốn xoá?")) return;
    API.delete(`/admin/products/${id}`)
      .then(() => {
        alert("✅ Đã xoá");
        fetchProducts();
      })
      .catch(() => alert("❌ Không đủ quyền hoặc lỗi"));
  };

  return (
    <div>
      <h1>⚙️ Quản lý sản phẩm (Admin)</h1>
      {products.map((p) => (
        <div key={p.id} style={{ borderBottom: "1px solid #ccc" }}>
          <strong>{p.name}</strong> - {p.price}¥
          <button onClick={() => handleDelete(p.id)} style={{ marginLeft: 10 }}>
            ❌ Xoá
          </button>
        </div>
      ))}
    </div>
  );
}
