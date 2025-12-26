import { BRAND } from "../../config/brand";

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-white/60">
            © {new Date().getFullYear()} {BRAND.name} — {BRAND.tagline}
          </div>
          <div className="text-xs text-white/50">
            Hecho para claridad, confianza y cierre con soportes.
          </div>
        </div>
      </div>
    </footer>
  );
}
