
export const showToast = (message, type = 'success') => {
  // Xóa toast cũ nếu có
  const existingToast = document.querySelector('.toast-notification');
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement('div');
  toast.className = `toast-notification fixed top-4 right-4 px-6 py-4 rounded-xl shadow-lg z-50 transform transition-all duration-300 ease-in-out translate-x-full ${
    type === 'success' 
      ? 'bg-green-500 text-white' 
      : type === 'error' 
        ? 'bg-red-500 text-white'
        : 'bg-blue-500 text-white'
  }`;
  
  toast.innerHTML = `
    <div class="flex items-center gap-3">
      <span class="text-lg">
        ${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
      </span>
      <span class="font-semibold">${message}</span>
      <button onclick="this.parentElement.parentElement.remove()" class="ml-2 text-lg hover:opacity-70">
        ×
      </button>
    </div>
  `;

  document.body.appendChild(toast);

  // Animate in
  setTimeout(() => {
    toast.classList.remove('translate-x-full');
    toast.classList.add('translate-x-0');
  }, 100);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (document.body.contains(toast)) {
      toast.classList.add('translate-x-full');
      setTimeout(() => toast.remove(), 300);
    }
  }, 5000);
};

export default { showToast };
