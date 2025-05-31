
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function HeroContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-8"
    >
      {/* Main Heading */}
      <div className="space-y-4">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-black"
        >
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            ChiChiLu
          </span>
          <br />
          <span className="text-gray-900">Premium Store</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
        >
          Khám phá thế giới mua sắm đỉnh cao với những sản phẩm chất lượng premium. 
          Trải nghiệm mua sắm không giới hạn.
        </motion.p>
      </div>

      {/* CTA Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-6 justify-center items-center"
      >
        <Link
          to="/products"
          className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
        >
          <span className="relative z-10">🛍️ Mua sắm ngay</span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Link>
        
        <Link
          to="/products"
          className="group px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-800 text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl border-2 border-gray-200 hover:border-blue-300 transform hover:scale-105 transition-all duration-300"
        >
          <span className="group-hover:text-blue-600 transition-colors duration-300">
            📋 Xem catalog
          </span>
        </Link>
      </motion.div>
    </motion.div>
  );
}
