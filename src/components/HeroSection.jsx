import HeroBackground from "./hero/HeroBackground";
import HeroContent from "./hero/HeroContent";
import HeroFeatures from "./hero/HeroFeatures";
import ScrollIndicator from "./hero/ScrollIndicator";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <HeroBackground />

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <HeroContent />
        <HeroFeatures />
      </div>

      <ScrollIndicator />
    </section>
  );
}