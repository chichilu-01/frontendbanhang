import { useAuth } from "@context/AuthContext";
import {
  LogOut,
  ShoppingBag,
  Pencil,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { API } from "@services/api";
import toast from "react-hot-toast";

export default function AccountPage() {
  const { user, logout, token, updateUser } = useAuth();
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
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const fresh = res.data.user;
        updateUser(fresh);

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

  const handleSave = async () => {
    try {
      setSaving(true);

      const payload = { ...form };

      const res = await API.put("/auth/profile", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      updateUser(res.data.user);
      toast.success("✨ Đã lưu thay đổi!");
      setIsEditing(false);
    } catch (err) {
      toast.error(err.response?.data?.error || "Không thể cập nhật.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setForm({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      birthday: user.birthday?.slice(0, 10) || "",
      address: user.address || "",
      gender: user.gender || "",
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) return <div className="p-4 text-center">Đang tải...</div>;

  return (
    <div className="p-4 pb-24 mx-auto w-full max-w-3xl bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      {/* 🔥 ULTRA MENU GLASS */}
      <UltraMenu user={user} navigate={navigate} />

      {/* HEADER */}
      <div className="flex items-center justify-between p-5 bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/40">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {form.name?.charAt(0)?.toUpperCase()}
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800">{form.name}</h2>
            <p className="text-gray-500 text-sm">{form.email}</p>
          </div>
        </div>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
          >
            <Pencil size={18} /> Sửa
          </button>
        )}
      </div>

      {/* FORM */}
      <div className="mt-6 bg-white/80 backdrop-blur-xl p-5 rounded-2xl shadow border border-white/40 space-y-6">
        <h3 className="text-xl font-semibold text-gray-800">
          Thông tin cá nhân
        </h3>

        <ProfileField icon={<User />} label="Họ và tên">
          <input
            className="input-box"
            readOnly={!isEditing}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </ProfileField>

        <ProfileField icon={<Mail />} label="Email">
          <input
            className="input-box"
            readOnly={!isEditing}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </ProfileField>

        <ProfileField icon={<Phone />} label="Số điện thoại">
          <input
            className="input-box"
            readOnly={!isEditing}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </ProfileField>

        <ProfileField icon={<Calendar />} label="Ngày sinh">
          <input
            type="date"
            className="input-box"
            disabled={!isEditing}
            value={form.birthday}
            onChange={(e) => setForm({ ...form, birthday: e.target.value })}
          />
        </ProfileField>

        <ProfileField label="Giới tính">
          <select
            className="input-box"
            disabled={!isEditing}
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          >
            <option value="">Không chọn</option>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>
        </ProfileField>

        <ProfileField icon={<MapPin />} label="Địa chỉ nhận hàng">
          <textarea
            className="input-box"
            rows="2"
            readOnly={!isEditing}
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </ProfileField>

        {isEditing && (
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 bg-blue-600 text-white py-3 rounded-xl text-lg shadow hover:bg-blue-700 transition disabled:opacity-50"
            >
              {saving ? "Đang lưu..." : "💾 Lưu thay đổi"}
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl text-lg shadow hover:bg-gray-300 transition"
            >
              Hủy
            </button>
          </div>
        )}
      </div>

      {/* MENU */}
      <div className="mt-8 space-y-3">
        <button onClick={() => navigate("/orders")} className="menu-btn">
          <ShoppingBag /> <span>Đơn hàng của tôi</span>
        </button>

        <button
          onClick={handleLogout}
          className="menu-btn bg-red-50 text-red-600 hover:bg-red-100"
        >
          <LogOut /> <span>Đăng xuất</span>
        </button>
      </div>
    </div>
  );
}

/* -------------- ULTRA MENU COMPONENT -------------- */
function UltraMenu({ user, navigate }) {
  return (
    <div
      className="
      hidden md:flex justify-center gap-10 
      py-3 px-6 mb-6 rounded-3xl mx-auto max-w-5xl sticky top-4 z-50
      backdrop-blur-2xl bg-white/20 
      shadow-[0_8px_32px_rgba(31,38,135,0.2)]
      border border-white/30 relative overflow-hidden
      animate-fadeIn
    "
    >
      {/* Glow background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-2xl"></div>

      <MenuItem icon="🏠" label="Trang chủ" onClick={() => navigate("/")} />
      <MenuItem
        icon="🛍️"
        label="Sản phẩm"
        onClick={() => navigate("/products")}
      />
      <MenuItem icon="🛒" label="Giỏ hàng" onClick={() => navigate("/cart")} />

      {user?.is_admin && (
        <MenuItem
          icon="⚙️"
          label="Quản trị"
          onClick={() => navigate("/admin")}
        />
      )}

      <MenuItemActive icon="👤" label="Tài khoản" />
    </div>
  );
}

/* -------------- MENU ITEM COMPONENTS -------------- */
function MenuItem({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group relative px-4 py-2 text-gray-800 font-medium rounded-xl hover:text-blue-600 transition"
    >
      <span className="text-lg">{icon}</span> {label}
      <div className="absolute inset-0 rounded-xl bg-blue-400/10 blur-xl opacity-0 group-hover:opacity-100 transition"></div>
    </button>
  );
}

function MenuItemActive({ icon, label }) {
  return (
    <div
      className="
      px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 
      text-white font-semibold shadow-lg shadow-blue-500/30 scale-105
    "
    >
      <span className="text-lg">{icon}</span> {label}
    </div>
  );
}

/* -------------- FIELD COMPONENT -------------- */
function ProfileField({ icon, label, children }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
        {icon && <span className="text-gray-500">{icon}</span>}
        {label}
      </label>
      {children}
    </div>
  );
}
