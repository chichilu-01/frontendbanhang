// src/pages/ProductDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://de2b0412-6002-4dc6-a768-b1b88140a428-00-2m5ffvxgjg8v.pike.replit.dev/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-6">Đang tải...</p>;
  if (!product) return <p className="p-6 text-red-500">Không tìm thấy sản phẩm.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="border rounded-2xl p-6 shadow-md">
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover rounded-xl mb-6"
          />
        )}
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-green-600 font-bold text-xl mb-4">
          {product.price.toLocaleString()}₫
        </p>
        <button className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700">
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
}
