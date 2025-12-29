import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

function scrollToHash(hash: string) {
  if (!hash) return false;

  const id = decodeURIComponent(hash.replace("#", "").trim());
  if (!id) return false;

  const el = document.getElementById(id);
  if (!el) return false;

  // Pequeño delay para asegurar que el DOM esté listo tras cambios de ruta.
  window.requestAnimationFrame(() => {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  return true;
}

export default function AppShell() {
  const location = useLocation();

  useEffect(() => {
    // Si hay hash (/#faq), intentamos scrollear al elemento.
    const didScrollToHash = scrollToHash(location.hash);
    if (didScrollToHash) return;

    // Cambio de ruta “normal”: subimos al top con suavidad.
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Accesibilidad: salto directo al contenido */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:text-slate-900 focus:shadow"
      >
        Saltar al contenido
      </a>

      <Header />

      <main id="main" className="min-h-[calc(100vh-120px)]">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
