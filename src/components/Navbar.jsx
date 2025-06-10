import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import { useCart } from "@context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  console.log("👤 NAVBAR USER:", user);

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const menuItems = [
    { to: "/", label: "🏠 Trang chủ" },
    {
      to: "/cart",
      label: "🛒 Giỏ hàng",
      badge: totalItems > 0 ? totalItems : null,
    },
    user?.is_admin && { to: "/admin", label: "⚙️ Quản trị" },
  ].filter(Boolean);

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center z-50">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-blue-600">
        🛍️ ShopX
      </Link>

      {/* Menu */}
      <div className="flex items-center gap-6">
        {menuItems.map(({ to, label, badge }) => (
          <Link
            key={to}
            to={to}
            className="relative text-gray-700 hover:text-blue-600"
          >
            {label}
            {badge && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {badge}
              </span>
            )}
          </Link>
        ))}

        {user ? (
          <>
            <span className="text-gray-700">👤 {user.name}</span>
            <button onClick={logout} className="text-red-500 hover:underline">
              🚪 Đăng xuất
            </button>
          </>
        ) : (
          <Link to="/login" className="text-gray-700 hover:text-blue-600">
            🔐 Đăng nhập
          </Link>
        )}
      </div>
    </nav>
  );
}
