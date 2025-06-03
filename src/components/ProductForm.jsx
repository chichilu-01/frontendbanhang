// === File: /src/components/ProductForm.jsx ===
//Chứa logic form & upload ảnh
import React, { useState, useEffect } from "react";
import useImageUpload from "../hooks/useImageUpload";
import { useAuth } from "@context/AuthContext"; // ✅ để kiểm tra role admin

export default function ProductForm({ product, onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    images: [],
    mainImage: "",
  });

  const { user } = useAuth();
  const { uploading, uploadMultipleImages } = useImageUpload();

  useEffect(() => {
    setForm({
      name: product?.name || "",
      price: product?.price || "",
      description: product?.description || "",
      images: product?.images || [],
      mainImage: product?.image || "",
    });
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const uploadedUrls = await uploadMultipleImages(files);
    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...uploadedUrls],
      mainImage: prev.mainImage || uploadedUrls[0],
    }));
  };

  const handleDeleteImage = (img) => {
    setForm((prev) => {
      const newImages = prev.images.filter((i) => i !== img);
      const newMain =
        prev.mainImage === img ? newImages[0] || "" : prev.mainImage;
      return { ...prev, images: newImages, mainImage: newMain };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || form.price <= 0) return alert("Thông tin không hợp lệ");
    onSave({
      ...form,
      image: form.mainImage, // giữ tương thích backend
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Tên sản phẩm</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Giá</label>
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
          min="0"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Mô tả</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          rows="3"
        ></textarea>
      </div>

      {/* ẢNH SẢN PHẨM */}
      <div>
        <label className="block text-sm font-medium">Ảnh sản phẩm</label>

        {/* Chỉ admin mới được upload ảnh */}
        {user?.role === "admin" && (
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="w-full mt-1"
          />
        )}

        {/* Hiển thị ảnh */}
        <div className="grid grid-cols-3 gap-2 mt-3">
          {form.images.map((img) => (
            <div className="relative" key={img}>
              <img
                src={img}
                alt="Ảnh"
                onClick={() => setForm((prev) => ({ ...prev, mainImage: img }))}
                className={`h-24 w-full object-cover border rounded cursor-pointer ${
                  form.mainImage === img ? "ring-4 ring-blue-500" : ""
                }`}
              />
              {user?.role === "admin" && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteImage(img);
                  }}
                  className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        {uploading && (
          <p className="text-sm text-gray-500 mt-1">Đang tải ảnh...</p>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border rounded"
        >
          Huỷ
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
          disabled={uploading}
        >
          {uploading ? "Đang lưu..." : "Lưu"}
        </button>
      </div>
    </form>
  );
}
