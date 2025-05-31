
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/MiniCartContext";
import { useUniverse } from "../../context/UniverseToggleContext";

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
    <div className="p-6 space-y-4">
      {/* Navigation Links */}
      <div className="space-y-3">
        <Link
          to="/"
          onClick={closeMenu}
          className="block px-4 py-3 rounded-xl hover:bg-blue-50 transition-colors text-gray-700 font-medium"
        >
          🏠 Trang chủ
        </Link>
        
        <Link
          to="/products"
          onClick={closeMenu}
          className="block px-4 py-3 rounded-xl hover:bg-blue-50 transition-colors text-gray-700 font-medium"
        >
          🛍️ Sản phẩm
        </Link>

        {user?.role === "admin" && (
          <Link
            to="/admin"
            onClick={closeMenu}
            className="block px-4 py-3 rounded-xl hover:bg-purple-50 transition-colors text-gray-700 font-medium"
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
        className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-blue-50 transition-colors text-gray-700 font-medium"
      >
        <span>🛒 Giỏ hàng</span>
        {cartCount > 0 && (
          <span className="bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
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
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors font-medium ${
          enabled 
            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
            : 'hover:bg-blue-50 text-gray-700'
        }`}
      >
        <span>{enabled ? "🌌 Chế độ vũ trụ" : "🌟 Chế độ thường"}</span>
      </button>

      <hr className="border-gray-200" />

      {/* User Section */}
      {user ? (
        <div className="space-y-3">
          <Link
            to="/profile"
            onClick={closeMenu}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 transition-colors text-gray-700 font-medium"
          >
            <span className="text-lg">👤</span>
            <span>{user.name || user.email}</span>
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
            className="block px-4 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-center font-medium text-gray-700"
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
