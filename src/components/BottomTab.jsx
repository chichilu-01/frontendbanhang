import { NavLink } from "react-router-dom";
import { Home, ShoppingCart, User, Shield, Grid3x3 } from "lucide-react"; // ✅ CHỈ ĐỂ 1 DÒNG IMPORT ICON
import { useAuth } from "@context/AuthContext";
import { useCart } from "@context/CartContext";

export default function BottomTab() {
  const { user } = useAuth();
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      className="
        fixed left-0 right-0 bottom-0 
        bg-white/90 backdrop-blur-xl
        border-t border-gray-200 
        shadow-[0_-2px_10px_rgba(0,0,0,0.08)]
        flex justify-around items-center
        py-2
        z-50 md:hidden
        pb-[calc(env(safe-area-inset-bottom)+6px)]
      "
    >
      <Tab to="/" icon={<Home size={24} />} label="Home" />

      <Tab to="/products" icon={<Grid3x3 size={22} />} label="Sản phẩm" />

      <Tab
        to="/cart"
        icon={<ShoppingCart size={24} />}
        label="Giỏ hàng"
        badge={totalItems > 0 ? totalItems : null}
      />

      {user?.is_admin && (
        <Tab to="/admin" icon={<Shield size={24} />} label="Quản trị" />
      )}

      <Tab
        to={user ? "/account" : "/login"}
        icon={<User size={24} />}
        label={user ? user.name : "Tài khoản"}
      />
    </div>
  );
}

function Tab({ to, icon, label, badge }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        relative flex flex-col items-center text-xs transition-all duration-200
        ${isActive ? "text-blue-600 scale-110" : "text-gray-600"}
        `
      }
    >
      <div className="relative">
        {icon}

        {badge && (
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
            {badge}
          </span>
        )}
      </div>

      <span className="mt-1">{label}</span>
    </NavLink>
  );
}
