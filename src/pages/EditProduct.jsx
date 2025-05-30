import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", description: "", price: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Tải dữ liệu sản phẩm
  useEffect(() => {
    API.get(`/api/products/${id}`)
      .then((res) => setForm(res.data))
      .catch((err) => {
        console.error("❌ Lỗi tải sản phẩm:", err);
        alert("❌ Không tìm thấy sản phẩm");
        navigate("/admin");
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await API.put(`/api/admin/products/${id}`, form);
      alert("✅ Cập nhật thành công");
      navigate("/admin");
    } catch (err) {
      console.error("❌ Lỗi cập nhật:", err);
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Không đủ quyền hoặc lỗi dữ liệu";
      alert(`❌ ${msg}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return <p className="p-6 text-gray-600 italic">Đang tải sản phẩm...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">✏️ Chỉnh sửa sản phẩm</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow-md"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Tên sản phẩm</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Tên sản phẩm"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Mô tả</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Mô tả sản phẩm"
            rows={4}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Giá (₫)</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Giá sản phẩm"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition"
        >
          {saving ? "Đang lưu..." : "💾 Lưu thay đổi"}
        </button>
      </form>
    </div>
  );
}
