import { useEffect, useState } from "react";
import API from "@/api/axios";

export default function MediaList({ productId, refreshTrigger }) {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadMedia = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/products/${productId}/media`);
      setMediaList(res.data.reverse()); // mới nhất lên trước
    } catch (err) {
      alert("Lỗi tải media");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xoá?")) return;
    try {
      await API.delete(`/upload/${id}`);
      loadMedia(); // reload sau khi xoá
    } catch {
      alert("Không xoá được media");
    }
  };

  useEffect(() => {
    loadMedia();
  }, [productId, refreshTrigger]);

  if (loading) return <p>Đang tải media...</p>;
  if (mediaList.length === 0)
    return <p className="text-sm text-gray-500">Chưa có media</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {mediaList.map((media) => (
        <div key={media.id} className="relative border rounded p-1 group">
          {media.type === "image" ? (
            <img
              src={media.url}
              alt=""
              className="w-full h-40 object-cover rounded"
            />
          ) : (
            <video
              src={media.url}
              controls
              className="w-full h-40 object-cover rounded"
            />
          )}
          <button
            onClick={() => handleDelete(media.id)}
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs opacity-80 hover:opacity-100"
          >
            ❌
          </button>
        </div>
      ))}
    </div>
  );
}
