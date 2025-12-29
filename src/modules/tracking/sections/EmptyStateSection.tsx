// src/modules/tracking/sections/EmptyStateSection.tsx
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Flag, ShieldCheck, Truck } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type EmptyCard = {
  icon: LucideIcon;
  title: string;
  text: string;
};

const CARDS: EmptyCard[] = [
  {
    icon: ShieldCheck,
    title: "Privado por diseño",
    text: "Consulta por Case ID (sin placa/cédula pública). Menos fricción, más control de datos.",
  },
  {
    icon: Truck,
    title: "Ruta visual 360",
    text: "Carrito + estaciones: siempre sabes qué pasó, dónde estás y qué sigue.",
  },
  {
    icon: Flag,
    title: "Evidencias al avanzar",
    text: "Soportes y comprobantes se habilitan por etapa, con trazabilidad y contexto.",
  },
];

export default function EmptyStateSection() {
  return (
    <motion.div
      className="mt-10 grid gap-4 md:grid-cols-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      aria-label="Información del seguimiento por código"
    >
      {CARDS.map((x, idx) => (
        <motion.div
          key={x.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 * idx, ease: "easeOut" }}
        >
          <Card
            className={cn(
              "rounded-3xl border-white/10 bg-white/5 text-white",
              "transition hover:bg-white/[0.07] hover:-translate-y-0.5"
            )}
          >
            <CardContent className="p-6">
              <div className="inline-flex items-center gap-2">
                <x.icon className="h-6 w-6 text-cyan-200" />
                <span className="text-xs font-semibold text-white/50">Seguimiento 360</span>
              </div>

              <div className="mt-3 text-lg font-extrabold">{x.title}</div>
              <div className="mt-2 text-sm text-white/70">{x.text}</div>

              <div className="mt-4 h-px bg-white/10" />

              <div className="mt-3 text-xs text-white/50">
                Tip: guarda tu Case ID; lo usarás para ver avances y evidencias.
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
