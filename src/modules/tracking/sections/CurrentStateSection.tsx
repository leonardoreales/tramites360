// src/modules/tracking/sections/CurrentStateSection.tsx
import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatusPill from "../ui/StatusPill";
import { cn } from "@/lib/utils";
import type { TrackingVM } from "../viewmodels/tracking.vm";

/**
 * CurrentStateSection
 * Card que muestra el estado actual del trámite, acción sugerida y CTA WhatsApp.
 */
export const CurrentStateSection: React.FC<{ vm: TrackingVM }> = ({ vm }) => {
  const stage = vm.stage.current;
  const waMessage = encodeURIComponent(vm.meta.waMessage);

  const isBlocked = stage.status === "blocked";
  const statusText = isBlocked
    ? "Tu trámite requiere revisión adicional."
    : "Tu trámite avanza correctamente.";

  return (
    <motion.section
      className={cn(
        "rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl",
        "p-6 shadow-xl transition-all hover:border-white/20"
      )}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">
          Estado actual
        </h2>
        <StatusPill status={stage.status} />
      </header>

      <div className="space-y-2">
        <h3 className="text-xl font-bold text-white/90">
          {stage.title}
        </h3>
        <p className="text-sm text-white/60">{statusText}</p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          variant={isBlocked ? "destructive" : "default"}
          className={cn(
            "flex items-center gap-2 px-5 py-2.5 text-sm font-medium",
            "bg-indigo-500/80 hover:bg-indigo-500"
          )}
          onClick={() =>
            window.open(`https://wa.me/57XXXXXXXXXX?text=${waMessage}`, "_blank")
          }
        >
          <MessageCircle className="h-4 w-4" />
          Consultar por WhatsApp
        </Button>

        {isBlocked && (
          <p className="text-xs text-amber-300">
            Resuelve esta incidencia antes de continuar.
          </p>
        )}
      </div>

      {/* Microcopy antifraude */}
      <div className="mt-5 flex items-center gap-2 text-xs text-white/50">
        <ShieldCheck className="h-4 w-4" />
        <span>
          Transparencia: Trámite360 no es entidad de tránsito; te guiamos, coordinamos y evidenciamos.
        </span>
      </div>
    </motion.section>
  );
};

export default CurrentStateSection;
