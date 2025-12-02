import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@context": path.resolve(__dirname, "./src/context"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@": path.resolve(__dirname, "./src"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
    },
  },

  // 🔥🔥🔥 FIX LỖI MINIFY GÂY "s is not a function"
  build: {
    minify: false, // TẮT minify để tránh rename biến gây crash
    sourcemap: true, // Hỗ trợ debug
    terserOptions: {
      mangle: false, // KHÔNG rút gọn tên biến/hàm
      compress: false, // KHÔNG nén code (tránh tối ưu sai)
    },
  },

  server: {
    proxy: {
      "/api": {
        target: "https://backendbanhang-production.up.railway.app",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
