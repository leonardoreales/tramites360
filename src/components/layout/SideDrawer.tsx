import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";
import { DESIGN_TOKENS } from "@/config/design-tokens";
import { BRAND } from "@/config/brand";

type SideDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function SideDrawer({ open, onClose }: SideDrawerProps) {
  // ESC para cerrar
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // Bloqueo de scroll del body mientras el drawer está abierto
  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[70] md:hidden",
        DESIGN_TOKENS.transition.normal,
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
      aria-hidden={!open}
    >
      {/* Overlay */}
      <button
        type="button"
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-black/50 backdrop-blur-sm",
          DESIGN_TOKENS.transition.normal,
          open ? "opacity-100" : "opacity-0"
        )}
        aria-label="Cerrar menú"
        tabIndex={open ? 0 : -1}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className={cn(
          "absolute left-0 top-0 h-full w-[84%] max-w-sm border-r border-white/10 bg-slate-950 shadow-2xl",
          DESIGN_TOKENS.transition.normal,
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header del drawer */}
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <Link
              to="/"
              onClick={onClose}
              className="flex items-center gap-3"
              aria-label={`${BRAND.name} — Ir al inicio`}
            >
              <div
                className={cn(
                  "grid h-9 w-9 place-items-center bg-white/5 ring-1 ring-white/10",
                  DESIGN_TOKENS.radius.sm
                )}
              >
                <span className="text-sm font-black">360</span>
              </div>
              <div className="leading-tight">
                <div className="font-black tracking-tight">{BRAND.name}</div>
                <div className="text-xs text-white/60">{BRAND.tagline}</div>
              </div>
            </Link>

            <button
              type="button"
              onClick={onClose}
              className={cn(
                "rounded-xl px-3 py-2 text-sm font-semibold ring-1 ring-white/10 hover:bg-white/5",
                DESIGN_TOKENS.transition.normal
              )}
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-1 flex-col gap-2 px-5 py-4 text-sm">
            <NavLink
              to="/"
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "rounded-xl px-4 py-3 ring-1 ring-white/10 hover:bg-white/5",
                  DESIGN_TOKENS.transition.normal,
                  isActive && "bg-white/5 text-white"
                )
              }
            >
              Inicio
            </NavLink>

            <NavLink
              to="/tracking"
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "rounded-xl px-4 py-3 ring-1 ring-white/10 hover:bg-white/5",
                  DESIGN_TOKENS.transition.normal,
                  isActive && "bg-white/5 text-white"
                )
              }
            >
              Seguimiento 360
            </NavLink>

            <div className="my-2 h-px bg-white/10" />

            {/* Anclas a Home (funcionan desde /tracking porque vamos a /#...) */}
            <Link
              to="/#como-funciona"
              onClick={onClose}
              className={cn(
                "rounded-xl px-4 py-3 text-white/80 ring-1 ring-white/10 hover:bg-white/5 hover:text-white",
                DESIGN_TOKENS.transition.normal
              )}
            >
              Cómo funciona
            </Link>

            <Link
              to="/#beneficios"
              onClick={onClose}
              className={cn(
                "rounded-xl px-4 py-3 text-white/80 ring-1 ring-white/10 hover:bg-white/5 hover:text-white",
                DESIGN_TOKENS.transition.normal
              )}
            >
              Beneficios
            </Link>

            <Link
              to="/#faq"
              onClick={onClose}
              className={cn(
                "rounded-xl px-4 py-3 text-white/80 ring-1 ring-white/10 hover:bg-white/5 hover:text-white",
                DESIGN_TOKENS.transition.normal
              )}
            >
              FAQ
            </Link>
          </nav>

          {/* Footer del drawer */}
          <div className="border-t border-white/10 px-5 py-4 text-xs text-white/60">
            Navegación rápida • {BRAND.name}
          </div>
        </div>
      </aside>
    </div>
  );
}
