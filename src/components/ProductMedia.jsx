import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MediaList from "../components/MediaList";
import ProductMedia from "../components/ProductMedia";
import UploadMultipleMedia from "../components/UploadMultipleMedia";
import { AuthContext } from "../context/AuthContext"; // Nếu có phân quyền

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshMedia, setRefreshMedia] = useState(0);

  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    axios
      .get(
        `https://de2b0412-6002-4dc6-a768-b1b88140a428-00-2m5ffvxgjg8v.pike.replit.dev/products/${id}`,
      )
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const triggerReload = () => setRefreshMedia((prev) => prev + 1);

  if (loading) return <p className="p-6">Đang tải...</p>;
  if (!product)
    return <p className="p-6 text-red-500">Không tìm thấy sản phẩm.</p>;

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

      {/* 👉 Chỉ admin được upload và xoá media */}
      {isAdmin && (
        <>
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">📤 Upload ảnh/video</h2>
            <UploadMultipleMedia productId={id} onUploaded={triggerReload} />
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">🗂️ Media đã upload</h2>
            <MediaList productId={id} refreshTrigger={refreshMedia} />
          </div>
        </>
      )}

      {/* 👉 Gallery công khai */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">🖼️ Gallery sản phẩm</h2>
        <ProductMedia productId={id} />
      </div>
    </div>
  );
}
