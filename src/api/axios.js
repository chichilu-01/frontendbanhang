import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config; // ✅ Luôn phải return config
});

// Interceptor xử lý response lỗi
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    } else if (error.response?.status === 500) {
      console.error("Server error:", error);
    } else if (!error.response) {
      console.error("Network error:", error);
    }
    return Promise.reject(error);
  }
);

export default API;
