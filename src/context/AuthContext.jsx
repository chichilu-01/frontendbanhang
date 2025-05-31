// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

// Tạo context
export const AuthContext = createContext();

// Custom hook để sử dụng context
export function useAuth() {
  return useContext(AuthContext);
}

// Provider component
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Khi load lại trang: lấy token từ localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        console.error("❌ Token không hợp lệ:", err);
        localStorage.removeItem("token");
        setUser(null);
      }
    }
  }, []);

  // Gọi khi login thành công
  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    setUser(decoded);
  };

  // Gọi khi logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
