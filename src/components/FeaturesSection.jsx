import Logo from "../header/Logo";

export default function FeaturesSection() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo & Title */}
        <div className="flex flex-col items-center mb-12">
          <Logo />
          <h2 className="mt-6 text-3xl md:text-4xl font-extrabold text-gray-900 text-center">
            Vì sao chọn{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              ShopVN?
            </span>
          </h2>
          <p className="mt-3 text-lg text-gray-600 text-center max-w-2xl">
            Trải nghiệm mua sắm hiện đại, an toàn và tiện lợi với dịch vụ chuyên
            nghiệp.
          </p>
        </div>
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="text-center bg-white/80 rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 group">
            <div className="text-5xl mb-4 animate-bounce group-hover:scale-110 transition-transform">
              🚚
            </div>
            <h3 className="text-xl font-semibold mb-2 text-blue-700">
              Giao hàng nhanh
            </h3>
            <p className="text-gray-600">Miễn phí giao hàng cho đơn từ 500k</p>
          </div>
          <div className="text-center bg-white/80 rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 group">
            <div className="text-5xl mb-4 animate-pulse group-hover:scale-110 transition-transform">
              🔒
            </div>
            <h3 className="text-xl font-semibold mb-2 text-purple-700">
              Thanh toán an toàn
            </h3>
            <p className="text-gray-600">Bảo mật thông tin 100%</p>
          </div>
          <div className="text-center bg-white/80 rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 group">
            <div className="text-5xl mb-4 animate-spin-slow group-hover:scale-110 transition-transform">
              🎯
            </div>
            <h3 className="text-xl font-semibold mb-2 text-pink-700">
              Hỗ trợ 24/7
            </h3>
            <p className="text-gray-600">Luôn sẵn sàng hỗ trợ bạn</p>
          </div>
        </div>
      </div>
      {/* Custom slow spin animation */}
      <style>
        {`
          @keyframes spin-slow {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
          .animate-spin-slow {
            animation: spin-slow 3s linear infinite;
          }
        `}
      </style>
    </section>
  );
}
