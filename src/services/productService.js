import { API } from "@services/api";

export const getProducts = () => API.get("/products");

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
    console.warn("⚠️ Lỗi parse images:", err);
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
