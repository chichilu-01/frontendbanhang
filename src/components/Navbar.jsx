import React, { useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import { useCart } from "@context/CartContext";

import {
  Home,
  Boxes,
  ShoppingCart,
  Settings,
  User,
  LogOut,
} from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  // ❌ ẨN NAVBAR Ở CÁC TRANG AUTH
  const hideOn = [
    "/login",
    "/register",
    "/forgot-password",
    "/verify-code",
    "/verify-reset-code",
    "/reset-password",
  ];
  if (hideOn.includes(location.pathname)) return null;

  // 🛒 Tổng số item trong giỏ
  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path);

  // 🎨 CLASS TAB
  const tabClass = (active) =>
    active
      ? "flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-md scale-105"
      : "flex items-center gap-2 px-4 py-2 text-gray-700 font-medium rounded-xl hover:text-blue-600 transition";

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
      {/* Glow Background Layer */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-2xl"></div>

      {/* LOGO */}
      <button
        onClick={() => navigate("/")}
        className="text-2xl font-bold text-blue-700 relative z-10"
      >
        ChiChiLu
      </button>

      {/* MENU */}
      <div className="flex items-center gap-10 ml-6 relative z-10">
        {/* 🏠 Trang chủ */}
        <Link to="/" className={tabClass(isActive("/"))}>
          <Home size={18} /> Trang chủ
        </Link>

        {/* 📦 Sản phẩm */}
        <Link to="/products" className={tabClass(isActive("/products"))}>
          <Boxes size={18} /> Sản phẩm
        </Link>

        {/* 🛒 Giỏ hàng */}
        <div className="relative">
          <Link to="/cart" className={tabClass(isActive("/cart"))}>
            <ShoppingCart size={18} /> Giỏ hàng
          </Link>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full shadow">
              {totalItems}
            </span>
          )}
        </div>

        {/* ⚙️ Admin */}
        {user?.is_admin && (
          <Link to="/admin" className={tabClass(isActive("/admin"))}>
            <Settings size={18} /> Quản trị
          </Link>
        )}

        {/* 👤 Tài khoản */}
        <Link to="/account" className={tabClass(isActive("/account"))}>
          <User size={18} /> Tài khoản
        </Link>

        {/* LOGIN / USER / LOGOUT */}
        {user ? (
          <div className="flex items-center gap-3 ml-3">
            <span className="text-gray-800 font-medium flex items-center gap-1">
              <User size={16} className="text-blue-600" /> {user.name}
            </span>

            <button
              onClick={logout}
              className="flex items-center gap-1 text-red-500 hover:underline"
            >
              <LogOut size={16} /> Đăng xuất
            </button>
          </div>
        ) : (
          <Link to="/login" className="text-gray-700 hover:text-blue-600">
            Đăng nhập
          </Link>
        )}
      </div>
    </div>
  );
}
