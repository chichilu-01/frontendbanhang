import { NavLink } from "react-router-dom";
import { Home, ShoppingCart, User, Shield } from "lucide-react";
import { useAuth } from "@context/AuthContext";
import { useCart } from "@context/CartContext";
import { Home, ShoppingCart, Grid3x3, User } from "lucide-react";

export default function BottomTab() {
  const { user } = useAuth();
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      className="
      fixed bottom-3 left-1/2 -translate-x-1/2
      w-[92%] bg-white/85 backdrop-blur-md
      border border-gray-200 shadow-lg
      rounded-2xl py-2 px-4
      flex justify-around items-center
      z-50 md:hidden
    "
    >
      <Tab to="/" icon={<Home size={24} />} label="Home" />
      <Tab
        to="/products" // ⭐ TAB SẢN PHẨM
        icon={<Grid3x3 size={22} />}
        label="Sản phẩm"
      />

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
