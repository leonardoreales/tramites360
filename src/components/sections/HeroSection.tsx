import WhatsAppButton from "../ui/WhatsAppButton";
import { BRAND } from "../../config/brand";

export default function HeroSection() {
  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-2 md:items-center md:py-20">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          {BRAND.name} · {BRAND.country}
          <span className="ml-2 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/70">
            Diagnóstico en minutos
          </span>
        </p>

        <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight md:text-6xl">
          Trámites vehiculares{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-cyan-300 bg-clip-text text-transparent">
            de inicio a fin
          </span>
          , con seguimiento real
        </h1>

        <p className="mt-5 max-w-2xl text-lg text-white/70">
          Diagnóstico inmediato + gestión con expertos + ejecución local cuando se requiere. Te
          acompañamos hasta el cierre con soportes.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <WhatsAppButton label="Cotizar por WhatsApp" variant="primary" />
          <a
            href="#beneficios"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            Ver beneficios
          </a>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {BRAND.kpis.map((x) => (
            <div
              key={x.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/[0.07]"
            >
              <div className="text-lg font-extrabold">{x.kpi}</div>
              <div className="mt-1 text-sm text-white/60">{x.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/30 p-4 text-sm text-white/70">
          <span className="font-semibold text-white">Transparencia:</span> te explicamos requisitos y
          ruta por ciudad antes de ejecutar. Si algo requiere presencialidad, también te lo decimos.
        </div>
      </div>

      <div
        id="como-funciona"
        className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.05)] backdrop-blur"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold">Empieza en 60 segundos</h2>
            <p className="mt-2 text-white/70">
              IA para guiar y filtrar, humano para cerrar y coordinar. Sin quedarte en visto.
            </p>
          </div>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            Flujo 360
          </span>
        </div>

        <ol className="mt-6 space-y-3">
          {[
            "Escribes por WhatsApp",
            "Diagnóstico + requisitos según tu ciudad",
            "Agente humano confirma y cotiza",
            "Gestión + seguimiento hasta el cierre con soportes",
          ].map((t, i) => (
            <li
              key={t}
              className="group flex gap-3 rounded-2xl border border-white/10 bg-slate-900/40 p-4 transition hover:bg-slate-900/55"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15 font-black text-indigo-200 ring-1 ring-white/10">
                {i + 1}
              </div>
              <div>
                <div className="font-semibold">{t}</div>
                <div className="mt-1 text-sm text-white/60">
                  {i === 0 && "Mensaje inicial guiado para entender tu caso."}
                  {i === 1 && "Checklist realista para evitar rechazos y vueltas."}
                  {i === 2 && "Validación humana para cerrar con confianza."}
                  {i === 3 && "Trazabilidad del caso y confirmación final."}
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-6">
          <WhatsAppButton
            label="Quiero mi diagnóstico"
            variant="secondary"
            fullWidth
            intent="diagnostico"
          />
          <p className="mt-3 text-xs text-white/50">
            * Algunos trámites pueden requerir validaciones presenciales según ciudad/entidad.
          </p>
        </div>
      </div>
    </section>
  );
}
