// src/modules/tracking/viewmodels/tracking.vm.ts
import type { CaseEvidence, CaseEvent, CaseLookupResponse, CaseStage } from "../tracking.types";

export type TrackingTimelineVM = {
  events: CaseEvent[];
  evidences: CaseEvidence[];
  lastUpdatedISO: string;
};

export type TrackingMetaVM = {
  waMessage: string;
  showResults: boolean;
};

export type TrackingVM = {
  case: CaseLookupResponse;
  currentIndex: number;
  currentStage: CaseStage;
  timeline: TrackingTimelineVM;
  meta: TrackingMetaVM;
};

/**
 * Mantén esto puro: sin hooks, sin UI, sin efectos.
 * Solo derivados deterministas (fácil de testear y refactorizar).
 */
function computeCurrentIndex(data: CaseLookupResponse): number {
  const stages = data.stages ?? [];
  if (!stages.length) return 0;

  const idx = stages.findIndex((s) => s.id === data.stageCurrentId);
  return idx >= 0 ? idx : 0;
}

function computeCurrentStage(data: CaseLookupResponse, idx: number): CaseStage {
  const stages = data.stages ?? [];
  if (!stages.length) {
    // Esto no debería pasar si el backend/mock está sano,
    // pero evitamos romper la UI por completo.
    return {
      id: "unknown",
      title: "Sin etapas",
      subtitle: "No hay información de etapas disponible",
      status: "pending",
    };
  }

  return stages[idx] ?? stages[0]!;
}

function normalizeCode(s?: string): string {
  return (s ?? "").trim().toUpperCase();
}

function computeWhatsAppMessage(args: { data?: CaseLookupResponse | null; codeInput?: string }): string {
  const code = normalizeCode(args.data?.code ?? args.codeInput);

  if (code) return `Hola, quiero consultar el estado de mi caso ${code}.`;
  return "Hola, quiero consultar el estado de mi caso (tengo mi código de seguimiento).";
}

export function buildTrackingVM(args: {
  data: CaseLookupResponse | null | undefined;
  codeInput?: string;
}): TrackingVM | null {
  const data = args.data ?? null;
  if (!data) return null;

  const stagesCount = data.stages?.length ?? 0;
  if (stagesCount === 0) return null;

  const currentIndex = computeCurrentIndex(data);
  const currentStage = computeCurrentStage(data, currentIndex);

  return {
    case: data,
    currentIndex,
    currentStage,
    timeline: {
      events: data.events ?? [],
      evidences: data.evidences ?? [],
      lastUpdatedISO: data.lastUpdatedISO,
    },
    meta: {
      waMessage: computeWhatsAppMessage({ data, codeInput: args.codeInput }),
      showResults: true,
    },
  };
}
