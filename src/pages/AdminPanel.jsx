// src/pages/AdminPanel.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "@/api/axios";
import ProductMedia from "../components/ProductMedia.jsx";
import UploadMultipleMedia from "../components/UploadMultipleMedia.jsx";

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
    <div className="p-3 sm:p-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-xl sm:text-2xl font-bold">🛠️ Quản lý sản phẩm</h1>
        <Link
          to="/admin/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto text-center"
        >
          ➕ Thêm sản phẩm
        </Link>
      </div>

      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-2xl p-3 sm:p-5 shadow-md hover:shadow-lg transition"
            >
              <h2 className="text-lg sm:text-xl font-bold mb-2">{product.name}</h2>
              <p className="text-gray-700 mb-2 text-sm sm:text-base line-clamp-2">{product.description}</p>
              <p className="text-green-600 font-semibold mb-3 text-lg">
                {Math.floor(product.price).toLocaleString('vi-VN').replace(/,/g, '.')} ₫
              </p>

              {/* 👉 Media hiển thị */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-blue-700 mb-1 flex items-center gap-2">
                  📸 Media đã upload:
                </h3>
                <ProductMedia productId={product.id} />
              </div>

              {/* 👉 Upload nhiều ảnh/video */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-purple-700 mb-1 flex items-center gap-2">
                  ⬆️ Upload ảnh hoặc video:
                </h3>
                <UploadMultipleMedia
                  productId={product.id}
                  onUploaded={fetchProducts}
                />
              </div>

              {/* 👉 Các nút quản lý */}
              <div className="flex flex-col sm:flex-row gap-2 mt-4">
                <button
                  onClick={() => handleEdit(product.id)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 flex-1 sm:flex-none"
                >
                  ✏️ Sửa
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex-1 sm:flex-none"
                >
                  🗑️ Xoá
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
