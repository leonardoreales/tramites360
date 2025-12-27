import WhatsAppButton from "../ui/WhatsAppButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const FAQ_ITEMS = [
  {
    q: "¿Trámite360 es oficial?",
    a: "No somos una entidad de tránsito. Somos un servicio de acompañamiento y gestión: te guiamos, coordinamos y hacemos seguimiento. Siempre te indicamos qué parte es “entidad” y qué parte es “gestión”.",
  },
  {
    q: "¿En cuánto tiempo se resuelve?",
    a: "Depende del trámite, ciudad y validaciones. Te damos un estimado realista después del diagnóstico, y te mantenemos informado del estado.",
  },
  {
    q: "¿Qué información necesito para iniciar?",
    a: "Con el primer mensaje en WhatsApp te guiamos: ciudad, trámite y datos básicos del vehículo. Si hay bloqueos (prenda/multas), lo detectamos temprano para evitar pérdidas de tiempo.",
  },
  {
    q: "¿Cómo evitan que me quede en visto?",
    a: "El flujo combina IA (para guiar y recopilar) + agente humano (para confirmar y cerrar). Tu caso tiene seguimiento y un siguiente paso claro.",
  },
] as const;

export default function FaqSection() {
  return (
    <section id="faq" className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-black tracking-tight md:text-4xl">
          Preguntas frecuentes
        </h2>
        <p className="mt-3 max-w-2xl text-white/70">
          Respuestas claras para bajar fricción y subir confianza.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Accordion type="single" collapsible className="contents">
            {FAQ_ITEMS.map((item, idx) => (
              <AccordionItem
                key={item.q}
                value={`item-${idx}`}
                variant="card"
                className={cn(
                  "px-6 transition",
                  "hover:bg-white/[0.07] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_18px_60px_rgba(0,0,0,0.45)]"
                )}
              >
                <AccordionTrigger
                  className={cn(
                    "py-5 text-left font-extrabold text-white hover:no-underline",
                    "gap-4"
                  )}
                >
                  <span className="flex w-full items-center gap-3">
                    {/* Check “resuelto” al abrir (sin framer): se anima con data-state */}
                    <span
                      className={cn(
                        "grid h-7 w-7 place-items-center rounded-full border border-white/10 bg-white/5",
                        "transition-transform duration-300",
                        "scale-90 opacity-60",
                        "group-data-[state=open]:scale-100 group-data-[state=open]:opacity-100",
                        "group-data-[state=open]:border-emerald-400/25 group-data-[state=open]:bg-emerald-500/10"
                      )}
                      aria-hidden="true"
                    >
                      <Check className="h-4 w-4 text-emerald-300" />
                    </span>

                    <span className="flex-1">{item.q}</span>
                  </span>
                </AccordionTrigger>

                <AccordionContent className="pb-5 text-white/70">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-slate-900/30 p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-lg font-extrabold">
                ¿Listo para el diagnóstico?
              </div>
              <p className="mt-1 text-white/70">
                Entra por WhatsApp y te guiamos paso a paso.
              </p>
            </div>
            <div className="md:w-[280px]">
              <WhatsAppButton
                label="Iniciar diagnóstico"
                variant="primary"
                fullWidth
                intent="diagnostico"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
