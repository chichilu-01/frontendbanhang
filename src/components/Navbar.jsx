import React, { useMemo, useRef, useState, useLayoutEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import { useCart } from "@context/CartContext";
import { motion } from "framer-motion";

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
    () => cartItems.reduce((t, i) => t + i.quantity, 0),
    [cartItems],
  );

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path);

  const menu = [
    { to: "/", label: "Trang chủ", icon: <Home size={18} /> },
    { to: "/products", label: "Sản phẩm", icon: <Boxes size={18} /> },
    {
      to: "/cart",
      label: "Giỏ hàng",
      icon: <ShoppingCart size={18} />,
      badge: totalItems,
    },
    user?.is_admin && {
      to: "/admin",
      label: "Quản trị",
      icon: <Settings size={18} />,
    },
    { to: "/account", label: "Tài khoản", icon: <User size={18} /> },
  ].filter(Boolean);

  // Animation indicator position
  const itemRefs = useRef({});
  const [indicator, setIndicator] = useState({ width: 0, left: 0 });

  useLayoutEffect(() => {
    const active = menu.find((m) => isActive(m.to));
    if (active && itemRefs.current[active.to]) {
      const el = itemRefs.current[active.to];
      setIndicator({ width: el.offsetWidth, left: el.offsetLeft });
    }
  }, [location.pathname]);

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
      {/* Background Glow Layer */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-2xl"></div>

      {/* LOGO */}
      <button
        onClick={() => navigate("/")}
        className="text-2xl font-bold text-blue-700 relative z-10"
      >
        ChiChiLu
      </button>

      {/* MENU */}
      <div className="flex items-center gap-6 relative z-10 w-fit relative">
        {/* 🔥 Animated Active Tab Indicator */}
        <motion.div
          className="absolute top-0 bottom-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl -z-10"
          animate={{ width: indicator.width, left: indicator.left }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
        />

        {menu.map((item) => (
          <button
            key={item.to}
            ref={(el) => (itemRefs.current[item.to] = el)}
            onClick={() => navigate(item.to)}
            className={`
              relative flex items-center gap-2 px-4 py-2 font-medium rounded-xl
              transition-all duration-200
              ${isActive(item.to) ? "text-white" : "text-gray-700 hover:text-blue-600"}
            `}
          >
            {item.icon}
            {item.label}

            {/* Badge giỏ hàng */}
            {item.badge > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full shadow">
                {item.badge}
              </span>
            )}

            {/* Hover glow */}
            <motion.div
              className="absolute inset-0 rounded-xl bg-blue-500/10 opacity-0"
              whileHover={{ opacity: 1 }}
            />
          </button>
        ))}

        {/* USER / LOGOUT */}
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
