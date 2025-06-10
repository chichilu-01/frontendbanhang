import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null,
  );

  useEffect(() => {
    if (token) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        parsedUser.is_admin =
          parsedUser.is_admin === true ||
          parsedUser.is_admin === "true" ||
          parsedUser.is_admin === 1;
        setUser(parsedUser);
      }
    }
  }, [token]);

  const login = (token, userData) => {
    // ✅ Ép kiểu tại đây luôn cho chắc
    const safeUser = {
      ...userData,
      is_admin:
        userData.is_admin === true ||
        userData.is_admin === "true" ||
        userData.is_admin === 1,
    };

    setToken(token);
    setUser(safeUser);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(safeUser));
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

export const useAuth = () => useContext(AuthContext);
