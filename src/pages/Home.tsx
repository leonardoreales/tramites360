import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/sections/HeroSection";
import BenefitsSection from "../components/sections/BenefitsSection";
import FaqSection from "../components/sections/FaqSection";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* Ambient background (pro, vanguardista) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-40 right-[-120px] h-[520px] w-[520px] rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent" />
      </div>

      {/* Layout */}
      <div className="relative z-10">
        <Header />

        <main>
          <HeroSection />
          <BenefitsSection />
          <FaqSection />
        </main>

        <Footer />
      </div>
    </div>
  );
}
