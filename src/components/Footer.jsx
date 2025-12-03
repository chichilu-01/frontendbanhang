import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 bg-gradient-to-b from-white to-gray-100 pt-14 pb-10 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600">ChiChiLu Shop</h2>
          <p className="mt-2 text-gray-600">
            Thương hiệu thời trang giá tốt – chất lượng cao.
          </p>

          {/* SOCIAL */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="footer-icon">
              <Facebook size={20} />
            </a>
            <a href="#" className="footer-icon">
              <Instagram size={20} />
            </a>
          </div>
        </div>

        {/* POLICIES */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Chính sách</h3>
          <ul className="mt-3 space-y-2 text-gray-600">
            <li>🔒 Bảo mật thông tin</li>
            <li>📦 Chính sách đổi trả</li>
            <li>🚚 Chính sách vận chuyển</li>
            <li>💳 Phương thức thanh toán</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Liên hệ</h3>

          <div className="mt-3 space-y-3 text-gray-600">
            <p className="flex items-center gap-2">
              <Phone size={18} /> 0123-456-789
            </p>
            <p className="flex items-center gap-2">
              <Mail size={18} /> support@chichilu.jp
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={18} /> Tokyo, Japan
            </p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center mt-10 text-gray-500 text-sm">
        © 2025 ChiChiLu Shop — Built with ❤️ by Minh Phuong
      </div>
    </footer>
  );
}
