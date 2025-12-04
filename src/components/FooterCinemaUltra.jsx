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

export default function FooterCinemaUltra() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(null);

  const nodes = [
    {
      id: "shop",
      title: "ChiChiLu Shop",
      desc: "Thương hiệu thời trang giá tốt – chất lượng cao.",
      icon: "🏬",
      x: "50%",
      y: "26%",
      depth: 130,
      radar: true,
      color: "#60a5fa",
    },
    {
      id: "policy1",
      title: "Bảo mật thông tin",
      desc: "Bảo vệ dữ liệu khách hàng.",
      icon: <ShieldCheck size={18} />,
      x: "18%",
      y: "56%",
      depth: 70,
      color: "#34d399",
    },
    {
      id: "policy2",
      title: "Chính sách đổi trả",
      desc: "Đổi trả trong 7 ngày.",
      icon: <Undo2 size={18} />,
      x: "32%",
      y: "80%",
      depth: 40,
      color: "#fbbf24",
    },
    {
      id: "policy3",
      title: "Chính sách vận chuyển",
      desc: "Giao hàng toàn quốc.",
      icon: <Truck size={18} />,
      x: "72%",
      y: "64%",
      depth: 70,
      color: "#fb7185",
    },
    {
      id: "policy4",
      title: "Phương thức thanh toán",
      desc: "Nhiều hình thức tiện lợi.",
      icon: <Wallet size={18} />,
      x: "84%",
      y: "36%",
      depth: 120,
      color: "#a78bfa",
    },
    {
      id: "phone",
      title: "Điện thoại",
      desc: "0123-456-789",
      icon: <Phone size={16} />,
      x: "10%",
      y: "30%",
      depth: 30,
      color: "#f472b6",
    },
    {
      id: "email",
      title: "Email hỗ trợ",
      desc: "support@chichilu.jp",
      icon: <Mail size={16} />,
      x: "42%",
      y: "10%",
      depth: 80,
      color: "#38bdf8",
    },
    {
      id: "address",
      title: "Địa chỉ",
      desc: "Tokyo, Japan",
      icon: <MapPin size={16} />,
      x: "92%",
      y: "78%",
      depth: 30,
      radar: true,
      color: "#fda4af",
    },
  ];

  const handleTilt = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    setTilt({ x, y });
  };

  return (
    <footer className="relative w-full bg-black pt-28 pb-16 mt-20 overflow-hidden text-white">
      {/* Nền gradient base */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050816] to-black opacity-80" />

      {/* City background rất mờ */}
      <div
        className="absolute inset-0 opacity-25 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/2407636/pexels-photo-2407636.jpeg?auto=compress&cs=tinysrgb&w=1600')",
          filter: "blur(6px)",
        }}
      />

      {/* HUD grid */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Mưa */}
      <div className="pointer-events-none absolute inset-0 opacity-35 mix-blend-screen">
        <div className="w-full h-full rain-layer" />
      </div>

      {/* Sét */}
      <div className="pointer-events-none absolute inset-0 lightning-flash" />

      <div className="relative max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-10 tracking-widest drop-shadow-[0_0_18px_rgba(96,165,250,0.9)]">
          🎬 ChiChiLu • CINEMA ULTRA MAP
        </h2>

        {/* MAP 3D */}
        <div
          className="relative w-full h-[460px] rounded-[34px] overflow-hidden border border-white/15 shadow-[0_0_40px_rgba(0,0,0,0.9)]"
          style={{ perspective: "1900px" }}
          onMouseMove={handleTilt}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        >
          <div
            className="absolute inset-0 scene-3d"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${tilt.y * 10}deg) rotateY(${tilt.x * 14}deg)`,
            }}
          >
            {/* Lớp drift camera (bay chậm) */}
            <div className="absolute inset-0 world-drift">
              {/* Fog thấp */}
              <div
                className="absolute inset-x-[-20%] bottom-[-20%] h-[70%] opacity-40"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 0%, rgba(148,163,184,0.5) 0, transparent 55%), radial-gradient(circle at 80% 0%, rgba(59,130,246,0.5) 0, transparent 60%)",
                  transform: "translateZ(-160px)",
                }}
              />

              {/* Wireframe 3D */}
              <div
                className="absolute inset-0 opacity-30 animate-wireframe"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
                  backgroundSize: "80px 80px",
                  transform: "translateZ(-180px)",
                }}
              />

              {/* Neon roads */}
              <svg
                className="absolute inset-0 w-full h-full opacity-95"
                style={{ transform: "translateZ(-90px)" }}
              >
                <defs>
                  <linearGradient id="neonUltra">
                    <stop offset="0%" stopColor="#4ade80" />
                    <stop offset="40%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>

                <path
                  d="M60 260 C250 80, 450 80, 780 260"
                  stroke="url(#neonUltra)"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray="16 20"
                />
                <path
                  d="M120 310 C260 140, 520 140, 860 310"
                  stroke="url(#neonUltra)"
                  strokeWidth="5"
                  fill="none"
                  strokeDasharray="14 18"
                />
              </svg>

              {/* Xe chính */}
              <div
                className="absolute text-4xl drop-shadow-[0_0_16px_white] animate-carUltra"
                style={{ transform: "translateZ(120px)" }}
              >
                🚗
              </div>

              {/* Xe phụ */}
              <div
                className="absolute text-3xl drop-shadow-[0_0_12px_rgba(56,189,248,1)] animate-bikeUltra"
                style={{ transform: "translateZ(80px)" }}
              >
                🛵
              </div>

              {/* Các node */}
              {nodes.map((n) => (
                <div
                  key={n.id}
                  className="absolute px-3 py-2 rounded-full bg-white/90 text-black text-[11px] shadow-xl cursor-pointer hover:scale-125 transition-transform"
                  style={{
                    left: n.x,
                    top: n.y,
                    transform: `translate(-50%, -50%) translateZ(${n.depth}px)`,
                  }}
                  onMouseEnter={() => setActive(n.id)}
                  onMouseLeave={() => setActive(null)}
                  onClick={() => setActive(n.id)}
                >
                  <div className="relative flex items-center justify-center">
                    {n.radar && (
                      <span
                        className="absolute inset-0 rounded-full animate-radarUltra opacity-40"
                        style={{ backgroundColor: n.color }}
                      />
                    )}
                    <span className="relative">{n.icon}</span>
                  </div>

                  {active === n.id && (
                    <div
                      className="absolute left-1/2 -top-24 -translate-x-1/2 px-4 py-2 rounded-lg bg-black/90 text-white text-[11px] shadow-2xl whitespace-nowrap animate-tooltipUltra"
                      style={{
                        transform: `translate(-50%, -100%) translateZ(${
                          n.depth + 40
                        }px)`,
                        border: `1px solid ${n.color}80`,
                      }}
                    >
                      <strong>{n.title}</strong>
                      <div className="opacity-80 mt-0.5">{n.desc}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center mt-10 text-sm opacity-75">
          © 2025 ChiChiLu Shop — Built with 🎥✨ by Minh Phuong
        </p>
      </div>

      {/* CSS thuần cho Cinema Ultra */}
      <style>{`
        .scene-3d {
          transition: transform 0.2s ease-out;
        }

        .world-drift {
          animation: worldDrift 24s ease-in-out infinite alternate;
          transform-style: preserve-3d;
        }

        @keyframes worldDrift {
          0% {
            transform: translate3d(0px, 0px, 0px);
          }
          50% {
            transform: translate3d(-20px, -8px, 0px);
          }
          100% {
            transform: translate3d(10px, 12px, 0px);
          }
        }

        @keyframes wireframe {
          0% { background-position: 0 0; }
          100% { background-position: 80px 80px; }
        }
        .animate-wireframe {
          animation: wireframe 16s linear infinite;
        }

        /* Xe chính chạy cinematic */
        @keyframes carUltra {
          0% { offset-distance: 0%; transform: translateZ(120px) rotateZ(0deg); }
          40% { transform: translateZ(120px) rotateZ(-10deg); }
          50% { transform: translateZ(120px) rotateZ(-3deg); }
          90% { transform: translateZ(120px) rotateZ(6deg); }
          100% { offset-distance: 100%; transform: translateZ(120px) rotateZ(0deg); }
        }
        .animate-carUltra {
          offset-path: path("M60 260 C250 80, 450 80, 780 260");
          animation: carUltra 14s ease-in-out infinite;
        }

        /* Xe phụ chạy lane dưới */
        @keyframes bikeUltra {
          0% { offset-distance: 100%; transform: translateZ(80px) rotateZ(4deg); }
          45% { transform: translateZ(80px) rotateZ(-6deg); }
          100% { offset-distance: 0%; transform: translateZ(80px) rotateZ(0deg); }
        }
        .animate-bikeUltra {
          offset-path: path("M120 310 C260 140, 520 140, 860 310");
          animation: bikeUltra 18s ease-in-out infinite;
        }

        /* Radar hologram */
        @keyframes radarUltra {
          0% { transform: scale(0.7); opacity: 0.7; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        .animate-radarUltra {
          animation: radarUltra 1.8s infinite ease-out;
        }

        /* Tooltip xuất hiện mượt */
        @keyframes tooltipUltra {
          from { opacity: 0; transform: translate(-50%, -60%) translateZ(40px); }
          to { opacity: 1; transform: translate(-50%, -100%) translateZ(60px); }
        }
        .animate-tooltipUltra {
          animation: tooltipUltra 0.22s ease-out;
        }

        /* Mưa – dùng linear-gradient tạo vệt */
        .rain-layer {
          width: 200%;
          height: 200%;
          background-image: linear-gradient(
            to bottom,
            rgba(255,255,255,0.35) 2px,
            transparent 2px
          );
          background-size: 2px 32px;
          transform: rotate(-10deg);
          animation: rainFall 1s linear infinite;
        }
        @keyframes rainFall {
          from { transform: translateY(-40px) rotate(-10deg); }
          to { transform: translateY(40px) rotate(-10deg); }
        }

        /* Sét – flash random */
        .lightning-flash {
          background: radial-gradient(circle at 20% 20%, rgba(255,255,255,0.25), transparent 55%),
                      radial-gradient(circle at 80% 10%, rgba(255,255,255,0.18), transparent 55%);
          mix-blend-mode: screen;
          animation: lightning 6s infinite;
        }
        @keyframes lightning {
          0%, 4%, 100% { opacity: 0; }
          5% { opacity: 0.8; }
          6% { opacity: 0; }
          20% { opacity: 0; }
          21% { opacity: 0.5; }
          22% { opacity: 0; }
        }
      `}</style>
    </footer>
  );
}
