import { Home, ShoppingCart, User } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function BottomTab() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md z-50 md:hidden">
      <div className="flex justify-around py-2">
        <Tab to="/" icon={<Home size={24} />} label="Home" />
        <Tab to="/cart" icon={<ShoppingCart size={24} />} label="Giỏ hàng" />
        <Tab to="/account" icon={<User size={24} />} label="Tài khoản" />
      </div>
    </div>
  );
}

function Tab({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        "flex flex-col items-center text-xs " +
        (isActive ? "text-blue-600" : "text-gray-500")
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}
