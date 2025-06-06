import axios from "axios";

const API = import.meta.env.VITE_API_URL + "/auth";

export const login = (email, password) =>
  axios.post(`${API}/login`, { email, password });

export const register = (data) => axios.post(`${API}/register`, data);

export const forgotPassword = (email) =>
  axios.post(`${API}/forgot-password`, { email });

export const verifyResetCode = (code) =>
  axios.post(`${API}/verify-reset-code`, { code });

export const resetPassword = (data) =>
  axios.post(`${API}/reset-password`, data);
