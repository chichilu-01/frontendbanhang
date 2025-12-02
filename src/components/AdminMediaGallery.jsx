import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  uploadFileToCloudinary,
  deleteProductImage,
  setMainImage,
  reorderMedia,
} from "@services/api";
import { useAuth } from "@context/AuthContext";

export default function AdminMediaGallery({
  productId,
  images = [],
  onRefresh,
}) {
  const { token, user } = useAuth();
  const [uploading, setUploading] = useState(false);

  // local state để drag & drop
  const [localImages, setLocalImages] = useState([]);
  const [draggingId, setDraggingId] = useState(null);
  const [savingOrder, setSavingOrder] = useState(false);

  // ✅ Chỉ admin mới thấy
  if (!user || !user.is_admin) return null;

  useEffect(() => {
    setLocalImages(images);
  }, [images]);

  // ================== MULTI UPLOAD ==================
  const handleUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setUploading(true);

    try {
      let uploadedCount = 0;

      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("product_id", productId);

        try {
          await uploadFileToCloudinary(formData, token);
          uploadedCount++;
        } catch (err) {
          console.error("Upload lỗi:", err);
          toast.error(`❌ Lỗi upload: ${file.name}`);
        }
      }

      if (uploadedCount > 0) {
        toast.success(`✅ Đã upload ${uploadedCount} ảnh`);
        onRefresh && onRefresh();
      }
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  // ================== DELETE ==================
  const handleDelete = async (mediaId) => {
    if (!confirm("Bạn có chắc muốn xoá ảnh này?")) return;

    try {
      await deleteProductImage(mediaId, token);
      toast.success("🗑️ Đã xoá ảnh");

      // backend tự chọn ảnh chính mới nếu cần
      onRefresh && onRefresh();
    } catch (err) {
      console.error("Xoá ảnh lỗi:", err);
      toast.error("❌ Lỗi xoá ảnh");
    }
  };

  // ================== SET MAIN ==================
  const handleSetMain = async (mediaId) => {
    try {
      await setMainImage(mediaId, token);
      toast.success("⭐ Đã đặt làm ảnh chính");
      onRefresh && onRefresh();
    } catch (err) {
      console.error("Lỗi đặt ảnh chính:", err);
      toast.error("❌ Không thể đặt ảnh chính");
    }
  };

  // ================== DRAG & DROP ==================
  const onDragStart = (id) => {
    setDraggingId(id);
  };

  const onDragOver = (e, overId) => {
    e.preventDefault();
    if (!draggingId || draggingId === overId) return;

    setLocalImages((prev) => {
      const currentIndex = prev.findIndex((img) => img.id === draggingId);
      const overIndex = prev.findIndex((img) => img.id === overId);
      if (currentIndex === -1 || overIndex === -1) return prev.slice();

      const newArr = prev.slice();
      const [moved] = newArr.splice(currentIndex, 1);
      newArr.splice(overIndex, 0, moved);
      return newArr;
    });
  };

  const onDragEnd = () => {
    setDraggingId(null);
  };

  const handleSaveOrder = async () => {
    try {
      setSavingOrder(true);
      const ids = localImages.map((img) => img.id);
      await reorderMedia(productId, ids, token);
      toast.success("✅ Đã lưu thứ tự ảnh");
      onRefresh && onRefresh();
    } catch (err) {
      console.error("Lỗi lưu thứ tự:", err);
      toast.error("❌ Không thể lưu thứ tự ảnh");
    } finally {
      setSavingOrder(false);
    }
  };

  return (
    <div className="border p-4 rounded mt-10 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-bold">📸 Quản lý ảnh sản phẩm</h4>

        <div className="flex items-center gap-3">
          <label className="inline-flex items-center gap-2 text-sm cursor-pointer">
            <span className="px-3 py-1 bg-indigo-600 text-white rounded">
              + Thêm ảnh
            </span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>

          <button
            onClick={handleSaveOrder}
            disabled={savingOrder || localImages.length === 0}
            className="px-3 py-1 bg-emerald-600 text-white rounded text-sm disabled:opacity-50"
          >
            {savingOrder ? "Đang lưu..." : "💾 Lưu thứ tự"}
          </button>
        </div>
      </div>

      {uploading && (
        <p className="text-sm text-gray-500 mb-3">⏳ Đang upload ảnh...</p>
      )}

      {localImages.length === 0 ? (
        <p className="text-gray-500 text-sm">Chưa có ảnh nào.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {localImages.map((img) => (
            <div
              key={img.id}
              draggable
              onDragStart={() => onDragStart(img.id)}
              onDragOver={(e) => onDragOver(e, img.id)}
              onDragEnd={onDragEnd}
              className="relative group border rounded-lg p-1 bg-gray-50 cursor-move"
              title="Kéo để sắp xếp"
            >
              {/* Thumbnail (hoặc url) */}
              <img
                src={img.thumb_url || img.url}
                alt="product"
                className={`rounded w-full h-auto aspect-square object-contain ${
                  img.is_main ? "ring-2 ring-emerald-500" : ""
                }`}
              />

              {/* Badge MAIN */}
              {img.is_main && (
                <span className="absolute top-1 left-1 bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-full shadow">
                  ⭐ Ảnh chính
                </span>
              )}

              {/* Nút XOÁ */}
              <button
                onClick={() => handleDelete(img.id)}
                type="button"
                className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100"
              >
                ✕
              </button>

              {/* Nút Đặt làm ảnh chính */}
              {!img.is_main && (
                <button
                  type="button"
                  onClick={() => handleSetMain(img.id)}
                  className="mt-1 w-full text-[11px] py-1 bg-white border border-emerald-500 text-emerald-600 rounded hover:bg-emerald-50"
                >
                  Đặt làm ảnh chính
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
