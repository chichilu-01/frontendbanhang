import axios from "axios";

// ✅ Tạo instance dùng chung cho toàn bộ API
const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://backendbanhang-production.up.railway.app/api",
  withCredentials: true,
});

// 🔍 Cảnh báo nếu biến môi trường chưa được set
if (!import.meta.env.VITE_API_URL) {
  console.warn(
    "⚠️ VITE_API_URL is not set, using fallback hardcoded backend URL",
  );
}

console.log("🌐 API URL:", import.meta.env.VITE_API_URL || "fallback used");

// =======================
// 🔐 Auth APIs
// =======================
export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);
export const verifyEmailCode = (data) => API.post("/auth/verify-code", data);
export const sendForgotPasswordCode = (data) =>
  API.post("/auth/forgot-password", data);
export const verifyResetCode = (data) =>
  API.post("/auth/verify-reset-code", data);
export const resetPassword = (data) => API.post("/auth/reset-password", data);

// =======================
// 📦 Product APIs
// =======================
export const getProducts = () => API.get("/products");

// ✅ getProductById: đảm bảo luôn trả về images là mảng
export const getProductById = async (id) => {
  const res = await API.get(`/products/${id}`);
  const data = res.data;

  let safeImages = [];
  try {
    if (Array.isArray(data.images)) {
      safeImages = data.images;
    } else if (typeof data.images === "string") {
      const parsed = JSON.parse(data.images);
      safeImages = Array.isArray(parsed) ? parsed : [];
    }
  } catch (err) {
    console.warn("⚠️ Lỗi parse images từ API:", err);
    safeImages = [];
  }

  return {
    ...res,
    data: {
      ...data,
      images: safeImages,
    },
  };
};

export const createProduct = (data) => API.post("/products", data);
export const updateProduct = (id, data) => API.put(`/products/${id}`, data);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

// =======================
// ⭐ Đánh giá sản phẩm
// =======================

export const submitReview = (productId, data, token) =>
  API.post(`/products/${productId}/reviews`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getReviews = (productId) =>
  API.get(`/products/${productId}/reviews`);

export { API };
