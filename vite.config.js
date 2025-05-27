import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // 👈 cần import path

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // 👈 alias @ => src
    },
  },
  server: {
    host: true,
    port: 3000,
    allowedHosts: "all",
  },
});
  },
});
