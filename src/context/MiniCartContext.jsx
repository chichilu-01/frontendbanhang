import { createContext, useContext, useState } from "react";

const MiniCartContext = createContext();

export const MiniCartProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openMiniCart = () => setIsOpen(true);
  const closeMiniCart = () => setIsOpen(false);

  return (
    <MiniCartContext.Provider value={{ isOpen, openMiniCart, closeMiniCart }}>
      {children}
    </MiniCartContext.Provider>
  );
};

export const useMiniCart = () => useContext(MiniCartContext);
