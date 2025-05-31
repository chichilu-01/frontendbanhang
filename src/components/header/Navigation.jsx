import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/MiniCartContext";
import { useState } from "react";

export default function Navigation() {
  const { user } = useAuth();
  const { cartCount } = useCart();
  // Giả lập số lượng wishlist, bạn có thể thay bằng context thực tế
  const wishlistCount = 2;

  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="flex items-center gap-6">
      <Link
        to="/"
        className="relative flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 group"
      >
        <span className="transition-transform duration-300 group-hover:-translate-y-1">
          🏠
        </span>
        Trang chủ
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
      </Link>

      <Link
        to="/products"
        className="relative flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 group"
      >
        <span className="transition-transform duration-300 group-hover:scale-125">
          🛍️
        </span>
        Sản phẩm
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
      </Link>

      <Link
        to="/wishlist"
        className="relative flex items-center gap-1 text-gray-700 hover:text-pink-600 font-medium transition-colors duration-300 group"
      >
        <span className="transition-transform duration-300 group-hover:scale-125">
          ❤️
        </span>
        Yêu thích
        {wishlistCount > 0 && (
          <span className="ml-1 bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {wishlistCount}
          </span>
        )}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
      </Link>

      {user?.role === "admin" && (
        <Link
          to="/admin"
          className="relative flex items-center gap-1 text-gray-700 hover:text-purple-600 font-medium transition-colors duration-300 group"
        >
          <span className="transition-transform duration-300 group-hover:rotate-12">
            ⚙️
          </span>
          Admin
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
        </Link>
      )}

      {/* Cart */}
      <Link
        to="/cart"
        className="relative flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 group"
      >
        <span className="transition-transform duration-300 group-hover:scale-125">
          🛒
        </span>
        Giỏ hàng
        {cartCount > 0 && (
          <span className="ml-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
            {cartCount}
          </span>
        )}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-red-500 transition-all duration-300 group-hover:w-full"></span>
      </Link>

      {/* User Avatar & Dropdown */}
      {user ? (
        <div className="relative">
          <button
            onClick={() => setShowDropdown((v) => !v)}
            className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-blue-100 transition-all"
          >
            <span className="text-xl">👤</span>
            <span className="hidden md:inline font-medium">
              {user.name || user.email}
            </span>
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg py-2 z-50 animate-fade-in">
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-blue-50 text-gray-700"
                onClick={() => setShowDropdown(false)}
              >
                Thông tin cá nhân
              </Link>
              <Link
                to="/orders"
                className="block px-4 py-2 hover:bg-blue-50 text-gray-700"
                onClick={() => setShowDropdown(false)}
              >
                Đơn hàng
              </Link>
              <button
                onClick={() => {
                  setShowDropdown(false);
                  window.location.href = "/logout";
                }}
                className="block w-full text-left px-4 py-2 hover:bg-red-50 text-red-500"
              >
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link
          to="/login"
          className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:from-purple-500 hover:to-pink-500 transition-all"
        >
          <span>🔐</span> Đăng nhập
        </Link>
      )}
    </div>
  );
}
