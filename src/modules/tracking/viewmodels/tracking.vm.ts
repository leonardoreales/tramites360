// src/modules/tracking/viewmodels/tracking.vm.ts
import type {
  CaseEvidence,
  CaseEvent,
  CaseLookupResponse,
  CaseStage,
} from "../tracking.types";

export type TrackingStageVM = {
  current: CaseStage;
  index: number;
  all: CaseStage[];
};

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
  stage: TrackingStageVM;
  timeline: TrackingTimelineVM;
  meta: TrackingMetaVM;
};

/* =========================
   Helpers puros (derivados)
   ========================= */

function computeCurrentIndex(data: CaseLookupResponse): number {
  const stages = data.stages ?? [];
  if (!stages.length) return 0;

  const idx = stages.findIndex((s) => s.id === data.stageCurrentId);
  return idx >= 0 ? idx : 0;
}

function computeCurrentStage(
  stages: CaseStage[],
  index: number
): CaseStage {
  return stages[index] ?? stages[0]!;
}

function normalizeCode(s?: string): string {
  return (s ?? "").trim().toUpperCase();
}

function computeWhatsAppMessage(
  data: CaseLookupResponse,
  codeInput?: string
): string {
  const code = normalizeCode(data.code ?? codeInput);

  return code
    ? `Hola, quiero consultar el estado de mi caso ${code}.`
    : "Hola, quiero consultar el estado de mi caso (tengo mi código de seguimiento).";
}

/* =========================
   Builder del ViewModel
   ========================= */

export function buildTrackingVM(args: {
  data: CaseLookupResponse | null | undefined;
  codeInput?: string;
}): TrackingVM | null {
  const data = args.data ?? null;
  if (!data) return null;

  const stages = data.stages ?? [];
  if (!stages.length) return null;

  const index = computeCurrentIndex(data);
  const current = computeCurrentStage(stages, index);

  return {
    case: data,
    stage: {
      current,
      index,
      all: stages,
    },
    timeline: {
      events: data.events ?? [],
      evidences: data.evidences ?? [],
      lastUpdatedISO: data.lastUpdatedISO,
    },
    meta: {
      waMessage: computeWhatsAppMessage(data, args.codeInput),
      showResults: true,
    },
  };
}
