// src/components/Header.jsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const checkToken = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", checkToken);
    return () => window.removeEventListener("storage", checkToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-lg font-bold">🏠 Trang chủ</Link>
        <Link to="/cart" className="text-blue-600 hover:underline">🛒 Giỏ hàng</Link>
      </div>

      <div className="flex items-center gap-4">
        {!token ? (
          <>
            <Link to="/login" className="text-blue-600 hover:underline">Đăng nhập</Link>
            <Link to="/register" className="text-blue-600 hover:underline">Đăng ký</Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Đăng xuất
          </button>
        )}
      </div>
    </header>
  );
}
