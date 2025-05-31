
import { CURRENCY_LOCALE, CURRENCY } from "./constants";

// Format currency
export const formatCurrency = (amount) => {
  return `${Math.floor(amount).toLocaleString(CURRENCY_LOCALE)} ${CURRENCY}`;
};

// Transform Cloudinary URL
export const transformCloudinaryURL = (url, width = 400, height = 400) => {
  return url.replace(
    "/upload/",
    `/upload/w_${width},h_${height},c_fill,f_auto,q_auto/`
  );
};

// Show notification
export const showNotification = (message, type = "success") => {
  const notification = document.createElement("div");
  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";
  
  notification.className = `fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-out`;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    if (document.body.contains(notification)) {
      document.body.removeChild(notification);
    }
  }, 3000);
};

// Truncate text
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

// Generate user avatar initials
export const getUserInitials = (name) => {
  if (!name) return "U";
  return name.charAt(0).toUpperCase();
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
