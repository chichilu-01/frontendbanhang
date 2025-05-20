// src/components/Header.jsx
import { Link } from "react-router-dom";

export default function Header() {
  const token = localStorage.getItem("token");

  return (
    <header style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/" style={{ marginRight: "10px" }}>Trang chủ</Link>
      <Link to="/cart" style={{ marginRight: "10px" }}>🛒 Giỏ hàng</Link>

      {!token && (
        <>
          <Link to="/login" style={{ marginRight: "10px" }}>Đăng nhập</Link>
          <Link to="/register" style={{ marginRight: "10px" }}>Đăng ký</Link>
        </>
      )}

      {token && (
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
        >
          Đăng xuất
        </button>
      )}
    </header>
  );
}
