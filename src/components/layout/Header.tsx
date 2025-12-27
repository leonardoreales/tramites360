import { useEffect, useState } from "react";
import WhatsAppButton from "../ui/WhatsAppButton";
import { BRAND } from "../../config/brand";
import { cn } from "@/lib/utils";
import { DESIGN_TOKENS } from "@/config/design-tokens";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b backdrop-blur",
        DESIGN_TOKENS.transition.normal,
        isScrolled
          ? cn(
              "bg-slate-950/95",
              "border-white/15",
              "shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_18px_50px_rgba(0,0,0,0.55)]"
            )
          : cn("bg-slate-950/50", "border-white/10")
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between px-6",
          DESIGN_TOKENS.transition.normal,
          isScrolled ? "py-3" : "py-4"
        )}
      >
        <a
          href="#"
          className={cn(
            "flex items-center gap-3",
            DESIGN_TOKENS.transition.normal,
            isScrolled && "scale-[0.98]"
          )}
        >
          <div
            className={cn(
              "grid place-items-center bg-white/5 ring-1 ring-white/10",
              DESIGN_TOKENS.radius.sm,
              DESIGN_TOKENS.transition.normal,
              isScrolled ? "h-8 w-8" : "h-9 w-9"
            )}
          >
            <span className="text-sm font-black">360</span>
          </div>

          <div className="leading-tight">
            <div className="font-black tracking-tight">{BRAND.name}</div>
            <div className="text-xs text-white/60">{BRAND.tagline}</div>
          </div>
        </a>

        <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
          <a className="hover:text-white" href="#como-funciona">
            Cómo funciona
          </a>
          <a className="hover:text-white" href="#beneficios">
            Beneficios
          </a>
          <a className="hover:text-white" href="#faq">
            FAQ
          </a>
        </nav>

        {/* CTA: visible también en mobile para conversión */}
        <div className="block">
          <WhatsAppButton
            label={isScrolled ? "WhatsApp" : "Hablar por WhatsApp"}
            variant={isScrolled ? "primary" : "secondary"}
            intent="diagnostico"
          />
        </div>
      </div>
    </header>
  );
}
