// 📁 src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://backendbanhang-production.up.railway.app/api",
  withCredentials: true,
});

if (!import.meta.env.VITE_API_URL) {
  console.warn(
    "⚠️ VITE_API_URL is not set, using fallback hardcoded backend URL",
  );
}

console.log("🌐 API URL:", import.meta.env.VITE_API_URL || "fallback used");

// ======================
// 🔐 Auth APIs
// ======================
export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);
export const verifyEmailCode = (data) => API.post("/auth/verify-code", data);
export const sendForgotPasswordCode = (data) =>
  API.post("/auth/forgot-password", data);
export const verifyResetCode = (data) =>
  API.post("/auth/verify-reset-code", data);
export const resetPassword = (data) => API.post("/auth/reset-password", data);
export const logoutUser = (token) =>
  API.post("/auth/logout", null, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getProfile = (token) =>
  API.get("/auth/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });

// ======================
// 📦 Product APIs
// ======================
export const getProducts = () => API.get("/products");

export const getProductById = async (id) => {
  const res = await API.get(`/products/${id}`);
  const productData = res.data;

  let images = [];
  try {
    const mediaRes = await API.get(`/media/product/${id}`);
    images = mediaRes.data;
  } catch (err) {
    console.warn("⚠️ Không thể load media:", err);
  }

  return {
    ...res,
    data: {
      ...productData,
      images,
    },
  };
};

export const createProduct = (data) => API.post("/products", data);
export const updateProduct = (id, data) => API.put(`/products/${id}`, data);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

// ======================
// 🖼️ Product Media APIs
// ======================

// Upload image (Cloudinary-backed)
export const uploadProductImage = (productId, formData, token) =>
  API.post(`/products/${productId}/media`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

// Delete image by media ID
export const deleteProductImage = (mediaId, token) =>
  API.delete(`/products/media/${mediaId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// Upload raw file to Cloudinary (used in ProductForm)
export const uploadFileToCloudinary = (formData, token) =>
  API.post("/media/upload-file", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

// ======================
// ⭐ Product Reviews
// ======================
export const submitReview = (productId, data, token) =>
  API.post(`/products/${productId}/reviews`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getReviews = (productId) =>
  API.get(`/products/${productId}/reviews`);

// Export instance for custom use
export { API };
