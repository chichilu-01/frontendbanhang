import axios from "axios";

// ======================
// 🌐 API Base Configuration
// ======================
export const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://backendbanhang-production.up.railway.app/api",
  withCredentials: true,
  timeout: 15000,
});

if (!import.meta.env.VITE_API_URL) {
  console.warn(
    "⚠️ VITE_API_URL is not set, using fallback hardcoded backend URL",
  );
}

console.log(
  "🌍 Using API URL:",
  import.meta.env.VITE_API_URL || "fallback used",
);

// ======================
// 🔐 AUTH APIs
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
// 📦 PRODUCT APIs
// ======================
export const getProducts = async () => {
  const res = await API.get("/products");

  // 🖼️ Gắn thêm ảnh (media) vào từng sản phẩm
  const products = await Promise.all(
    res.data.map(async (product) => {
      try {
        const mediaRes = await API.get(`/media/product/${product.id}`);
        return { ...product, media: mediaRes.data || [] };
      } catch (error) {
        console.warn(`⚠️ Không thể tải ảnh cho sản phẩm ID ${product.id}`);
        return { ...product, media: [] };
      }
    }),
  );

  return { ...res, data: products };
};

export const getProductById = async (id) => {
  const res = await API.get(`/products/${id}`);
  const productData = res.data;

  try {
    const mediaRes = await API.get(`/media/product/${id}`);
    return {
      ...res,
      data: {
        ...productData,
        media: mediaRes.data || [],
      },
    };
  } catch (err) {
    console.warn("⚠️ Không thể load media:", err);
    return {
      ...res,
      data: { ...productData, media: [] },
    };
  }
};

export const createProduct = (data, token) =>
  API.post("/products", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateProduct = (id, data, token) =>
  API.put(`/products/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteProduct = (id) => API.delete(`/products/${id}`);

// ======================
// 🖼️ MEDIA APIs
// ======================
export const createMedia = (data, token) =>
  API.post("/media", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Upload file trực tiếp lên Cloudinary
export const uploadFileToCloudinary = (formData, token) =>
  API.post("/media/upload-file", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

// Upload ảnh liên kết sản phẩm
export const uploadProductImage = (productId, formData, token) =>
  API.post(`/products/${productId}/media`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

// Xoá ảnh theo ID
export const deleteProductImage = (mediaId, token) =>
  API.delete(`/media/${mediaId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
// ✅ Đặt ảnh chính
export const setMainImage = (mediaId, token) =>
  API.patch(`/media/${mediaId}/set-main`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });

// ✅ Lưu thứ tự ảnh (drag & drop)
export const reorderMedia = (productId, mediaIds, token) =>
  API.patch(
    "/media/reorder",
    { product_id: productId, media_ids: mediaIds },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

// ======================
// ⭐ REVIEWS APIs
// ======================
export const getReviews = (productId) =>
  API.get(`/products/${productId}/reviews`);
export const submitReview = (productId, data, token) =>
  API.post(`/products/${productId}/reviews`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

// ======================
// 🛒 ORDER / CHECKOUT (Chuẩn bị cho bước gửi email)
// ======================
export const createOrder = (data) => API.post("/orders", data);
export const sendOrderEmail = (data) => API.post("/orders/send-email", data);

// ✅ Export instance (cho phép gọi API tùy chỉnh khác)
export default API;
