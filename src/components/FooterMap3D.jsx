import { useState } from "react";
import {
  ShieldCheck,
  Undo2,
  Truck,
  Wallet,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function FooterMap3D() {
  const [active, setActive] = useState(null);
  const [tilt, setTilt] = useState({ x: 8, y: -8 }); // default hơi nghiêng

  const nodes = [
    {
      id: "shop",
      title: "ChiChiLu Shop",
      desc: "Thương hiệu thời trang giá tốt – chất lượng cao.",
      icon: "🏬",
      x: "50%",
      y: "20%",
      radar: true,
      layer: 3,
    },
    {
      id: "policy1",
      title: "🔒 Bảo mật thông tin",
      desc: "Bảo vệ dữ liệu khách hàng.",
      icon: <ShieldCheck size={18} />,
      x: "16%",
      y: "55%",
      layer: 2,
    },
    {
      id: "policy2",
      title: "📦 Chính sách đổi trả",
      desc: "Đổi trả trong 7 ngày.",
      icon: <Undo2 size={18} />,
      x: "32%",
      y: "78%",
      layer: 1,
    },
    {
      id: "policy3",
      title: "🚚 Vận chuyển",
      desc: "Giao hàng toàn quốc.",
      icon: <Truck size={18} />,
      x: "70%",
      y: "63%",
      layer: 2,
    },
    {
      id: "policy4",
      title: "💳 Thanh toán",
      desc: "Nhiều hình thức tiện lợi.",
      icon: <Wallet size={18} />,
      x: "84%",
      y: "38%",
      layer: 3,
    },
    {
      id: "phone",
      title: "Điện thoại",
      desc: "0123-456-789",
      icon: <Phone size={18} />,
      x: "10%",
      y: "30%",
      layer: 1,
    },
    {
      id: "email",
      title: "Email hỗ trợ",
      desc: "support@chichilu.jp",
      icon: <Mail size={18} />,
      x: "40%",
      y: "10%",
      layer: 2,
    },
    {
      id: "address",
      title: "Địa chỉ",
      desc: "Tokyo, Japan",
      icon: <MapPin size={18} />,
      x: "92%",
      y: "78%",
      radar: true,
      layer: 1,
    },
  ];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0 -> 1
    const y = (e.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * 18; // -9 -> 9
    const rotateX = (0.5 - y) * 18; // -9 -> 9

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 8, y: -8 }); // về lại góc mặc định
  };

  return (
    <footer className="relative w-full mt-20 bg-gray-950 text-white pt-24 pb-12 overflow-hidden">
      {/* Background xa xa */}
      <div
        className="absolute inset-0 opacity-25 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/2407636/pexels-photo-2407636.jpeg?auto=compress&cs=tinysrgb&w=1600')",
          filter: "blur(4px)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">
          ChiChiLu • 3D Delivery Map
        </h2>

        {/* Hộp map 3D */}
        <div
          className="
            relative w-full h-[380px] rounded-[32px]
            border border-white/15 
            bg-gradient-to-br from-blue-900/30 via-slate-900/70 to-purple-900/40
            shadow-[0_25px_80px_rgba(0,0,0,0.75)]
            overflow-hidden
            cursor-pointer
          "
          style={{
            perspective: "1400px",
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Lớp chứa 3D */}
          <div
            className="absolute inset-0"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`,
              transition: "transform 0.18s ease-out",
            }}
          >
            {/* Layer 1: city lights phía dưới */}
            <div
              className="absolute inset-x-[-20%] bottom-[-10%] h-[55%] opacity-60"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 0%, rgba(255,255,255,0.35) 0, transparent 55%), radial-gradient(circle at 80% 0%, rgba(255,200,200,0.4) 0, transparent 60%)",
                transform: "translateZ(-80px)",
              }}
            />

            {/* Đường đi + ánh sáng */}
            <svg
              className="absolute inset-0 w-full h-full opacity-70"
              style={{ transform: "translateZ(-40px)" }}
            >
              <defs>
                <linearGradient id="roadGlow" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#4ade80" />
                  <stop offset="50%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>

              <path
                d="M40 240 C200 80, 420 80, 760 240"
                stroke="url(#roadGlow)"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="10 14"
              />
              <path
                d="M120 290 C260 140, 520 140, 860 290"
                stroke="url(#roadGlow)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="8 12"
              />
            </svg>

            {/* Xe chạy theo đường – layer cao */}
            <div
              className="absolute text-2xl drop-shadow-[0_0_12px_rgba(250,250,250,0.9)] animate-car3d"
              style={{
                transform: "translateZ(40px)",
              }}
            >
              🚗
            </div>

            {/* Node / điểm trên map */}
            {nodes.map((node) => (
              <div
                key={node.id}
                className={`
                  absolute px-3 py-2 rounded-full bg-white/90 text-black shadow-xl 
                  cursor-pointer flex items-center gap-1 text-xs
                  hover:scale-125 transition-all duration-300
                `}
                style={{
                  left: node.x,
                  top: node.y,
                  transform: `translate(-50%, -50%) translateZ(${
                    node.layer * 40
                  }px)`,
                }}
                onMouseEnter={() => setActive(node.id)}
                onMouseLeave={() => setActive(null)}
                onClick={() => setActive(node.id)}
              >
                <div className="relative flex items-center gap-1">
                  {/* Radar nếu có */}
                  {node.radar && (
                    <span className="absolute inset-0 -z-10 rounded-full bg-blue-400/40 animate-radar3d"></span>
                  )}
                  <span>{node.icon}</span>
                </div>

                {/* Tooltip */}
                {active === node.id && (
                  <div
                    className="
                      absolute left-1/2 -top-20 -translate-x-1/2 
                      bg-black/85 text-white px-4 py-2 rounded-lg text-xs 
                      shadow-2xl whitespace-nowrap animate-tooltipIn
                    "
                    style={{
                      transform: "translate(-50%, -100%) translateZ(60px)",
                    }}
                  >
                    <strong>{node.title}</strong>
                    <div className="opacity-80 mt-0.5">{node.desc}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Text dưới map */}
        <p className="text-center text-sm mt-8 opacity-80">
          © 2025 ChiChiLu Shop — Built with ❤️ by Minh Phuong
        </p>
      </div>

      {/* CSS cho animation 3D */}
      <style>{`
        @keyframes radar3d {
          0% { transform: scale(0.8); opacity: 0.7; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .animate-radar3d {
          animation: radar3d 1.7s infinite ease-out;
        }

        @keyframes car3d {
          0%   { offset-distance: 0%; }
          100% { offset-distance: 100%; }
        }
        .animate-car3d {
          offset-path: path("M40 240 C200 80, 420 80, 760 240");
          animation: car3d 10s linear infinite;
        }

        @keyframes tooltipIn {
          from { opacity: 0; transform: translate(-50%, -70%) translateZ(40px); }
          to   { opacity: 1; transform: translate(-50%, -100%) translateZ(60px); }
        }
        .animate-tooltipIn {
          animation: tooltipIn 0.2s ease-out;
        }
      `}</style>
    </footer>
  );
}
