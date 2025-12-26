import WhatsAppButton from "../ui/WhatsAppButton";
import { BRAND } from "../../config/brand";

export default function Header() {
  return (
    <header className="border-b border-white/10 bg-slate-950/50 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
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

        <div className="hidden md:block">
          <WhatsAppButton label="Hablar por WhatsApp" variant="secondary" intent="diagnostico" />
        </div>
      </div>
    </header>
  );
}
