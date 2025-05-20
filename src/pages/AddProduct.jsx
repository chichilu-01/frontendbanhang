import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [form, setForm] = useState({ name: "", price: "", description: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post("/admin/products", form)
      .then(() => {
        alert("✅ Đã thêm sản phẩm");
        navigate("/admin");
      })
      .catch(() => alert("❌ Không đủ quyền hoặc lỗi dữ liệu"));
  };

  return (
    <div>
      <h1>➕ Thêm sản phẩm mới</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Tên sản phẩm"
          value={form.name}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="price"
          type="number"
          placeholder="Giá"
          value={form.price}
          onChange={handleChange}
          required
        />
        <br />
        <textarea
          name="description"
          placeholder="Mô tả"
          value={form.description}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Lưu</button>
      </form>
    </div>
  );
}
