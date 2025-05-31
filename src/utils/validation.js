
// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
export const isValidPassword = (password) => {
  return password.length >= 6;
};

// Phone validation (Vietnamese format)
export const isValidPhone = (phone) => {
  const phoneRegex = /^(\+84|84|0)(3|5|7|8|9)[0-9]{8}$/;
  return phoneRegex.test(phone);
};

// Required field validation
export const isRequired = (value) => {
  return value && value.toString().trim().length > 0;
};

// Number validation
export const isValidNumber = (value) => {
  return !isNaN(value) && isFinite(value);
};

// Positive number validation
export const isPositiveNumber = (value) => {
  return isValidNumber(value) && parseFloat(value) > 0;
};

// File size validation (in MB)
export const isValidFileSize = (file, maxSizeMB = 5) => {
  return file.size <= maxSizeMB * 1024 * 1024;
};

// Image file validation
export const isImageFile = (file) => {
  return file.type.startsWith('image/');
};

// Video file validation
export const isVideoFile = (file) => {
  return file.type.startsWith('video/');
};
