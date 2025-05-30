export default function FeaturesSection() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-xl font-semibold mb-2">Giao hàng nhanh</h3>
            <p className="text-gray-600">Miễn phí giao hàng cho đơn từ 500k</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold mb-2">Thanh toán an toàn</h3>
            <p className="text-gray-600">Bảo mật thông tin 100%</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">Hỗ trợ 24/7</h3>
            <p className="text-gray-600">Luôn sẵn sàng hỗ trợ bạn</p>
          </div>
        </div>
      </div>
    </div>
  );
}
