// src/modules/tracking/tracking.types.ts
import type { Tone } from "@/config/design-tokens";

export type StageStatus = "pending" | "active" | "done" | "blocked";

export type EvidenceKind = "radicado" | "pago" | "documento" | "otro";

export type EventActor = "sistema" | "asesor" | "tramitador";

export type CaseStage = {
  id: string;
  title: string;
  subtitle: string;
  tone?: Tone;

  status: StageStatus;
  eta?: string;

  doneSummary?: string;
  nextAction?: string;

  notes?: string[];
};

export type CaseEvent = {
  atISO: string;
  actor: EventActor;
  message: string;
};

export type CaseEvidence = {
  id: string;
  kind: EvidenceKind;
  label: string;
  available: boolean;
};

export type CaseLookupResponse = {
  code: string;
  tramiteLabel: string;
  cityLabel: string;
  lastUpdatedISO: string;

  stageCurrentId: string;
  stages: CaseStage[];

  events: CaseEvent[];
  evidences: CaseEvidence[];

  publicSummary?: string;
};
