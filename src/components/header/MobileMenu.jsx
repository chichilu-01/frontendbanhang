
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { MiniCartContext } from "../../context/MiniCartContext";

export default function MobileMenu({ isMenuOpen, setIsMenuOpen, handleLogout }) {
  const { user } = useContext(AuthContext);
  const { cartCount } = useContext(MiniCartContext);

  if (!isMenuOpen) return null;

  return (
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
  );
}
