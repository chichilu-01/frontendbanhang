// src/utils/toast.js
export const showToast = (message, type = "success") => {
  document.querySelectorAll(".custom-toast").forEach((el) => el.remove());

  const toast = document.createElement("div");
  toast.className = `
    custom-toast fixed top-5 right-5 max-w-xs w-full 
    px-4 py-3 rounded-lg shadow-lg z-[9999] 
    flex items-center justify-between gap-3 
    text-white text-sm transition-transform transform 
    translate-x-full opacity-0
    ${type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : "bg-blue-500"}
  `;
  toast.innerHTML = `
    <span class="flex-1">${type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️"} ${message}</span>
    <button class="text-lg ml-2 hover:opacity-70" aria-label="Close">&times;</button>
  `;

  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.remove("translate-x-full", "opacity-0");
    toast.classList.add("translate-x-0", "opacity-100");
  }, 50);

  const timer = setTimeout(remove, 4000);
  const remove = () => {
    toast.classList.add("translate-x-full", "opacity-0");
    setTimeout(() => toast.remove(), 300);
  };

  toast.querySelector("button").addEventListener("click", () => {
    clearTimeout(timer);
    remove();
  });
};
