import { useAuth } from "@context/AuthContext";
import { LogOut, User, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AccountPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto">

      {/* USER HEADER */}
      <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow">
        <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        <div>
          <h2 className="text-lg font-bold">{user?.name}</h2>
          <p className="text-gray-500 text-sm">{user?.email}</p>
        </div>
      </div>

      {/* MENU */}
      <div className="mt-6 space-y-3">

        <button
          onClick={() => navigate("/orders")}
          className="w-full flex items-center gap-3 p-4 bg-white rounded-xl shadow text-left"
        >
          <ShoppingBag />
          <span>Đơn hàng của tôi</span>
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-4 bg-red-50 text-red-600 rounded-xl shadow text-left"
        >
          <LogOut />
          <span>Đăng xuất</span>
        </button>

      </div>
    </div>
  );
}
