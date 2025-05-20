import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Lỗi khi tải sản phẩm:", err));
  }, []);

  return (
    <div>
      <h1>🏠 Danh sách sản phẩm</h1>
      {products.length === 0 ? (
        <p>Đang tải...</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                width: "200px",
                borderRadius: "8px",
              }}
            >
              <h3>{product.name}</h3>
              <p>Giá: {product.price}¥</p>
              <button
                onClick={() =>
                  API.post("/cart/add", {
                    product_id: product.id,
                    quantity: 1,
                  })
                    .then(() => alert("✅ Đã thêm vào giỏ hàng"))
                    .catch(() => alert("❌ Cần đăng nhập trước"))
                }
              >
                🛒 Thêm vào giỏ
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
