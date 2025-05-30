import { createContext, useState, useContext, useCallback } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-5 right-5 space-y-2 z-[9999]">
        {toasts.map(({ id, message, type }) => (
          <div
            key={id}
            className={`px-4 py-3 rounded-lg shadow-lg text-sm text-white transition-all ${
              type === "success"
                ? "bg-green-500"
                : type === "error"
                  ? "bg-red-500"
                  : "bg-blue-500"
            }`}
          >
            {type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️"}{" "}
            {message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
