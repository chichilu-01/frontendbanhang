
import HeroSection from "../components/HeroSection";
import ProductsSection from "../components/ProductsSection";
import FeaturesSection from "../components/FeaturesSection";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <HeroSection />
      <ProductsSection />
      <FeaturesSection />
    </div>
  );
}
