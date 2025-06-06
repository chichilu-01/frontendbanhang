import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // chứa thông tin user
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null,
  );

  // Khi token thay đổi → gọi backend để lấy user info (nếu muốn)
  useEffect(() => {
    if (token) {
      // 👇 Hoặc lưu user trong localStorage luôn nếu muốn đơn giản
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [token]);

  const login = (token, userData) => {
    setToken(token);
    setUser(userData);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isLoggedIn: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook để dùng ở mọi nơi
export const useAuth = () => useContext(AuthContext);
