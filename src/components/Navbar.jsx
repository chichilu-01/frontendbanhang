import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">
        🛒 ShopX
      </Link>
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600">
          Trang chủ
        </Link>
        <Link to="/cart" className="text-gray-700 hover:text-blue-600">
          Giỏ hàng
        </Link>
        {user ? (
          <>
            <span className="text-gray-700">👤 {user.name}</span>
            <button onClick={logout} className="text-red-500 hover:underline">
              Đăng xuất
            </button>
          </>
        ) : (
          <Link to="/login" className="text-gray-700 hover:text-blue-600">
            Đăng nhập
          </Link>
        )}
      </div>
    </nav>
  );
}

/*Hiển thị tên shop 🛒 ShopX
Có 3 link điều hướng: Trang chủ, Giỏ hàng, Đăng nhập
Giao diện đơn giản, đẹp mắt bằng Tailwind*/
