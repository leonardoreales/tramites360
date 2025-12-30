// src/modules/tracking/sections/RouteMapSection.tsx
import React from "react";
import { motion } from "framer-motion";
import { MapPinned } from "lucide-react";
import { cn } from "@/lib/utils";
import ToneDot from "../ui/ToneDot";
import type { TrackingVM } from "../viewmodels/tracking.vm";

/**
 * RouteMapSection
 * Sprint 1: estructura + listado de etapas (chips).
 * Nota: ToneDot exige `status` (StageStatus) como prop obligatorio.
 */
export const RouteMapSection: React.FC<{ vm: TrackingVM }> = ({ vm }) => {
  const { stage, case: caseData } = vm;

  return (
    <section
      className={cn(
        "rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl",
        "p-6 shadow-xl"
      )}
    >
      {/* Header */}
      <header className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPinned className="h-5 w-5 text-indigo-400" />
          <h2 className="text-lg font-semibold text-white">Ruta del trámite</h2>
        </div>

        <span className="text-xs text-white/50">
          {caseData.cityLabel} · Actualizado{" "}
          {new Date(caseData.lastUpdatedISO).toLocaleDateString()}
        </span>
      </header>

      {/* Placeholder ruta (Sprint 2) */}
      <div className="mb-6 flex h-[180px] items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02]">
        <span className="text-sm text-white/40">Visualización de ruta (Sprint 2)</span>
      </div>

      {/* Etapas */}
      <div className="grid gap-3 md:grid-cols-2">
        {stage.all.map((s, idx) => {
          const isCurrent = idx === stage.index;

          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={cn(
                "flex items-start gap-3 rounded-2xl border p-4",
                "border-white/10 bg-white/[0.02]",
                isCurrent && "border-indigo-500/50 bg-indigo-500/10"
              )}
            >
              {/* ✅ Contrato real: ToneDot requiere status */}
              <ToneDot status={s.status} />

              <div>
                <h3 className="text-sm font-semibold text-white">{s.title}</h3>
                {s.subtitle && (
                  <p className="mt-1 text-xs text-white/60">{s.subtitle}</p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default RouteMapSection;
