import WhatsAppButton from "../ui/WhatsAppButton";
import { BRAND } from "../../config/brand";
import { Card, CardContent } from "../ui/card";

export default function BenefitsSection() {
  return (
    <section id="beneficios" className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Beneficios que se sienten desde el primer mensaje
            </h2>
            <p className="mt-3 max-w-2xl text-white/70">
              Primero claridad, luego acción: avanzas sin estrés y sin errores costosos.
            </p>
          </div>

          <div className="hidden md:block">
            <WhatsAppButton label="Empezar por WhatsApp" variant="primary" intent="diagnostico" />
          </div>
        </div>

        {/* Grid premium: más aire y consistencia visual */}
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {BRAND.benefits.map((b) => (
            <Card
              key={b.title}
              className={[
                // Base card
                "group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-white",
                // Movimiento “producto”: lift suave
                "transition duration-300 ease-out hover:-translate-y-1 hover:bg-white/[0.07]",
                // Glow sutil (borde y sombra limpia)
                "hover:shadow-[0_0_0_1px_rgba(255,255,255,0.10),0_18px_60px_rgba(0,0,0,0.45)]",
              ].join(" ")}
            >
              {/* Halo dinámico (vanguardista, pero discreto) */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
                <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
                <div className="absolute -left-28 -bottom-28 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
              </div>

              {/* “Scanline” suave: da sensación tech sin gritar */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>

              {/* Fondo interior con gradiente sutil */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.05] via-transparent to-transparent" />

              <CardContent className="relative p-6">
                <div className="flex items-start gap-4">
                  {/* Badge/ícono minimal “AI-ready” */}
                  <div className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                    <span className="text-xs font-black text-white/80">✓</span>
                  </div>

                  <div>
                    <h3 className="text-lg font-extrabold tracking-tight">{b.title}</h3>
                    <p className="mt-2 text-white/70">{b.text}</p>

                    {/* Línea de refuerzo: microcopy tech/pro */}
                    <div className="mt-4 inline-flex items-center gap-2 text-xs text-white/55">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                      Proceso guiado + seguimiento verificable
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 md:hidden">
          <WhatsAppButton
            label="Empezar por WhatsApp"
            variant="primary"
            fullWidth
            intent="diagnostico"
          />
        </div>
      </div>
    </section>
  );
}
