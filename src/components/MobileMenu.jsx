import { Link } from "react-router-dom";

export default function MobileMenu({ user, handleLogout, setIsMenuOpen }) {
  return (
    <div className="md:hidden py-4 border-t border-gray-200 bg-white">
      <div className="space-y-2">
        <Link
          to="/"
          className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition duration-200"
          onClick={() => setIsMenuOpen(false)}
        >
          🏠 Trang chủ
        </Link>
        <Link
          to="/cart"
          className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition duration-200"
          onClick={() => setIsMenuOpen(false)}
        >
          🛒 Giỏ hàng
        </Link>
        {user?.role === "admin" && (
          <Link
            to="/admin"
            className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            🛠️ Admin
          </Link>
        )}
        {user && (
          <Link
            to="/my-orders"
            className="block px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            📦 Đơn hàng
          </Link>
        )}
        {!user ? (
          <div className="pt-4 border-t border-gray-200 space-y-2">
            <Link
              to="/login"
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Đăng nhập
            </Link>
            <Link
              to="/register"
              className="block px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Đăng ký
            </Link>
          </div>
        ) : (
          <div className="pt-4 border-t border-gray-200 space-y-2">
            <div className="px-4 py-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700 font-medium">
                👋 Chào, {user.name}
              </span>
            </div>
            <Link
              to="/profile"
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              👤 Hồ sơ
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition duration-200"
            >
              Đăng xuất
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
