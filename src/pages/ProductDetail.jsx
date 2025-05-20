import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => alert("Không tìm thấy sản phẩm"));
  }, [id]);

  if (!product) return <p>Đang tải...</p>;

  return (
    <div>
      <h1>📦 Chi tiết sản phẩm</h1>
      <h2>{product.name}</h2>
      <p>
        <strong>Giá:</strong> {product.price}¥
      </p>
      <p>
        <strong>Mô tả:</strong> {product.description || "Không có"}
      </p>
    </div>
  );
}
