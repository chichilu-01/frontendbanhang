import { Home, ShoppingCart, User, Heart } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function BottomTab() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md z-50">
      <div className="flex justify-between px-6 py-3">
        <NavItem to="/" icon={<Home size={24} />} label="Home" />
        <NavItem to="/cart" icon={<ShoppingCart size={24} />} label="Cart" />
        <NavItem to="/wishlist" icon={<Heart size={24} />} label="Yêu thích" />
        <NavItem to="/account" icon={<User size={24} />} label="Tài khoản" />
      </div>
    </div>
  );
}

function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        "flex flex-col items-center text-sm " +
        (isActive ? "text-blue-600 font-semibold" : "text-gray-500")
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}
