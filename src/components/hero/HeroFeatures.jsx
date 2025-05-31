
import { motion } from "framer-motion";

export default function HeroFeatures() {
  const features = [
    {
      icon: "🚚",
      title: "Giao hàng nhanh",
      description: "Miễn phí ship cho đơn hàng trên 500k",
      hoverColor: "hover:border-blue-300"
    },
    {
      icon: "⭐",
      title: "Chất lượng cao",
      description: "Cam kết sản phẩm chính hãng 100%",
      hoverColor: "hover:border-purple-300"
    },
    {
      icon: "🔒",
      title: "Thanh toán an toàn",
      description: "Bảo mật thông tin tuyệt đối",
      hoverColor: "hover:border-pink-300"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto"
    >
      {features.map((feature, index) => (
        <div 
          key={index}
          className={`group bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 ${feature.hoverColor}`}
        >
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
            {feature.icon}
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
          <p className="text-gray-600">{feature.description}</p>
        </div>
      ))}
    </motion.div>
  );
}
