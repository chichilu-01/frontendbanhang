import { useEffect, useState } from "react";

export default function ProductMedia({ productId }) {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://backendbanhang-production.up.railway.app/api/products/${productId}/media`,
    )
      .then((res) => res.json())
      .then((data) => setMedia(data.reverse())) // ảnh mới nhất lên đầu
      .catch(() => console.error("Không thể tải media"))
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading)
    return <p className="text-sm text-gray-500 italic">Đang tải media...</p>;

  if (media.length === 0)
    return <p className="text-sm text-gray-400">Chưa có media</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-3">
      {media.map((item) =>
        item.type === "image" ? (
          <img
            key={item.id}
            src={`https://backendbanhang-production.up.railway.app${item.url}`}
            alt="product"
            className="w-full h-40 object-cover border rounded"
          />
        ) : (
          <video
            key={item.id}
            controls
            className="w-full h-40 object-cover border rounded"
            src={`https://backendbanhang-production.up.railway.app${item.url}`}
          />
        ),
      )}
    </div>
  );
}
