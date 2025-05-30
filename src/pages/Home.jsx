import HeroSection from "../components/HeroSection";
import ProductsSection from "../components/ProductsSection";
import FeaturesSection from "../components/FeaturesSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <HeroSection />
      <ProductsSection />
      <FeaturesSection />
    </div>
  );
}
