import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-20">
      {/* 🔥 Animated Gradient Border */}
      <div className="absolute inset-0 rounded-t-3xl border-t-[4px] animate-gradient-border"></div>

      {/* 🔥 Particle floating layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="particle"></div>
        <div className="particle delay-3000"></div>
        <div className="particle delay-6000"></div>
      </div>

      {/* 🔥 Glass container */}
      <div
        className="
          relative bg-white/40 backdrop-blur-2xl 
          border-t border-white/30 
          shadow-[0_8px_30px_rgba(0,0,0,0.15)]
          bg-[url('/bg-login.jpg')]
          bg-cover bg-center
          rounded-t-3xl
        "
      >
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-28 md:pb-12 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* BRAND */}
          <div>
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow">
              ChiChiLu Shop
            </h2>
            <p className="mt-3 text-gray-700 font-medium">
              Thương hiệu thời trang giá tốt – chất lượng cao.
            </p>

            {/* SOCIAL */}
            <div className="flex gap-3 mt-5">
              <SocialIcon href="https://facebook.com">
                <Facebook size={20} />
              </SocialIcon>

              <SocialIcon href="https://instagram.com">
                <Instagram size={20} />
              </SocialIcon>
            </div>
          </div>

          {/* POLICIES */}
          <div>
            <h3 className="footer-title">Chính sách</h3>
            <ul className="space-y-2 text-gray-700 font-medium">
              <FooterLink href="/policy/privacy">
                🔒 Bảo mật thông tin
              </FooterLink>
              <FooterLink href="/policy/return">
                📦 Chính sách đổi trả
              </FooterLink>
              <FooterLink href="/policy/shipping">
                🚚 Chính sách vận chuyển
              </FooterLink>
              <FooterLink href="/policy/payment">
                💳 Phương thức thanh toán
              </FooterLink>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="footer-title">Liên hệ</h3>

            <div className="space-y-3 text-gray-700 font-medium">
              <ContactItem
                icon={<Phone size={18} />}
                text="0123-456-789"
                href="tel:0123456789"
              />
              <ContactItem
                icon={<Mail size={18} />}
                text="support@chichilu.jp"
                href="mailto:support@chichilu.jp"
              />
              <ContactItem
                icon={<MapPin size={18} />}
                text="Tokyo, Japan"
                href="https://maps.app.goo.gl/uV9eS5Wy5A3s"
              />
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="relative text-center text-gray-600 text-sm pb-24 md:pb-6">
          © 2025 ChiChiLu Shop — Built with ❤️ by Minh Phuong
        </div>
      </div>
    </footer>
  );
}

/* COMPONENTS */
function SocialIcon({ children, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        w-10 h-10 flex items-center justify-center 
        rounded-2xl bg-white/40 backdrop-blur-lg
        border border-white/40 shadow-lg 
        hover:bg-purple-600 hover:text-white hover:scale-110 
        transition duration-300
      "
    >
      {children}
    </a>
  );
}

function FooterLink({ href, children }) {
  return (
    <li>
      <a href={href} className="footer-link">
        {children}
      </a>
    </li>
  );
}

function ContactItem({ icon, text, href }) {
  return (
    <p className="flex items-center gap-2">
      {icon}
      <a href={href} className="footer-link">
        {text}
      </a>
    </p>
  );
}
