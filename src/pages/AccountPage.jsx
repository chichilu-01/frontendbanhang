import { useAuth } from "@context/AuthContext";
import { LogOut, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { API } from "@services/api";
import toast from "react-hot-toast";

export default function AccountPage() {
  const { user, logout, token, setUser: updateUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    birthday: "",
    address: "",
    gender: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ===========================
  // 📌 1. Load dữ liệu từ MySQL
  // ===========================
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const fresh = res.data.user;

        // cập nhật vào AuthContext
        updateUser(fresh);

        // cập nhật vào form
        setForm({
          name: fresh.name || "",
          email: fresh.email || "",
          phone: fresh.phone || "",
          birthday: fresh.birthday?.slice(0, 10) || "",
          address: fresh.address || "",
          gender: fresh.gender || "",
        });
      } catch (err) {
        console.error("Load user error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // ===========================
  // 📌 2. Update dữ liệu đã sửa
  // ===========================
  const handleSave = async () => {
    try {
      setSaving(true);

      // chỉ gửi field nào thay đổi
      const payload = {};
      Object.keys(form).forEach((key) => {
        if (form[key] !== user[key]) {
          payload[key] = form[key] || null;
        }
      });

      if (Object.keys(payload).length === 0) {
        toast("Không có gì để cập nhật!");
        setSaving(false);
        return;
      }

      const res = await API.put("/auth/profile", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedUser = res.data.user;

      toast.success("Đã cập nhật thông tin!");

      // tránh lỗi minify -> luôn dùng callback
      updateUser((prev) => ({
        ...prev,
        ...updatedUser,
      }));

      // cập nhật form với dữ liệu thực mới từ backend
      setForm({
        name: updatedUser.name || "",
        email: updatedUser.email || "",
        phone: updatedUser.phone || "",
        birthday: updatedUser.birthday?.slice(0, 10) || "",
        address: updatedUser.address || "",
        gender: updatedUser.gender || "",
      });
    } catch (err) {
      console.error("Update error:", err);
      toast.error(err.response?.data?.error || "Không thể cập nhật.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Đang tải...</div>;
  }

  return (
    <div className="p-4 pb-24 mx-auto w-full max-w-2xl">
      {/* USER HEADER */}
      <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow">
        <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
          {form.name?.charAt(0)?.toUpperCase()}
        </div>

        <div>
          <h2 className="text-lg font-bold">{form.name}</h2>
          <p className="text-gray-500 text-sm">{form.email}</p>
        </div>
      </div>

      {/* FORM */}
      <div className="mt-6 bg-white p-4 rounded-xl shadow space-y-4">
        <h3 className="text-lg font-bold">Thông tin cá nhân</h3>

        <Field label="Họ và tên">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border p-2 rounded mt-1"
          />
        </Field>

        <Field label="Email">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border p-2 rounded mt-1"
          />
        </Field>

        <Field label="Số điện thoại">
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border p-2 rounded mt-1"
          />
        </Field>

        <Field label="Ngày sinh">
          <input
            type="date"
            name="birthday"
            value={form.birthday || ""}
            onChange={(e) => setForm({ ...form, birthday: e.target.value })}
            className="w-full border p-2 rounded mt-1"
          />
        </Field>

        <Field label="Giới tính">
          <select
            name="gender"
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
            className="w-full border p-2 rounded mt-1"
          >
            <option value="">Không chọn</option>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>
        </Field>

        <Field label="Địa chỉ nhận hàng">
          <textarea
            name="address"
            rows="2"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full border p-2 rounded mt-1"
          />
        </Field>

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

// Component nhỏ giúp form gọn hơn
function Field({ label, children }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}
