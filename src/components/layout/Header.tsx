import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import WhatsAppButton from "../ui/WhatsAppButton";
import SideDrawer from "./SideDrawer";
import { BRAND } from "../../config/brand";
import { cn } from "@/lib/utils";
import { DESIGN_TOKENS } from "@/config/design-tokens";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cierra el drawer automáticamente cuando cambia la ruta/hash
  useEffect(() => {
    if (!drawerOpen) return;
    setDrawerOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.hash]);

  const navLinkBase = "hover:text-white";
  const navLinkActive = "text-white";

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
        <div className="flex items-center gap-3">
          {/* Botón hamburguesa (mobile) */}
          <button
            type="button"
            className={cn(
              "md:hidden inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold ring-1 ring-white/10 hover:bg-white/5",
              DESIGN_TOKENS.transition.normal
            )}
            aria-label="Abrir menú"
            aria-controls="t360-drawer"
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen(true)}
          >
            ☰
          </button>

          <Link
            to="/"
            className={cn(
              "flex items-center gap-3",
              DESIGN_TOKENS.transition.normal,
              isScrolled && "scale-[0.98]"
            )}
            aria-label={`${BRAND.name} — Ir al inicio`}
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
          </Link>
        </div>

        {/* Desktop nav: mantiene anclas de Home y agrega ruta Tracking */}
        <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
          <Link className={navLinkBase} to="/#como-funciona">
            Cómo funciona
          </Link>
          <Link className={navLinkBase} to="/#beneficios">
            Beneficios
          </Link>
          <Link className={navLinkBase} to="/#faq">
            FAQ
          </Link>

          <span className="h-4 w-px bg-white/10" aria-hidden="true" />

          <NavLink
            to="/tracking"
            className={({ isActive }) =>
              cn(navLinkBase, isActive && navLinkActive)
            }
          >
            Seguimiento 360
          </NavLink>
        </nav>

        {/* CTA: visible también en mobile para conversión */}
        <div className="flex items-center gap-3">
          {/* En mobile ya tienes el drawer; evitamos duplicar botones */}
          <WhatsAppButton
            label={isScrolled ? "WhatsApp" : "Hablar por WhatsApp"}
            variant={isScrolled ? "primary" : "secondary"}
            intent="diagnostico"
          />
        </div>
      </div>

      {/* Drawer mobile */}
      <div id="t360-drawer">
        <SideDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      </div>
    </header>
  );
}
