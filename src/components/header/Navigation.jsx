
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { MiniCartContext } from "../../context/MiniCartContext";

export default function Navigation() {
  const { user } = useContext(AuthContext);
  const { cartCount } = useContext(MiniCartContext);

  return (
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
  );
}
