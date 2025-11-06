// src/utils/money.js
export const formatVND = (value, { symbol = "VND" } = {}) => {
  const num = Number(value) || 0;
  // Hiển thị 0 chữ số thập phân, có dấu chấm nghìn
  const formatted = new Intl.NumberFormat("vi-VN", {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(num);

  // Trả về "200.000 VND" hoặc "200.000 ₫" tuỳ symbol
  if (symbol === "₫") return `${formatted} ₫`;
  if (symbol === "none") return formatted;
  return `${formatted} ${symbol}`; // mặc định VND
};
