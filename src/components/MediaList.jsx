import { useEffect, useState, useContext } from "react";
import API from "@/api/axios";
import { AuthContext } from "@/context/AuthContext";

export default function MediaList({ productId, refreshTrigger }) {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === "admin";

  // ✅ Load media từ API mới (/api/media/product/:id)
  const loadMedia = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/api/media/product/${productId}`);
      setMediaList(res.data.reverse()); // mới nhất lên trước
    } catch (err) {
      console.error(err);
      alert("Lỗi tải media");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Xoá media qua API mới (/api/upload/:id)
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xoá?")) return;
    try {
      await API.delete(`/api/upload/${id}`);
      loadMedia(); // reload sau khi xoá
    } catch (err) {
      console.error(err);
      alert("Không xoá được media");
    }
  };

  useEffect(() => {
    loadMedia();
  }, [productId, refreshTrigger]);

  // ✅ Transform Cloudinary URL cho ảnh/video
  const transformURL = (url, width = 400, height = 400) => {
    return url.replace(
      "/upload/",
      `/upload/w_${width},h_${height},c_fill,f_auto,q_auto/`,
    );
  };

  if (loading) return <p>Đang tải media...</p>;

  if (mediaList.length === 0) {
    return <p className="text-sm text-gray-500">Chưa có media</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {mediaList.map((media) => (
        <div key={media.id} className="relative border rounded p-1 group">
          {media.type === "image" ? (
            <img
              src={transformURL(media.url)}
              alt=""
              className="w-full h-40 object-cover rounded"
            />
          ) : (
            <video
              src={transformURL(media.url, 600, 400)}
              controls
              className="w-full h-40 object-cover rounded"
            />
          )}
          {isAdmin && (
            <button
              onClick={() => handleDelete(media.id)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs opacity-80 hover:opacity-100"
            >
              ❌
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
