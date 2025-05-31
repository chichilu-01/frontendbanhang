
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/MiniCartContext";

export default function UserSection() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();

  return (
    <div className="flex items-center gap-4">
      {/* Cart */}
      <Link
        to="/cart"
        className="relative p-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 hover:bg-white transition-all duration-300 transform hover:scale-105"
      >
        <span className="text-xl">🛒</span>
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
            {cartCount}
          </span>
        )}
      </Link>

      {/* User Menu */}
      {user ? (
        <div className="flex items-center gap-3">
          <Link
            to="/profile"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm border border-white/20 hover:bg-white transition-all duration-300"
          >
            <span className="text-lg">👤</span>
            <span className="font-medium text-gray-700">{user.name || user.email}</span>
          </Link>
          
          <button
            onClick={logout}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium hover:from-pink-500 hover:to-red-500 transition-all duration-300 transform hover:scale-105"
          >
            🚪 Đăng xuất
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm border border-white/20 hover:bg-white transition-all duration-300 font-medium text-gray-700"
          >
            🔐 Đăng nhập
          </Link>
          
          <Link
            to="/register"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
          >
            📝 Đăng ký
          </Link>
        </div>
      )}
    </div>
  );
}
