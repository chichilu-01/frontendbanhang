import React, { useRef, useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import { useCart } from "@context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMobileOpen(false);
      }
    };
    if (isMobileOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isMobileOpen]);

  const closeMenu = () => setIsMobileOpen(false);

  const menuItems = [
    { to: "/", label: "🏠 Trang chủ" },
    { to: "/cart", label: "🛒 Giỏ hàng" },
    user?.is_admin && { to: "/admin", label: "⚙️ Quản trị" },
  ].filter(Boolean);

  const MenuLink = ({ to, label }) => (
    <Link
      to={to}
      onClick={closeMenu}
      className="text-gray-700 hover:text-blue-600"
    >
      {label}
      {to === "/cart" && totalItems > 0 && (
        <span className="ml-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
          {totalItems}
        </span>
      )}
    </Link>
  );

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center relative z-50">
      <Link to="/" className="text-xl font-bold text-blue-600">
        🛒 ShopX
      </Link>

      <button
        onClick={() => setIsMobileOpen(true)}
        className="text-2xl text-gray-700 sm:hidden"
      >
        ☰
      </button>

      {/* Desktop menu */}
      <div className="hidden sm:flex items-center space-x-4">
        {menuItems.map(({ to, label }) => (
          <MenuLink key={to} to={to} label={label} />
        ))}
        {user ? (
          <>
            <span className="text-gray-700">👤 {user.name}</span>
            <button onClick={logout} className="text-red-500 hover:underline">
              Đăng xuất
            </button>
          </>
        ) : (
          <Link to="/login" className="text-gray-700 hover:text-blue-600">
            Đăng nhập
          </Link>
        )}
      </div>

      {/* Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 sm:hidden" />
      )}

      {/* Mobile menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 w-full h-full bg-white z-50 sm:hidden transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b">
          <span className="text-lg font-bold text-blue-600">📋 Menu</span>
          <button
            onClick={closeMenu}
            className="text-2xl text-gray-600 hover:text-red-500"
          >
            ×
          </button>
        </div>

        {user && (
          <div className="px-4 py-4 border-b flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-xl text-blue-600 font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-800 text-base">
                {user.is_admin ? "⚙️ Admin" : "👤 Người dùng"} {user.name}
              </span>
              <span className="text-sm text-gray-500">{user.email}</span>
            </div>
          </div>
        )}

        <nav className="flex flex-col px-6 py-6 space-y-4 text-lg">
          {menuItems.map(({ to, label }) => (
            <MenuLink key={to} to={to} label={label} />
          ))}
        </nav>

        <div className="px-6 mt-auto pb-10 border-t">
          {user ? (
            <button
              onClick={() => {
                logout();
                closeMenu();
              }}
              className="text-left text-red-600 text-base hover:underline pt-4"
            >
              🚪 Đăng xuất
            </button>
          ) : (
            <Link
              to="/login"
              onClick={closeMenu}
              className="text-gray-700 hover:text-blue-600 text-base pt-4 block"
            >
              🔐 Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
