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
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>

        {/* POLICIES */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Chính sách</h3>
          <ul className="mt-3 space-y-2 text-gray-600">
            <li>
              <a href="/policy/privacy" className="hover:text-blue-600">
                🔒 Bảo mật thông tin
              </a>
            </li>
            <li>
              <a href="/policy/return" className="hover:text-blue-600">
                📦 Chính sách đổi trả
              </a>
            </li>
            <li>
              <a href="/policy/shipping" className="hover:text-blue-600">
                🚚 Chính sách vận chuyển
              </a>
            </li>
            <li>
              <a href="/policy/payment" className="hover:text-blue-600">
                💳 Phương thức thanh toán
              </a>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Liên hệ</h3>

          <div className="mt-3 space-y-3 text-gray-600">
            <p className="flex items-center gap-2">
              <Phone size={18} />
              <a href="tel:08058264308" className="hover:text-blue-600">
                0123-456-789
              </a>
            </p>

            <p className="flex items-center gap-2">
              <Mail size={18} />
              <a
                href="mailto:hoangminhphuong270401@gmail.com"
                className="hover:text-blue-600"
              >
                support@chichilu.jp
              </a>
            </p>

            <p className="flex items-center gap-2">
              <MapPin size={18} />
              <a
                href="https://www.google.com/maps/place/Nishi-Kawaguchi+Station/@35.8155416,139.7019305,17z/data=!4m10!1m2!2m1!1snishi-kawaguchi+station!3m6!1s0x601894a4e4fc1965:0x85fa8b0a2ecdee76!8m2!3d35.8155374!4d139.7043642!15sChduaXNoaS1rYXdhZ3VjaGkgc3RhdGlvbpIBF2xvZ2ljYWxfdHJhbnNpdF9zdGF0aW9u4AEA!16s%2Fm%2F03c7kyg?entry=ttu&g_ep=EgoyMDI1MTEzMC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600"
              >
                Tokyo, Japan
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="text-center mt-10 text-gray-500 text-sm pb-22 md:pb-0">
        © 2025 ChiChiLu Shop — Built with ❤️ by Minh Phuong
      </div>
    </footer>
  );
}
