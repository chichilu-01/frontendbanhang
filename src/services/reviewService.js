import { API } from "./api";

export const getReviews = (productId) =>
  API.get(`/products/${productId}/reviews`);

export const submitReview = (productId, data, token) =>
  API.post(`/products/${productId}/reviews`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
