import axios from "axios";
import toast from "react-hot-toast";

const baseURL =
  import.meta.env.VITE_API_URL ||
  "https://backendbanhang-production.up.railway.app/api";

console.log("🌐 API baseURL:", baseURL);

export const API = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Global error handler
API.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err?.response?.data?.error ||
      err?.message ||
      "Đã có lỗi xảy ra. Vui lòng thử lại.";
    console.error("❌ API ERROR:", message);
    toast.error(message);
    return Promise.reject(err);
  },
);
