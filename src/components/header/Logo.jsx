import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link
      to="/"
      aria-label="ShopVN - Premium Store"
      className="group relative flex items-center gap-3 transition-transform duration-300 hover:scale-110"
    >
      {/* Logo Icon */}
      <div className="relative">
        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:rotate-6">
          <span className="text-white text-xl lg:text-2xl font-bold transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">🛍️</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-all duration-300 animate-pulse"></div>
      </div>

      {/* Logo Text */}
      <div className="flex flex-col">
        <h1 className="text-xl lg:text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:bg-gradient-to-l group-hover:from-pink-600 group-hover:via-purple-600 group-hover:to-blue-600 transition-all duration-700">
          ShopVN
        </h1>
        <span className="text-xs text-gray-500 font-medium -mt-1 group-hover:text-pink-500 transition-colors duration-300">
          Premium Store
        </span>
      </div>
    </Link>
  );
}