import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/MiniCartContext";
import { useUniverse } from "../../context/UniverseToggleContext";
import Logo from "./Logo";

export default function MobileMenu({ isOpen, setIsOpen }) {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const { enabled, toggle } = useUniverse();

  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <div
      className={`p-6 space-y-4 bg-blue-50 rounded-2xl shadow-lg transition-all duration-500 fixed top-0 left-0 w-full z-50 max-w-xs h-full overflow-y-auto
        ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full pointer-events-none"}
      `}
      aria-label="Mobile navigation menu"
      tabIndex={isOpen ? 0 : -1}
    >
      {/* Close Button */}
      <button
        onClick={closeMenu}
        className="absolute top-4 right-4 text-gray-500 hover:text-blue-600 text-2xl font-bold focus:outline-none"
        aria-label="Đóng menu"
      >
        ×
      </button>

      {/* Logo */}
      <div className="mb-4 flex justify-center">
        <Logo />
      </div>

      {/* User Status */}
      <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white shadow-sm mb-2">
        {user ? (
          <>
            <span className="text-2xl">👤</span>
            <span className="font-medium text-gray-700">
              {user.name || user.email}
            </span>
          </>
        ) : (
          <span className="text-gray-500">Chưa đăng nhập</span>
        )}
      </div>

      {/* Navigation Links */}
      <div className="space-y-3">
        <Link
          to="/"
          onClick={closeMenu}
          className="block px-4 py-3 rounded-xl hover:bg-blue-100 transition-all text-gray-700 font-medium"
        >
          🏠 Trang chủ
        </Link>
        <Link
          to="/products"
          onClick={closeMenu}
          className="block px-4 py-3 rounded-xl hover:bg-blue-100 transition-all text-gray-700 font-medium"
        >
          🛍️ Sản phẩm
        </Link>
        <Link
          to="/wishlist"
          onClick={closeMenu}
          className="block px-4 py-3 rounded-xl hover:bg-pink-100 transition-all text-gray-700 font-medium"
        >
          ❤️ Yêu thích
        </Link>
        {user?.role === "admin" && (
          <Link
            to="/admin"
            onClick={closeMenu}
            className="block px-4 py-3 rounded-xl hover:bg-purple-100 transition-all text-gray-700 font-medium"
          >
            ⚙️ Admin Panel
          </Link>
        )}
      </div>

      <hr className="border-gray-200" />

      {/* Cart */}
      <Link
        to="/cart"
        onClick={closeMenu}
        className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-blue-100 transition-all text-gray-700 font-medium"
      >
        <span>🛒 Giỏ hàng</span>
        {cartCount > 0 && (
          <span className="bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
            {cartCount}
          </span>
        )}
      </Link>

      {/* Universe Toggle */}
      <button
        onClick={() => {
          toggle();
          closeMenu();
        }}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          enabled
            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow"
            : "hover:bg-blue-100 text-gray-700"
        }`}
        aria-pressed={enabled}
      >
        <span className="flex items-center gap-2">
          {enabled ? <span className="animate-spin">🌌</span> : <span>🌟</span>}
          {enabled ? "Chế độ vũ trụ" : "Chế độ thường"}
        </span>
      </button>

      <hr className="border-gray-200" />

      {/* User Section */}
      {user ? (
        <div className="space-y-3">
          <Link
            to="/profile"
            onClick={closeMenu}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-100 transition-all text-gray-700 font-medium"
          >
            <span className="text-lg">👤</span>
            <span>Thông tin cá nhân</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium hover:from-pink-500 hover:to-red-500 transition-all duration-300"
          >
            🚪 Đăng xuất
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <Link
            to="/login"
            onClick={closeMenu}
            className="block px-4 py-3 rounded-xl border border-gray-200 hover:bg-gray-100 transition-all text-center font-medium text-gray-700"
          >
            🔐 Đăng nhập
          </Link>
          <Link
            to="/register"
            onClick={closeMenu}
            className="block px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-center"
          >
            📝 Đăng ký
          </Link>
        </div>
      )}
    </div>
  );
}
