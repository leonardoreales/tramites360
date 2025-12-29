// src/modules/tracking/tracking.helpers.ts
import type { LucideIcon } from "lucide-react";
import { AlertCircle, CheckCircle2, Clock3 } from "lucide-react";

import { CODE_PREFIX, CODE_REGEX } from "./tracking.constants";
import type { CaseEvent, EventActor, StageStatus } from "./tracking.types";

export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function safeUpper(s: string) {
  return (s ?? "").toString().trim().toUpperCase();
}

export function normalizeCaseCode(input: string) {
  const raw = safeUpper(input).replace(/\s+/g, "");
  if (!raw) return "";

  // Permite pegar solo el sufijo: "7H2K9" => "T360-7H2K9"
  if (raw.length === 5 && /^[A-Z0-9]{5}$/.test(raw)) return `${CODE_PREFIX}${raw}`;

  // Permite "T3607H2K9" => "T360-7H2K9"
  if (/^T360[A-Z0-9]{5}$/.test(raw)) return `${CODE_PREFIX}${raw.slice(4)}`;

  return raw;
}

export function isValidCaseCode(input: string) {
  const normalized = normalizeCaseCode(input);
  return CODE_REGEX.test(normalized);
}

export function parseQueryParam(param: string) {
  try {
    const u = new URL(window.location.href);
    return u.searchParams.get(param) ?? "";
  } catch {
    return "";
  }
}

export function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

export function formatDateTime(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;

  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function statusLabel(s: StageStatus) {
  if (s === "done") return "Completado";
  if (s === "active") return "En curso";
  if (s === "blocked") return "Bloqueado";
  return "Pendiente";
}

export function statusIcon(s: StageStatus): LucideIcon {
  if (s === "done") return CheckCircle2;
  if (s === "active") return Clock3;
  if (s === "blocked") return AlertCircle;
  return Clock3;
}

export function statusBadgeClass(s: StageStatus) {
  if (s === "done") return "border-emerald-400/20 bg-emerald-500/10 text-emerald-200";
  if (s === "active") return "border-cyan-300/20 bg-cyan-500/10 text-cyan-200";
  if (s === "blocked") return "border-amber-300/20 bg-amber-500/10 text-amber-200";
  return "border-white/10 bg-white/5 text-white/70";
}

export function actorLabel(a: EventActor) {
  if (a === "asesor") return "Asesor";
  if (a === "tramitador") return "Tramitador";
  return "Sistema";
}

// Por si el backend llega con actor en string no tipado:
export function actorLabelFromEvent(e: Pick<CaseEvent, "actor">) {
  return actorLabel(e.actor);
}
