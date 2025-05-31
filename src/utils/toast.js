// src/utils/toast.js

export const showToast = (message, type = "success") => {
  // Xoá toast cũ nếu có
  document.querySelectorAll(".custom-toast").forEach((el) => el.remove());

  // Tạo element toast
  const toast = document.createElement("div");
  toast.className = `
    custom-toast fixed top-5 right-5 w-fit max-w-xs 
    px-4 py-3 rounded-xl shadow-lg z-[9999]
    flex items-center justify-between gap-3
    text-white text-sm transition-all duration-300 ease-in-out
    transform translate-x-full opacity-0
    ${type === "success" ? "bg-green-600" : type === "error" ? "bg-red-600" : "bg-blue-600"}
  `;
  toast.innerHTML = `
    <span class="flex-1">${type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️"} ${message}</span>
    <button class="text-lg ml-2 hover:opacity-70" aria-label="Đóng toast">&times;</button>
  `;

  // Thêm vào DOM
  document.body.appendChild(toast);

  // 👉 Hàm xoá toast với animation ẩn
  const remove = () => {
    toast.classList.add("translate-x-full", "opacity-0");
    setTimeout(() => toast.remove(), 300);
  };

  // 👉 Hiển thị toast (sau animation delay ngắn)
  setTimeout(() => {
    toast.classList.remove("translate-x-full", "opacity-0");
    toast.classList.add("translate-x-0", "opacity-100");
  }, 50);

  // 👉 Tự tắt sau 4s
  const timer = setTimeout(remove, 4000);

  // 👉 Cho phép tắt khi bấm nút
  toast.querySelector("button").addEventListener("click", () => {
    clearTimeout(timer);
    remove();
  });
};
