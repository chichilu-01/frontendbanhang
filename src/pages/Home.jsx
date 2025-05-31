import HeroSection from "../components/HeroSection";
import ProductsSection from "../components/ProductsSection";
import FeaturesSection from "../components/FeaturesSection";
import UniverseSection from "./UniverseSection"; // 👈 Thêm dòng này

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 🌌 Nền vũ trụ động */}
      <div className="absolute inset-0 -z-10">
        <UniverseSection />
      </div>

      {/* 👇 Nội dung chính */}
      <div className="relative z-10 backdrop-blur-sm bg-white/60 dark:bg-black/40">
        <HeroSection />
        <ProductsSection />
        <FeaturesSection />
      </div>
    </div>
  );
}
