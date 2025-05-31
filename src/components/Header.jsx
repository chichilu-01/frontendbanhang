import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import MobileMenu from "./MobileMenu";
import styles from "./Header.module.css";

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div
              className={`${styles["logo-animation"]} bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300 relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-white opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="text-white text-3xl sm:text-2xl font-bold relative z-10">
                🛍️
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-xl font-bold holographic leading-tight">
                ChiChiLu-Shop
              </span>
              <span className="text-sm sm:text-xs text-gray-500 font-medium tracking-wide">
                Premium Store
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium"
            >
              🏠 Trang chủ
            </Link>
            <Link
              to="/cart"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium"
            >
              🛒 Giỏ hàng
            </Link>
            {user?.role === "admin" && (
              <Link
                to="/admin"
                className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-lg hover:bg-purple-50 transition-colors duration-200 font-medium"
              >
                🛠️ Admin
              </Link>
            )}
            {user && (
              <Link
                to="/my-orders"
                className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-lg hover:bg-green-50 transition-colors duration-200 font-medium"
              >
                📦 Đơn hàng
              </Link>
            )}
          </nav>

          {/* User Section */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Đăng ký
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {user.name?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  </div>
                  <span className="text-gray-700 font-medium">{user.name}</span>
                </div>
                <Link
                  to="/profile"
                  className="text-gray-600 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                >
                  👤
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium"
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
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

        {isMenuOpen && (
          <MobileMenu
            user={user}
            handleLogout={handleLogout}
            setIsMenuOpen={setIsMenuOpen}
          />
        )}
      </div>
    </header>
  );
}
