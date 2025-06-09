import React, { useState } from "react";
import toast from "react-hot-toast";
import { API } from "@services/api";
import { useAuth } from "@context/AuthContext";

export default function AdminMediaGallery({
  productId,
  images = [],
  onRefresh,
}) {
  const { token, user } = useAuth();
  const [uploading, setUploading] = useState(false);

  if (!user || user.role !== "admin") return null;

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("product_id", productId);

    try {
      setUploading(true);
      const res = await API.post(`/media/upload-file`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("✅ Đã tải lên ảnh mới");
      onRefresh();
    } catch (err) {
      toast.error("❌ Lỗi upload ảnh");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (mediaId) => {
    if (!confirm("Bạn có chắc muốn xoá ảnh này?")) return;

    try {
      await API.delete(`/media/${mediaId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("🗑️ Đã xoá ảnh");
      onRefresh();
    } catch (err) {
      toast.error("❌ Lỗi xoá ảnh");
      console.error(err);
    }
  };

  return (
    <div className="border p-4 rounded mt-10">
      <h4 className="text-lg font-bold mb-4">📸 Quản lý ảnh sản phẩm</h4>

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
        className="mb-4"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="relative group">
            <img
              src={img.url}
              alt="product"
              className="rounded shadow w-full h-32 object-cover"
            />
            <button
              onClick={() => handleDelete(img.id)}
              className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100"
            >
              Xoá
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
