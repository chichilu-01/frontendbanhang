import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null,
  );

  // Load user khi có token
  useEffect(() => {
    if (token) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          const safeUser = {
            ...parsedUser,
            is_admin:
              parsedUser.is_admin === true ||
              parsedUser.is_admin === "true" ||
              parsedUser.is_admin === 1 ||
              parsedUser.role === "admin",
          };
          setUser(safeUser);
        } catch (err) {
          console.error("❌ Failed to parse stored user:", err);
          setUser(null);
        }
      }
    }
  }, [token]);

  // Login
  const login = (token, userData) => {
    const safeUser = {
      ...userData,
      is_admin:
        userData.is_admin === true ||
        userData.is_admin === "true" ||
        userData.is_admin === 1 ||
        userData.role === "admin",
    };

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(safeUser));

    setToken(token);
    setUser(safeUser);
  };

  // 🔥 Hàm updateUser bạn đang thiếu
  const updateUser = (newData) => {
    const updated = { ...user, ...newData };
    localStorage.setItem("user", JSON.stringify(updated));
    setUser(updated);
  };

  // Logout
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  console.log("🔐 Gửi với token:", token);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        setUser, // ok
        updateUser, // 🔥 giờ đã có thật
        isLoggedIn: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
