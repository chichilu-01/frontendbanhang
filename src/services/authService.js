import { API } from "@services/api";

// 🔐 Đăng nhập
export const login = (email, password) =>
  API.post("/auth/login", { email, password });

// 🔐 Đăng ký
export const register = (data) => API.post("/auth/register", data);

// 🔐 Quên mật khẩu
export const forgotPassword = (email) =>
  API.post("/auth/forgot-password", { email });

// 🔐 Xác minh mã đặt lại mật khẩu
export const verifyResetCode = (code) =>
  API.post("/auth/verify-reset-code", { code });

// 🔐 Đặt lại mật khẩu mới
export const resetPassword = (data) => API.post("/auth/reset-password", data);

export const verifyEmailCode = (data) => API.post("/auth/verify-code", data);

// 🔐 Đăng xuất
export const logout = (token) =>
  API.post("/auth/logout", null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// 👤 Lấy thông tin người dùng
export const getProfile = (token) =>
  API.get("/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
