import React, { useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import { useCart } from "@context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  // ❌ Các trang KHÔNG hiển thị navbar
  const hideOn = [
    "/login",
    "/register",
    "/forgot-password",
    "/verify-code",
    "/verify-reset-code",
    "/reset-password",
  ];
  if (hideOn.includes(location.pathname)) return null;

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path);

  const tabClass = (active) =>
    active
      ? "px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-md scale-105"
      : "px-4 py-2 text-gray-700 font-medium rounded-xl hover:text-blue-600 transition";

  return (
    <div
      className="
      hidden md:flex justify-between items-center 
      py-3 px-6 mb-6 rounded-3xl mx-auto max-w-6xl sticky top-4 z-50
      backdrop-blur-2xl bg-white/20 
      shadow-[0_8px_32px_rgba(31,38,135,0.2)]
      border border-white/30 relative overflow-hidden
    "
    >
      {/* Glow background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-2xl"></div>

      {/* LOGO */}
      <button
        onClick={() => navigate("/")}
        className="text-2xl font-bold text-blue-700 relative z-10"
      >
        🛍️ ChiChiLu
      </button>

      {/* MENU ITEMS */}
      <div className="flex items-center gap-6 relative z-10">
        <Link to="/" className={tabClass(isActive("/"))}>
          🏠 Trang chủ
        </Link>

        <Link to="/products" className={tabClass(isActive("/products"))}>
          🗂️ Sản phẩm
        </Link>

        <div className="relative">
          <Link to="/cart" className={tabClass(isActive("/cart"))}>
            🛒 Giỏ hàng
          </Link>
          {totalItems > 0 && (
            <span
              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs 
                px-1.5 py-0.5 rounded-full shadow"
            >
              {totalItems}
            </span>
          )}
        </div>

        {user?.is_admin && (
          <Link to="/admin" className={tabClass(isActive("/admin"))}>
            ⚙️ Quản trị
          </Link>
        )}

        <Link to="/account" className={tabClass(isActive("/account"))}>
          👤 Tài khoản
        </Link>

        {/* USER / LOGOUT */}
        {user ? (
          <div className="flex items-center gap-3 ml-3">
            <span className="text-gray-800 font-medium">👋 {user.name}</span>
            <button onClick={logout} className="text-red-500 hover:underline">
              🚪 Đăng xuất
            </button>
          </div>
        ) : (
          <Link to="/login" className="text-gray-700 hover:text-blue-600">
            🔐 Đăng nhập
          </Link>
        )}
      </div>
    </div>
  );
}
