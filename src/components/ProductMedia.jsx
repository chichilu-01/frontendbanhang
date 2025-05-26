import { useEffect, useState } from "react";

export default function ProductMedia({ productId }) {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    fetch(
      `https://backendbanhang-production.up.railway.app/api/products/${productId}/media`,
    )
      .then((res) => res.json())
      .then((data) => setMedia(data))
      .catch(() => console.error("Không thể tải media"));
  }, [productId]);

  if (media.length === 0)
    return <p className="text-sm text-gray-400">Chưa có media</p>;

  return (
    <div className="grid grid-cols-2 gap-2 mt-2">
      {media.map((item, index) =>
        item.type === "image" ? (
          <img
            key={index}
            src={`https://backendbanhang-production.up.railway.app${item.url}`}
            alt="product"
            className="w-full h-auto border rounded"
          />
        ) : (
          <video
            key={index}
            controls
            className="w-full h-auto border rounded"
            src={`https://backendbanhang-production.up.railway.app${item.url}`}
          />
        ),
      )}
    </div>
  );
}
