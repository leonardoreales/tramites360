// src/modules/tracking/sections/ResultsSection.tsx
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CurrentStateSection } from "./CurrentStateSection";
import { RouteMapSection } from "./RouteMapSection";
import { TimelineSection } from "./TimelineSection";
import type { TrackingVM } from "../viewmodels/tracking.vm";

/**
 * ResultsSection
 * Layout principal del módulo de seguimiento 360.
 * Distribuye las secciones visuales del tracking en un grid responsive.
 */
export const ResultsSection: React.FC<{ vm: TrackingVM }> = ({ vm }) => {
  if (!vm || !vm.case) return null;

  return (
    <section
      className={cn(
        "w-full mx-auto mt-8 grid gap-6",
        "grid-cols-1 lg:grid-cols-12 max-w-7xl px-4"
      )}
    >
      {/* Columna izquierda */}
      <motion.div
        className="lg:col-span-7 flex flex-col gap-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <CurrentStateSection vm={vm} />
        <RouteMapSection vm={vm} />
      </motion.div>

      {/* Columna derecha */}
      <motion.div
        className="lg:col-span-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <TimelineSection vm={vm} />
      </motion.div>
    </section>
  );
};

export default ResultsSection;
