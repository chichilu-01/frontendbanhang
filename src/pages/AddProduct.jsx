import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "@/api/axios";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import { useToast } from "@/context/ToastContext";
import UploadMultipleMedia from "../components/UploadMultipleMedia";

export default function AddProduct() {
  const [form, setForm] = useState({ name: "", price: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [newProductId, setNewProductId] = useState(null);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { showToast } = useToast();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      showToast("⚠️ Bạn không có quyền truy cập", "error");
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/api/products", form);
      const newId = res.data.id;
      setNewProductId(newId);
      showToast("✅ Đã thêm sản phẩm mới! Bây giờ hãy upload media");
    } catch (err) {
      console.error("❌ Lỗi khi thêm sản phẩm:", err.response?.data || err);
      showToast(
        err.response?.data?.error ||
          "❌ Không đủ quyền hoặc lỗi dữ liệu. Xem console để biết thêm.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl animate-fade-in">
      <h1 className="text-xl font-bold mb-4">➕ Thêm sản phẩm mới</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Tên sản phẩm"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <input
          name="price"
          type="number"
          placeholder="Giá"
          value={form.price}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <textarea
          name="description"
          placeholder="Mô tả"
          value={form.description}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 resize-none"
          rows={4}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          {loading ? "Đang lưu..." : "Lưu sản phẩm"}
        </button>
      </form>

      {newProductId && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">
            📁 Tải lên ảnh hoặc video cho sản phẩm
          </h2>
          <UploadMultipleMedia product_id={newProductId} />
        </div>
      )}
    </div>
  );
}