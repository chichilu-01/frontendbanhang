import { useAuth } from "@context/AuthContext";
import { LogOut, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { API } from "@services/api";
import toast from "react-hot-toast";

export default function AccountPage() {
  const { user, logout, token, setUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    birthday: user?.birthday || "", // Nếu null vẫn là "", tránh lỗi input date
    address: user?.address || "",
    gender: user?.gender || "",
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const payload = {
        ...form,
        birthday: form.birthday || null, // thêm dòng này
      };

      const res = await API.put("/auth/profile", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Đã cập nhật thông tin!");
      setUser({ ...user, ...res.data.user });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Không thể cập nhật.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto">
      {/* USER HEADER */}
      <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow">
        <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
          {user?.name?.charAt(0)?.toUpperCase()}
        </div>

        <div>
          <h2 className="text-lg font-bold">{user?.name}</h2>
          <p className="text-gray-500 text-sm">{user?.email}</p>
        </div>
      </div>

      {/* FORM */}
      <div className="mt-6 bg-white p-4 rounded-xl shadow space-y-4">
        <h3 className="text-lg font-bold">Thông tin cá nhân</h3>

        {/* NAME */}
        <div>
          <label className="text-sm font-medium">Họ và tên</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        {/* PHONE */}
        <div>
          <label className="text-sm font-medium">Số điện thoại</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        {/* BIRTHDAY */}
        <div>
          <label className="text-sm font-medium">Ngày sinh</label>
          <input
            type="date"
            name="birthday"
            value={form.birthday || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        {/* GENDER */}
        <div>
          <label className="text-sm font-medium">Giới tính</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          >
            <option value="">Không chọn</option>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>
        </div>

        {/* ADDRESS */}
        <div>
          <label className="text-sm font-medium">Địa chỉ nhận hàng</label>
          <textarea
            name="address"
            rows="2"
            value={form.address}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-blue-600 text-white py-2 rounded-lg mt-3 disabled:opacity-50"
        >
          {saving ? "Đang lưu..." : "💾 Lưu thay đổi"}
        </button>
      </div>

      {/* MENU */}
      <div className="mt-6 space-y-3">
        <button
          onClick={() => navigate("/orders")}
          className="w-full flex items-center gap-3 p-4 bg-white rounded-xl shadow text-left"
        >
          <ShoppingBag />
          <span>Đơn hàng của tôi</span>
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-4 bg-red-50 text-red-600 rounded-xl shadow text-left"
        >
          <LogOut />
          <span>Đăng xuất</span>
        </button>
      </div>
    </div>
  );
}
