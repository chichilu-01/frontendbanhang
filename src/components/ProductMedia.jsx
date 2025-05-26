import { useEffect, useState } from "react";

export default function ProductMedia({ productId }) {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null); // ID ảnh đang xử lý

  const fetchMedia = () => {
    setLoading(true);
    fetch(
      `https://backendbanhang-production.up.railway.app/api/products/${productId}/media`,
    )
      .then((res) => res.json())
      .then((data) => setMedia(data.reverse()))
      .catch(() => console.error("Không thể tải media"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMedia();
  }, [productId]);

  const setAsMain = async (id) => {
    setUpdatingId(id);
    const res = await fetch(
      `https://backendbanhang-production.up.railway.app/api/upload/${id}/set-main`,
      { method: "PATCH" },
    );
    if (res.ok) {
      fetchMedia();
    } else {
      alert("❌ Lỗi đặt ảnh chính");
    }
    setUpdatingId(null);
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
            {!item.is_main && (
              <button
                onClick={() => setAsMain(item.id)}
                disabled={updatingId === item.id}
                className={`mt-1 w-full text-sm py-1 rounded ${
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
          </div>
        ) : (
          <video
            key={item.id}
            controls
            className="w-full h-40 object-cover border rounded"
            src={item.url}
          />
        ),
      )}
    </div>
  );
}
