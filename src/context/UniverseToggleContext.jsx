import { createContext, useContext, useEffect, useState } from "react";

const UniverseContext = createContext();

export const useUniverse = () => useContext(UniverseContext);

const UniverseProvider = ({ children }) => {
  // ✅ Tự động bật nếu trong khoảng 19h đến 6h, hoặc theo localStorage
  const getInitialState = () => {
    const saved = localStorage.getItem("universe");
    if (saved !== null) return saved === "on";

    const hour = new Date().getHours();
    return hour >= 19 || hour < 6;
  };

  const [enabled, setEnabled] = useState(getInitialState);

  const toggleUniverse = () => {
    setEnabled((prev) => {
      const next = !prev;
      localStorage.setItem("universe", next ? "on" : "off");
      return next;
    });
  };

  useEffect(() => {
    document.body.classList.toggle("universe-on", enabled);
    document.body.classList.toggle("dark", enabled); // ✅ Gắn dark mode luôn
  }, [enabled]);

  return (
    <UniverseContext.Provider value={{ enabled, toggleUniverse }}>
      {children}
    </UniverseContext.Provider>
  );
};

export default UniverseProvider;
