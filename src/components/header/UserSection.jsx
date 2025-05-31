import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/MiniCartContext";
import { useState, useRef, useEffect } from "react";

export default function UserSection() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="flex items-center gap-4">
      {/* Cart */}
      <Link
        to="/cart"
        className="relative p-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-md hover:shadow-blue-200 hover:bg-white transition-all duration-300 transform hover:scale-110 hover:animate-wiggle"
        title="Giỏ hàng"
      >
        <span className="text-xl">🛒</span>
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-bounce shadow-lg">
            {cartCount}
          </span>
        )}
      </Link>

      {/* User Menu */}
      {user ? (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm border border-white/20 hover:bg-white transition-all duration-300 font-medium text-gray-700 shadow-md hover:shadow-blue-200 focus:outline-none"
            title="Tài khoản"
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="avatar"
                className="w-7 h-7 rounded-full object-cover border border-blue-200"
              />
            ) : (
              <span className="text-lg">👤</span>
            )}
            <span className="hidden sm:inline">{user.name || user.email}</span>
            <svg
              className={`w-4 h-4 ml-1 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
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
          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl py-2 z-50 animate-fade-in">
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-blue-50 text-gray-700 transition-all"
                onClick={() => setOpen(false)}
              >
                Thông tin cá nhân
              </Link>
              <Link
                to="/orders"
                className="block px-4 py-2 hover:bg-blue-50 text-gray-700 transition-all"
                onClick={() => setOpen(false)}
              >
                Đơn hàng
              </Link>
              <button
                onClick={() => {
                  setOpen(false);
                  logout();
                }}
                className="block w-full text-left px-4 py-2 hover:bg-red-50 text-red-500 transition-all"
              >
                🚪 Đăng xuất
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm border border-white/20 hover:bg-white transition-all duration-300 font-medium text-gray-700 shadow hover:shadow-blue-100 transform hover:scale-105"
          >
            🔐 Đăng nhập
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-110 shadow-lg"
          >
            📝 Đăng ký
          </Link>
        </div>
      )}
      {/* Custom wiggle animation */}
      <style>
        {`
          @keyframes wiggle {
            0%, 100% { transform: rotate(-3deg) scale(1.1);}
            50% { transform: rotate(3deg) scale(1.15);}
          }
          .hover\\:animate-wiggle:hover {
            animation: wiggle 0.3s;
          }
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(-10px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in {
            animation: fade-in 0.2s;
          }
        `}
      </style>
    </div>
  );
}
