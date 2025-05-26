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
        <div className="grid grid-cols-1 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-2xl p-5 shadow-md hover:shadow-lg transition"
            >
              <h2 className="text-xl font-bold mb-1">{product.name}</h2>
              <p className="text-gray-700 mb-1">{product.description}</p>
              <p className="text-green-600 font-semibold mb-3">
                {product.price.toLocaleString()}₫
              </p>

              {/* 👉 Media hiển thị */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Media đã upload:
                </h3>
                <ProductMedia productId={product.id} />
              </div>

              {/* 👉 Upload nhiều ảnh/video */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Upload ảnh hoặc video:
                </h3>
                <UploadMultipleMedia
                  productId={product.id}
                  onUploaded={fetchProducts}
                />
              </div>

              {/* 👉 Các nút quản lý */}
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(product.id)}
                  className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                >
                  ✏️ Sửa
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
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
