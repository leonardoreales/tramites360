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

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {BRAND.benefits.map((b) => (
            <Card
              key={b.title}
              className="group relative overflow-hidden rounded-3xl border-white/10 bg-white/5 text-white transition hover:bg-white/[0.07]"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-cyan-400/10 blur-2xl" />
                <div className="absolute -left-24 -bottom-24 h-56 w-56 rounded-full bg-indigo-500/10 blur-2xl" />
              </div>

              <CardContent className="relative p-6">
                <h3 className="text-lg font-extrabold">{b.title}</h3>
                <p className="mt-2 text-white/70">{b.text}</p>
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
