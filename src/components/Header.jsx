
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { MiniCartContext } from "../context/MiniCartContext";
import styles from "./Header.module.css";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(MiniCartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white/90 backdrop-blur-xl shadow-2xl border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Pro */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-2xl font-bold">🛍️</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                ChiChiLu-Shop
              </span>
              <span className="text-xs text-gray-500 font-medium tracking-widest uppercase">
                Premium Store
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-200 relative group"
            >
              Trang chủ
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/products"
              className="text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-200 relative group"
            >
              Sản phẩm
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/cart"
              className="text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-200 relative group flex items-center"
            >
              Giỏ hàng
              {cartCount > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
                  {cartCount}
                </span>
              )}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            {user?.role === "admin" && (
              <Link
                to="/admin"
                className="text-amber-600 hover:text-amber-700 font-semibold transition-colors duration-200 relative group"
              >
                Admin
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )}
          </nav>

          {/* User Section */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-xl hover:bg-blue-50 transition-all duration-200 font-semibold"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  Đăng ký
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl px-4 py-2 shadow-lg">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-sm font-bold">
                      {user.name?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-800 font-semibold text-sm">{user.name}</span>
                    <span className="text-gray-500 text-xs">{user.role}</span>
                  </div>
                </div>
                <Link
                  to="/profile"
                  className="text-gray-600 hover:text-blue-600 p-2 rounded-xl hover:bg-blue-50 transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl shadow-2xl border-t border-gray-100">
            <div className="px-4 py-6 space-y-4">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-700 hover:text-blue-600 font-semibold py-2"
              >
                Trang chủ
              </Link>
              <Link
                to="/products"
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-700 hover:text-blue-600 font-semibold py-2"
              >
                Sản phẩm
              </Link>
              <Link
                to="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-700 hover:text-blue-600 font-semibold py-2 flex items-center"
              >
                Giỏ hàng
                {cartCount > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-amber-600 hover:text-amber-700 font-semibold py-2"
                >
                  Admin
                </Link>
              )}
              {!user ? (
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-center bg-gray-100 text-gray-700 px-4 py-3 rounded-xl font-semibold"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-xl font-semibold"
                  >
                    Đăng ký
                  </Link>
                </div>
              ) : (
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {user.name?.charAt(0)?.toUpperCase() || "U"}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.role}</div>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-center bg-blue-50 text-blue-600 px-4 py-3 rounded-xl font-semibold"
                  >
                    Hồ sơ
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-center bg-red-500 text-white px-4 py-3 rounded-xl font-semibold"
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
