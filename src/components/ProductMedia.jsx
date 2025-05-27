import { useEffect, useState } from "react";
import API from "@/api/axios";

export default function ProductMedia({ productId }) {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/products/${productId}/media`);
      setMedia(res.data.reverse());
    } catch (err) {
      console.error("Không thể tải media");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [productId]);

  const setAsMain = async (id) => {
    try {
      setUpdatingId(id);
      await API.patch(`/products/upload/${id}/set-main`);
      fetchMedia();
    } catch (err) {
      alert("❌ Lỗi đặt ảnh chính");
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteMedia = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xoá ảnh/video này?")) return;
    try {
      await API.delete(`/products/upload/${id}`);
      fetchMedia();
    } catch (err) {
      alert("❌ Lỗi xoá media");
    }
  };

  if (loading)
    return <p className="text-sm text-gray-500 italic">Đang tải media...</p>;

  if (media.length === 0)
    return <p className="text-sm text-gray-400">Chưa có media</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-3">
      {media.map((item) =>
        item.type === "image" ? (
          <div key={item.id} className="relative">
            <img
              src={item.url}
              alt="product"
              className={`w-full h-40 object-cover border rounded ${
                item.is_main ? "ring-4 ring-blue-500" : ""
              }`}
            />
            {item.is_main && (
              <div className="absolute top-1 left-1 bg-blue-600 text-white text-xs px-2 py-0.5 rounded shadow">
                Ảnh chính
              </div>
            )}
            <div className="mt-1 space-y-1">
              {!item.is_main && (
                <button
                  onClick={() => setAsMain(item.id)}
                  disabled={updatingId === item.id}
                  className={`w-full text-sm py-1 rounded ${
                    updatingId === item.id
                      ? "bg-gray-300 cursor-wait"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {updatingId === item.id
                    ? "Đang cập nhật..."
                    : "Đặt làm ảnh chính"}
                </button>
              )}
              <button
                onClick={() => deleteMedia(item.id)}
                className="w-full text-sm text-red-600 hover:underline"
              >
                Xoá
              </button>
            </div>
          </div>
        ) : (
          <div key={item.id} className="relative">
            <video
              controls
              className="w-full h-40 object-cover border rounded"
              src={item.url}
            />
            <button
              onClick={() => deleteMedia(item.id)}
              className="w-full mt-1 text-sm text-red-600 hover:underline"
            >
              Xoá
            </button>
          </div>
        ),
      )}
    </div>
  );
}
