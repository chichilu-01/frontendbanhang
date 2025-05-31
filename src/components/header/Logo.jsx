
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="flex items-center space-x-3 group">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300">
          <span className="text-white text-2xl font-bold">🛍️</span>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          ChiChiLu-Shop
        </span>
        <span className="text-xs text-gray-500 font-medium tracking-widest uppercase">
          Premium Store
        </span>
      </div>
    </Link>
  );
}
