// src/pages/AdminPanel.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "@/api/axios";
import ProductMedia from "../components/ProductMedia.jsx";
import UploadMediaInline from "./UploadWithInput.jsx";

export default function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = () => {
    API.get("/products")
      .then((res) => setProducts(res.data))
      .catch(() => alert("❌ Lỗi tải sản phẩm"))
      .finally(() => setLoading(false));
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

  const handleEdit = (id) => {
    navigate(`/admin/edit/${id}`);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">🛠️ Quản lý sản phẩm</h1>
        <Link
          to="/admin/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Thêm sản phẩm
        </Link>
      </div>
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-xl p-4 shadow hover:shadow-md"
            >
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-1">{product.description}</p>
              <p className="text-green-600 font-bold mb-2">
                {product.price.toLocaleString()}₫
              </p>

              {/* Hiển thị media */}
              <ProductMedia productId={product.id} />

              {/* Upload ảnh/video */}
              <UploadMediaInline
                productId={product.id}
                onUploaded={fetchProducts} // gọi lại khi upload xong
              />

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleEdit(product.id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Xoá
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
