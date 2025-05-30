import { useEffect, useState, useContext } from "react";
import API from "@/api/axios";
import { AuthContext } from "../context/AuthContext";

export default function ProductMedia({ productId }) {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === "admin";

  const fetchMedia = () => {
    setLoading(true);
    API.get(`/api/media/product/${productId}`) // ✅ sửa từ /products/... → /api/media/product/...
      .then((res) => setMedia(res.data.reverse()))
      .catch(() => console.error("Không thể tải media"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMedia();
  }, [productId]);

  const setAsMain = async (id) => {
    setUpdatingId(id);
    const res = await API.patch(`/api/upload/${id}/set-main`); // ✅ sửa từ /products/upload/... → /api/upload/...
    if (res.status === 200) fetchMedia();
    else alert("❌ Lỗi đặt ảnh chính");
    setUpdatingId(null);
  };

  const deleteMedia = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xoá ảnh/video này?")) return;
    const res = await API.delete(`/api/upload/${id}`); // ✅ sửa từ /products/upload/... → /api/upload/...
    if (res.status === 200) fetchMedia();
    else alert("❌ Lỗi xoá media");
  };

  const transformURL = (url, width = 400, height = 400) => {
    return url.replace(
      "/upload/",
      `/upload/w_${width},h_${height},c_fill,f_auto,q_auto/`,
    );
  };

  if (loading)
    return <p className="text-sm text-gray-500 italic">Đang tải media...</p>;
  if (media.length === 0)
    return <p className="text-sm text-gray-400">Chưa có media</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-3">
      {media.map((item) => (
        <div key={item.id} className="relative">
          {item.type === "image" ? (
            <img
              src={transformURL(item.url)}
              alt="product"
              className={`w-full h-40 object-cover border rounded ${
                item.is_main ? "ring-4 ring-blue-500" : ""
              }`}
            />
          ) : (
            <video
              controls
              src={transformURL(item.url, 600, 400)}
              className="w-full h-40 object-cover border rounded"
            />
          )}

          {item.is_main && (
            <div className="absolute top-1 left-1 bg-blue-600 text-white text-xs px-2 py-0.5 rounded shadow">
              Ảnh chính
            </div>
          )}

          <div className="mt-1 space-y-1">
            {isAdmin && !item.is_main && (
              <button
                onClick={() => setAsMain(item.id)}
                disabled={updatingId === item.id}
                className={`w-full text-sm py-1 rounded ${
                  updatingId === item.id
                    ? "bg-gray-300 cursor-wait"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {updatingId === item.id
                  ? "Đang cập nhật..."
                  : "Đặt làm ảnh chính"}
              </button>
            )}
            {isAdmin && (
              <button
                onClick={() => deleteMedia(item.id)}
                className="w-full text-sm bg-red-500 text-white py-1 rounded hover:bg-red-600"
              >
                🗑️ Xoá
              </button>
            )}
            {!isAdmin && (
              <div className="bg-gray-100 rounded p-2 text-center">
                <p className="text-xs text-gray-500">
                  🔒 Chỉ admin mới có thể xóa ảnh
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
