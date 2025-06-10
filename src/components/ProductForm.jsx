import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@context/AuthContext";

export default function ProductForm({ product, onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    gallery: [],
    image_url: "",
  });

  const { user, token } = useAuth();
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    let gallery = [];
    try {
      if (Array.isArray(product?.images)) {
        gallery = product.images;
      }
    } catch (err) {
      console.warn("❌ Lỗi parse ảnh:", err);
    }

    setForm({
      name: product?.name || "",
      price: product?.price || "",
      description: product?.description || "",
      gallery,
      image_url: product?.image_url || gallery[0] || "",
    });
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploading(true);
    const uploadedUrls = [];

    for (let file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("product_id", product?.id);

      try {
        const res = await axios.post("/api/media/upload-file", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        uploadedUrls.push(res.data.url);
      } catch (err) {
        console.error("❌ Upload lỗi:", err);
      }
    }

    setForm((prev) => ({
      ...prev,
      gallery: [...prev.gallery, ...uploadedUrls],
      image_url: prev.image_url || uploadedUrls[0],
    }));
    setUploading(false);
  };

  const handleDeleteImage = (img) => {
    setForm((prev) => {
      const newGallery = prev.gallery.filter((i) => i !== img);
      const newMain =
        prev.image_url === img ? newGallery[0] || "" : prev.image_url;
      return { ...prev, gallery: newGallery, image_url: newMain };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || parseFloat(form.price) <= 0) {
      return alert("Tên hoặc giá không hợp lệ");
    }

    onSave({
      name: form.name,
      price: parseFloat(form.price),
      description: form.description,
      image_url: form.image_url,
      gallery: form.gallery,
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

        {user?.is_admin && (
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="w-full mt-1"
          />
        )}

        <div className="grid grid-cols-3 gap-2 mt-3">
          {Array.isArray(form.gallery) &&
            form.gallery.map((img) => (
              <div className="relative" key={img}>
                <img
                  src={img}
                  alt="Ảnh"
                  onClick={() =>
                    setForm((prev) => ({ ...prev, image_url: img }))
                  }
                  className={`h-24 w-full object-cover border rounded cursor-pointer ${
                    form.image_url === img ? "ring-4 ring-blue-500" : ""
                  }`}
                />
                {user?.is_admin && (
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
