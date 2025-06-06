// 📁 frontend/features/admin/ProductMediaList.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@context/AuthContext";

export default function ProductMediaList() {
  const { id } = useParams(); // product_id
  const { token, user } = useAuth();
  const [media, setMedia] = useState([]);

  const fetchMedia = async () => {
    try {
      const res = await axios.get(`/api/media/product/${id}`);
      setMedia(res.data);
    } catch {
      toast.error("Lỗi tải media");
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [id]);

  const deleteMedia = async (mediaId) => {
    if (!confirm("Xoá ảnh này?")) return;
    try {
      await axios.delete(`/api/media/${mediaId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Đã xoá");
      fetchMedia();
    } catch {
      toast.error("Xoá thất bại");
    }
  };

  const setMain = async (mediaId) => {
    try {
      await axios.patch(
        `/api/media/${mediaId}/set-main`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      toast.success("Đã đặt ảnh chính");
      fetchMedia();
    } catch {
      toast.error("Lỗi đặt ảnh chính");
    }
  };

  if (!user?.is_admin)
    return <div className="p-4">⛔ Không có quyền truy cập</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-xl font-bold mb-4">
        📸 Danh sách ảnh sản phẩm #{id}
      </h2>
      {media.length === 0 ? (
        <p className="text-gray-500">Chưa có ảnh nào</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {media.map((item) => (
            <div
              key={item.id}
              className="relative group border rounded overflow-hidden"
            >
              <img
                src={item.url}
                alt="media"
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex flex-col justify-end p-2 space-y-1">
                <button
                  onClick={() => deleteMedia(item.id)}
                  className="text-white bg-red-600 px-2 py-1 text-sm rounded"
                >
                  Xoá
                </button>
                {!item.is_main && (
                  <button
                    onClick={() => setMain(item.id)}
                    className="text-white bg-yellow-500 px-2 py-1 text-sm rounded"
                  >
                    Đặt làm chính
                  </button>
                )}
                {item.is_main && (
                  <span className="text-green-300 text-xs">Ảnh chính</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
