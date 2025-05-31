import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { MiniCartProvider } from "./context/MiniCartContext"; // ⬅️ Thêm dòng này
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ToastProvider>
        <MiniCartProvider>
          {" "}
          {/* ✅ Bọc App trong MiniCartProvider */}
          <App />
        </MiniCartProvider>
      </ToastProvider>
    </AuthProvider>
  </React.StrictMode>,
);
