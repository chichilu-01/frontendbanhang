import React, { useState, useEffect } from "react";
import { useAuth } from "@context/AuthContext";
import { uploadFileToCloudinary, deleteProductImage } from "@services/api";

export default function ProductForm({ product, onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    stock: 0, // ⭐ THÊM TỒN KHO
    gallery: [],
    image_url: "",
    colors: "", // ⭐ thêm
    sizes: "",
  });

  const { user, token } = useAuth();
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    let gallery = [];
    if (Array.isArray(product?.media)) {
      gallery = product.media.map((m) => m.url);
    }

    setForm({
      name: product?.name || "",
      price: product?.price || "",
      description: product?.description || "",
      stock: product?.stock || 0, // ⭐ LOAD TỒN KHO
      gallery,
      image_url: product?.image_url || gallery[0] || "",
      colors: product?.colors
        ? Array.isArray(product.colors)
          ? product.colors.join(", ")
          : product.colors.replace(/[\[\]"]/g, "")
        : "",

      sizes: product?.sizes
        ? Array.isArray(product.sizes)
          ? product.sizes.join(", ")
          : product.sizes.replace(/[\[\]"]/g, "")
        : "",
    });
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ⭐ UPLOAD ẢNH SANG CLOUDINARY
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
        const res = await uploadFileToCloudinary(formData, token);
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
    e.target.value = "";
  };

  const handleDeleteImage = async (img) => {
    try {
      const mediaObj = product?.media?.find((m) => m.url === img);
      if (mediaObj) {
        await deleteProductImage(mediaObj.id, token);
      }
    } catch (err) {
      console.error("Xóa ảnh lỗi", err);
    }

    setForm((prev) => {
      const gallery = prev.gallery.filter((i) => i !== img);
      const newMain =
        prev.image_url === img ? gallery[0] || "" : prev.image_url;

      return { ...prev, gallery, image_url: newMain };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || parseFloat(form.price) <= 0) {
      return alert("Tên hoặc giá không hợp lệ");
    }

    onSave({
      id: product?.id,
      name: form.name,
      price: Number(form.price),
      description: form.description,
      stock: parseInt(form.stock), // ⭐ TRẢ STOCK VỀ HOOK
      image_url: form.image_url,
      gallery: form.gallery,
      colors: form.colors ? form.colors.split(",").map((c) => c.trim()) : [],

      sizes: form.sizes ? form.sizes.split(",").map((s) => s.trim()) : [],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Tên */}
      <div>
        <label className="block text-sm font-semibold">Tên sản phẩm</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      {/* Giá */}
      <div>
        <label className="block text-sm font-semibold">Giá</label>
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      {/* ⭐ TỒN KHO */}
      <div>
        <label className="block text-sm font-semibold">Tồn kho</label>
        <input
          name="stock"
          type="number"
          min="0"
          value={form.stock}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      {/* Mô tả */}
      <div>
        <label className="block text-sm font-semibold">Mô tả</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="3"
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      {/* Colors */}
      <div>
        <label className="block text-sm font-semibold">
          Màu sắc (phân cách bằng dấu phẩy)
        </label>
        <input
          name="colors"
          value={form.colors}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="Ví dụ: đen, trắng, xám"
        />
      </div>

      {/* Sizes */}
      <div>
        <label className="block text-sm font-semibold">
          Size (phân cách bằng dấu phẩy)
        </label>
        <input
          name="sizes"
          value={form.sizes}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="Ví dụ: L, XL, XXL"
        />
      </div>

      {/* Ảnh */}
      <div>
        <label className="block text-sm font-semibold">Ảnh sản phẩm</label>

        <label
          htmlFor="fileUpload"
          className="inline-flex items-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-600 cursor-pointer"
        >
          <span>📤</span> <span>Chọn ảnh</span>
        </label>

        <input
          id="fileUpload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="grid grid-cols-3 gap-2 mt-3">
          {form.gallery.map((img) => (
            <div className="relative" key={img}>
              <img
                src={img}
                className={`h-24 w-full object-cover border rounded cursor-pointer ${
                  form.image_url === img ? "ring-4 ring-blue-500" : ""
                }`}
                onClick={() => setForm((prev) => ({ ...prev, image_url: img }))}
              />
              <button
                type="button"
                onClick={() => handleDeleteImage(img)}
                className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {uploading && (
          <p className="text-sm text-gray-500 mt-1">Đang tải ảnh...</p>
        )}
      </div>

      {/* Buttons */}
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
