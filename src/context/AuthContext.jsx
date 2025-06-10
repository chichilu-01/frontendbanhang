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

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  console.log("🔐 Gửi với token:", token);

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isLoggedIn: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
