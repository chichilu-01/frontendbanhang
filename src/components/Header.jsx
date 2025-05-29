import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext";

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white/95 dark:bg-gray-900 dark:text-white backdrop-blur-sm shadow-lg border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="logo-animation bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-white opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="text-white text-3xl font-bold relative z-10">
                🛍️
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold holographic leading-tight">
                ChiChiLu-Shop
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-300 font-medium tracking-wide">
                Premium Store
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="nav-item">
              🏠 Trang chủ
            </Link>
            <Link to="/cart" className="nav-item">
              🛒 Giỏ hàng
            </Link>
            {user?.role === "admin" && (
              <Link
                to="/admin"
                className="nav-item text-purple-600 dark:text-purple-400"
              >
                🛠️ Admin
              </Link>
            )}
            {user && (
              <Link
                to="/my-orders"
                className="nav-item text-green-600 dark:text-green-400"
              >
                📦 Đơn hàng
              </Link>
            )}
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              title="Đổi giao diện"
              className="p-2 rounded-lg hover:bg-yellow-100 dark:hover:bg-gray-700 transition"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          </nav>

          {/* User Section */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="nav-item">
                  Đăng nhập
                </Link>
                <Link to="/register" className="btn-primary">
                  Đăng ký
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {user.name?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  </div>
                  <span className="font-medium">{user.name}</span>
                </div>
                <Link
                  to="/profile"
                  className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700"
                >
                  👤
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="space-y-2">
              <Link
                to="/"
                className="mobile-nav-item"
                onClick={() => setIsMenuOpen(false)}
              >
                🏠 Trang chủ
              </Link>
              <Link
                to="/cart"
                className="mobile-nav-item"
                onClick={() => setIsMenuOpen(false)}
              >
                🛒 Giỏ hàng
              </Link>
              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="mobile-nav-item text-purple-600 dark:text-purple-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  🛠️ Admin
                </Link>
              )}
              {user && (
                <Link
                  to="/my-orders"
                  className="mobile-nav-item text-green-600 dark:text-green-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  📦 Đơn hàng
                </Link>
              )}

              {/* Theme toggle */}
              <button
                onClick={() => {
                  toggleTheme();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-3 text-gray-700 dark:text-white hover:bg-yellow-100 dark:hover:bg-gray-800 rounded-lg transition"
              >
                {theme === "dark" ? "☀️ Giao diện sáng" : "🌙 Giao diện tối"}
              </button>

              {/* Auth buttons */}
              {!user ? (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                  <Link
                    to="/login"
                    className="mobile-nav-item"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="/register"
                    className="mobile-nav-item bg-blue-500 text-white hover:bg-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Đăng ký
                  </Link>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                  <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    👋 Chào, {user.name}
                  </div>
                  <Link
                    to="/profile"
                    className="mobile-nav-item"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    👤 Hồ sơ
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-gray-800 rounded-lg transition"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
