import { useUniverse } from "../context/UniverseToggleContext";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { FaMoon } from "react-icons/fa";

export default function HeroSection() {
  const { enabled, toggleUniverse } = useUniverse();

  return (
    <div
      className={`relative overflow-hidden min-h-[90vh] flex flex-col justify-center ${
        enabled ? "galaxy-bg" : "bg-gradient-to-r from-blue-600 to-purple-700"
      } text-white`}
    >
      {/* Hiệu ứng vũ trụ nếu bật */}
      {enabled && (
        <>
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="shooting-star" />
            <div className="planet-orbit">
              <div className="planet" />
            </div>
          </div>
        </>
      )}

      {/* Overlay nền mờ để làm nổi text */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Nội dung chính */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text animate-fade-in">
          🛍️ Chào mừng đến ChiChiLu-Shop
        </h1>
        <p className="text-xl md:text-2xl mb-10 opacity-90">
          Khám phá những sản phẩm tuyệt vời với giá tốt nhất
        </p>

        {/* Nút bật/tắt Universe Mode */}
        <div className="flex items-center justify-center gap-4">
          <span className="text-base font-medium">
            {enabled ? "Universe Mode: ON" : "Universe Mode: OFF"}
          </span>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={enabled}
              onChange={toggleUniverse}
              className="sr-only peer"
            />
            <div className="w-14 h-8 bg-gray-300 rounded-full peer peer-checked:bg-purple-500 transition duration-300" />
            <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full peer-checked:translate-x-6 transition-transform duration-300 shadow" />
          </label>

          {enabled ? (
            <HiOutlineRocketLaunch
              className="text-yellow-300 animate-bounce"
              size={24}
            />
          ) : (
            <FaMoon className="text-white/70" size={20} />
          )}
        </div>
      </div>
    </div>
  );
}
