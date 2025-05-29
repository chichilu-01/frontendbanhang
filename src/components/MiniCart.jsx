import { useMiniCart } from "../context/MiniCartContext";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function MiniCart() {
  const { isOpen, closeMiniCart } = useMiniCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.4 }}
          className="fixed top-0 right-0 w-80 h-full bg-white dark:bg-gray-900 shadow-lg z-[60] flex flex-col"
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className="text-lg font-semibold">🛒 Giỏ hàng</h3>
            <button
              onClick={closeMiniCart}
              className="text-gray-600 dark:text-gray-300 hover:text-red-500"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 p-4 text-gray-700 dark:text-gray-100">
            <p>✅ Sản phẩm đã được thêm!</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Bạn có thể vào giỏ hàng để kiểm tra hoặc thanh toán.
            </p>
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <Link
              to="/cart"
              onClick={closeMiniCart}
              className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
            >
              🧾 Xem giỏ hàng
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
