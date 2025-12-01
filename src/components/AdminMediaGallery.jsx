import React, { useState } from "react";
import toast from "react-hot-toast";
import { uploadFileToCloudinary, deleteProductImage } from "@services/api";
import { useAuth } from "@context/AuthContext";

export default function AdminMediaGallery({
  productId,
  images = [],
  onRefresh,
}) {
  const { token, user } = useAuth();
  const [uploading, setUploading] = useState(false);

  // ✅ Check đúng quyền admin (is_admin chứ không phải role)
  if (!user || !user.is_admin) return null;

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("product_id", productId);

    try {
      setUploading(true);

      // ✅ Dùng hàm API đã cấu hình
      await uploadFileToCloudinary(formData, token);

      toast.success("✅ Đã tải lên ảnh mới");
      onRefresh && onRefresh();
    } catch (err) {
      console.error("Upload lỗi:", err);
      toast.error("❌ Lỗi upload ảnh");
    } finally {
      setUploading(false);
      // reset input để chọn lại file giống tên vẫn được
      e.target.value = "";
    }
  };

  const handleDelete = async (mediaId) => {
    if (!confirm("Bạn có chắc muốn xoá ảnh này?")) return;

    try {
      // ✅ Dùng đúng route xóa media theo product
      await deleteProductImage(mediaId, token);

      toast.success("🗑️ Đã xoá ảnh");
      onRefresh && onRefresh();
    } catch (err) {
      console.error("Xoá ảnh lỗi:", err);
      toast.error("❌ Lỗi xoá ảnh");
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
              className="rounded shadow w-full max-w-[120px] h-auto aspect-square object-contain"
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
