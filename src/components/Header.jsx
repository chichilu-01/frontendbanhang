// src/components/Header.jsx
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-lg font-bold">
          🏠 Trang chủ
        </Link>
        <Link to="/cart" className="text-blue-600 hover:underline">
          🛒 Giỏ hàng
        </Link>
        {user?.role === "admin" && (
          <Link to="/admin" className="text-blue-600 hover:underline">
            🛠️ Admin
          </Link>
        )}
        {user && (
          <Link to="/my-orders" className="text-blue-600 hover:underline">
            📦 Đơn hàng
          </Link>
        )}
      </div>

      <div className="flex items-center gap-4">
        {!user ? (
          <>
            <Link to="/login" className="text-blue-600 hover:underline">
              Đăng nhập
            </Link>
            <Link to="/register" className="text-blue-600 hover:underline">
              Đăng ký
            </Link>
          </>
        ) : (
          <>
            <Link to="/profile" className="text-gray-600 hover:underline">
              👤 {user.name}
            </Link>
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Đăng xuất
            </button>
          </>
        )}
      </div>
    </header>
  );
}
