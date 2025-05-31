import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/MiniCartContext";

export default function Navigation() {
  const { user } = useAuth();
  const { cartCount } = useCart();

  return (
    <div className="flex items-center gap-8">
      <Link
        to="/"
        className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 relative group"
      >
        🏠 Trang chủ
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
      </Link>

      <Link
        to="/products"
        className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 relative group"
      >
        🛍️ Sản phẩm
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
      </Link>

      {user?.role === "admin" && (
        <Link
          to="/admin"
          className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-300 relative group"
        >
          ⚙️ Admin
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
        </Link>
      )}
    </div>
  );
}