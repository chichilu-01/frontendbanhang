export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700 text-white">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            🛍️ Chào mừng đến Shop
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Khám phá những sản phẩm tuyệt vời với giá tốt nhất
          </p>
        </div>
      </div>
    </div>
  );
}
