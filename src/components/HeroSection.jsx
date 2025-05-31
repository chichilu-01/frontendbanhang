import { useUniverse } from "../context/UniverseToggleContext";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { FaMoon } from "react-icons/fa";

export default function HeroSection() {
  const { enabled, toggleUniverse } = useUniverse();

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700 text-white">
      <div className="absolute inset-0 bg-black opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
          🛍️ Chào mừng đến Shop
        </h1>
        <p className="text-xl md:text-2xl mb-10 opacity-90">
          Khám phá những sản phẩm tuyệt vời với giá tốt nhất
        </p>

        {/* Toggle Switch */}
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
            <div className="w-14 h-8 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-400 rounded-full peer peer-checked:bg-purple-600 transition-all" />
            <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-6 shadow-md" />
          </label>

          {enabled ? (
            <HiOutlineRocketLaunch
              className="text-yellow-300 animate-bounce"
              size={24}
            />
          ) : (
            <FaMoon className="text-gray-300" size={20} />
          )}
        </div>
      </div>
    </div>
  );
}
