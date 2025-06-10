import React, { useState } from "react";
import { API } from "@services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "@context/AuthContext";

export default function AdminAddProductPage() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    sizes: "",
    colors: "",
    stock: "",
    imageUrl: "",
    gallery: "", // ✅ ảnh phụ
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: form.name,
        price: parseFloat(form.price),
        description: form.description,
        image_url: form.imageUrl,
        sizes: form.sizes ? form.sizes.split(",").map((s) => s.trim()) : [],
        colors: form.colors ? form.colors.split(",").map((c) => c.trim()) : [],
        stock: parseInt(form.stock || "0"),
      };

      // 🛒 Tạo sản phẩm chính trước
      const res = await API.post("/products", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const productId = res.data.id;

      // 🖼️ Gửi ảnh gallery nếu có
      const galleryUrls = form.gallery
        .split(",")
        .map((url) => url.trim())
        .filter((url) => url !== "");

      if (galleryUrls.length > 0) {
        await Promise.all(
          galleryUrls.map((url) =>
            API.post(
              "/media",
              { product_id: productId, url },
              { headers: { Authorization: `Bearer ${token}` } },
            ),
          ),
        );
      }

      toast.success("Đã thêm sản phẩm & ảnh");
      navigate("/admin");
    } catch (err) {
      console.error("❌ Lỗi thêm sản phẩm:", err);
      toast.error("Không thể thêm sản phẩm");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Thêm sản phẩm mới</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Tên sản phẩm"
          value={form.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Giá (VND)"
          value={form.price}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Mô tả"
          value={form.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="sizes"
          placeholder="Sizes (S,M,L)"
          value={form.sizes}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="colors"
          placeholder="Màu sắc (đỏ,xanh)"
          value={form.colors}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="number"
          name="stock"
          placeholder="Số lượng tồn"
          value={form.stock}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="url"
          name="imageUrl"
          placeholder="Link ảnh đại diện"
          value={form.imageUrl}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="gallery"
          placeholder="Các ảnh phụ (URL, ngăn cách bởi dấu phẩy)"
          value={form.gallery}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          ✅ Thêm sản phẩm
        </button>
      </form>
    </div>
  );
}
