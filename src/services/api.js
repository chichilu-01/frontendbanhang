import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  withCredentials: true,
});
console.log("API URL:", import.meta.env.VITE_API_URL);

export const getProducts = () => API.get("/products");
export const getProductById = (id) => API.get(`/products/${id}`);
export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);
export const verifyEmailCode = (data) => API.post("/auth/verify-code", data);
export const sendForgotPasswordCode = (data) => API.post("/auth/forgot-password", data);
export const verifyResetCode = (data) => API.post("/auth/verify-reset-code", data);
export const updateProduct = (id, data) => API.put(`/products/${id}`, data);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const createProduct = (data) => API.post("/products", data);

/*Tạo hàm getProducts() dùng axios gọi API /products từ backend.*/
