// src/modules/tracking/sections/TimelineSection.tsx
import { motion } from "framer-motion";
import { ShieldCheck, FileText, ListChecks, Home, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import EvidenceIcon from "../ui/EvidenceIcon";
import { cn } from "@/lib/utils";
import { DESIGN_TOKENS } from "@/config/design-tokens";

import type { CaseEvidence, CaseEvent, EventActor } from "../tracking.types";
import type { TrackingVM } from "../viewmodels/tracking.vm";

const ACTOR_LABEL: Record<EventActor, string> = {
  sistema: "Sistema",
  asesor: "Asesor",
  tramitador: "Tramitador",
};

type TimelineSectionProps = {
  vm: TrackingVM;
};

/**
 * TimelineSection
 * Sprint 1: UI completa + tipado real (sin any, sin props inventadas).
 * Evidencias: no hay URLs aún; se muestra disponibilidad y se bloquea "Ver".
 */
export default function TimelineSection({ vm }: TimelineSectionProps) {
  const events: CaseEvent[] = vm.timeline.events ?? [];
  const evidences: CaseEvidence[] = vm.timeline.evidences ?? [];

  return (
    <section className="space-y-6">
      {/* Bitácora */}
      <Card
        className={cn(
          "rounded-3xl border-white/10 bg-white/5 text-white",
          DESIGN_TOKENS.radius.lg,
          "backdrop-blur"
        )}
      >
        <CardContent className="p-6">
          <header className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ListChecks className="h-5 w-5 text-cyan-200" />
              <h2 className="text-lg font-semibold">Bitácora</h2>
            </div>

            <span className="text-xs text-white/50">
              {events.length} evento{events.length === 1 ? "" : "s"}
            </span>
          </header>

          {events.length === 0 ? (
            <p className="text-sm text-white/70">Aún no hay eventos registrados para este caso.</p>
          ) : (
            <ul className="space-y-3">
              {events.map((ev, idx) => (
                <motion.li
                  key={`${ev.atISO}-${idx}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.03, ease: "easeOut" }}
                  className={cn(
                    "rounded-2xl border border-white/10 bg-white/[0.02] p-4",
                    "transition hover:bg-white/[0.04]"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">{ev.message}</p>

                      <p className="mt-1 text-xs text-white/60">
                        {ACTOR_LABEL[ev.actor]} ·{" "}
                        <span className="text-white/50">{new Date(ev.atISO).toLocaleString()}</span>
                      </p>
                    </div>

                    <span className="text-xs text-white/40">#{idx + 1}</span>
                  </div>
                </motion.li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Evidencias */}
      <Card
        className={cn(
          "rounded-3xl border-white/10 bg-white/5 text-white",
          DESIGN_TOKENS.radius.lg,
          "backdrop-blur"
        )}
      >
        <CardContent className="p-6">
          <header className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-indigo-200" />
              <h2 className="text-lg font-semibold">Evidencias</h2>
            </div>

            <span className="text-xs text-white/50">
              {evidences.length} soporte{evidences.length === 1 ? "" : "s"}
            </span>
          </header>

          {evidences.length === 0 ? (
            <p className="text-sm text-white/70">No hay soportes disponibles por ahora.</p>
          ) : (
            <ul className="space-y-3">
              {evidences.map((evd) => {
                const canView = evd.available;

                return (
                  <motion.li
                    key={evd.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className={cn(
                      "flex items-center justify-between gap-3 rounded-2xl border border-white/10",
                      "bg-white/[0.02] p-4 transition hover:bg-white/[0.04]"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {/* ✅ contrato real: EvidenceIcon recibe kind */}
                      <EvidenceIcon kind={evd.kind} className="h-4 w-4 text-white/70" />
                      <div>
                        <p className="text-sm font-semibold text-white">{evd.label}</p>
                        <p className="mt-1 text-xs text-white/60">
                          {canView ? "Disponible" : "Bloqueado hasta verificación"}
                        </p>
                      </div>
                    </div>

                    {/* Sprint 1: no hay URL real; botón se bloquea si no está disponible */}
                    <Button type="button" variant="outline" size="sm" disabled={!canView}>
                      Ver
                    </Button>
                  </motion.li>
                );
              })}
            </ul>
          )}

          <div className="mt-4 flex items-center gap-2 text-xs text-white/50">
            <ShieldCheck className="h-4 w-4" />
            <span>Los soportes se habilitan por etapa verificada. Transparencia antes que humo.</span>
          </div>
        </CardContent>
      </Card>

      {/* Acciones */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button asChild variant="outline">
          <Link to="/" className="inline-flex items-center gap-2">
            <Home className="h-4 w-4" />
            Volver al inicio
          </Link>
        </Button>

        <Button type="button" variant="secondary" onClick={() => window.location.reload()}>
          <RotateCcw className="h-4 w-4" />
          Consultar otro código
        </Button>
      </div>
    </section>
  );
}
