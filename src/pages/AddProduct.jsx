import { useState, useEffect } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [form, setForm] = useState({ name: "", price: "", description: "" });
  const navigate = useNavigate();

  // Kiểm tra token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("⚠️ Bạn chưa đăng nhập");
      navigate("/login");
    } else {
      console.log("✅ Token hiện tại:", token);
    }
  }, [navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/products", form);
      console.log("✅ Sản phẩm đã được tạo:", res.data);
      alert("✅ Đã thêm sản phẩm");
      navigate("/admin");
    } catch (err) {
      console.error(
        "❌ Lỗi khi thêm sản phẩm:",
        err.response?.data || err.message,
      );
      alert(
        err.response?.data?.error ||
          "❌ Không đủ quyền hoặc lỗi dữ liệu. Xem console để biết thêm.",
      );
    }
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