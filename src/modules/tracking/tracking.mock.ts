// src/modules/tracking/tracking.mock.ts
import type { CaseEvidence, CaseEvent, CaseLookupResponse, CaseStage } from "./tracking.types";
import { CODE_REGEX } from "./tracking.constants";
import { clamp, normalizeCaseCode } from "./tracking.helpers";

function buildMockStages(currentIndex: number, blockedAt?: number): CaseStage[] {
  const base: Omit<CaseStage, "status">[] = [
    {
      id: "diagnostico",
      title: "Diagnóstico 360",
      subtitle: "Ruta, requisitos y estimación realista",
      tone: "indigo",
      doneSummary: "Caso validado y ruta definida",
      nextAction: "Confirmar ciudad y tipo de trámite",
    },
    {
      id: "validaciones",
      title: "Validaciones base",
      subtitle: "Chequeos previos para evitar devoluciones",
      tone: "cyan",
      doneSummary: "Checklist base completado",
      nextAction: "Validar pendientes y restricciones (si aplica)",
    },
    {
      id: "documentos",
      title: "Recepción de documentos",
      subtitle: "Recolección y verificación de legibilidad",
      tone: "purple",
      doneSummary: "Documentos verificados",
      nextAction: "Enviar faltantes o corregir inconsistencias",
      notes: ["Si hay falta de firma, te lo avisamos aquí.", "Evidencias se cargan al avanzar."],
    },
    {
      id: "revision",
      title: "Revisión y consistencia",
      subtitle: "Coherencia de datos y requisitos del caso",
      tone: "slate",
      doneSummary: "Revisión interna aprobada",
      nextAction: "Aprobación para radicación",
    },
    {
      id: "pagos",
      title: "Liquidación y pagos",
      subtitle: "Derechos, comprobantes y soportes",
      tone: "amber",
      doneSummary: "Pagos listos y soportados",
      nextAction: "Confirmar comprobantes",
    },
    {
      id: "radicacion",
      title: "Radicación / Ingreso",
      subtitle: "Ingreso del trámite según entidad/ciudad",
      tone: "emerald",
      doneSummary: "Radicado generado",
      nextAction: "Esperar validación",
    },
    {
      id: "aprobacion",
      title: "Validación / Aprobación",
      subtitle: "Seguimiento de respuesta y confirmación",
      tone: "cyan",
      doneSummary: "Aprobación confirmada",
      nextAction: "Preparar entrega",
    },
    {
      id: "cierre",
      title: "Entrega y cierre",
      subtitle: "Soportes finales y confirmación",
      tone: "indigo",
      doneSummary: "Caso cerrado con evidencias",
      nextAction: "Descargar resumen 360",
    },
  ];

  return base.map((s, idx) => {
    const isBlocked = typeof blockedAt === "number" && idx === blockedAt;

    let status: CaseStage["status"] = "pending";
    if (idx < currentIndex) status = "done";
    if (idx === currentIndex) status = isBlocked ? "blocked" : "active";
    if (idx > currentIndex) status = "pending";

    const eta =
      status === "active"
        ? "Hoy"
        : status === "blocked"
          ? "Acción requerida"
          : status === "pending"
            ? "Próximamente"
            : "Listo";

    return {
      ...s,
      status,
      eta,
    };
  });
}

export function mockLookupCase(code: string): CaseLookupResponse | null {
  const normalized = normalizeCaseCode(code);
  if (!CODE_REGEX.test(normalized)) return null;

  const seed = normalized.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);

  const stagesLen = 8;
  const currentIndex = clamp(seed % stagesLen, 0, stagesLen - 1);

  const shouldBlock = seed % 7 === 0 && currentIndex >= 2 && currentIndex <= 5;
  const blockedAt = shouldBlock ? currentIndex : undefined;

  const stages = buildMockStages(currentIndex, blockedAt);
  const current =
    stages.find((s) => s.status === "active" || s.status === "blocked") ?? stages[0];

  const now = new Date();
  const lastUpdated = new Date(now.getTime() - (seed % 240) * 60 * 1000);

  const evidences: CaseEvidence[] = [
    { id: "ev-1", kind: "documento", label: "Checklist de documentos", available: currentIndex >= 2 },
    { id: "ev-2", kind: "pago", label: "Comprobante de pago", available: currentIndex >= 4 },
    { id: "ev-3", kind: "radicado", label: "Radicado / soporte de ingreso", available: currentIndex >= 5 },
  ];

  const events: CaseEvent[] = [
    {
      atISO: new Date(lastUpdated.getTime() - 55 * 60 * 1000).toISOString(),
      actor: "sistema",
      message: "Caso formalizado. Código de seguimiento habilitado.",
    },
    {
      atISO: new Date(lastUpdated.getTime() - 22 * 60 * 1000).toISOString(),
      actor: "asesor",
      message:
        current.status === "blocked"
          ? "Se detectó un bloqueo: falta un documento o dato clave."
          : `Actualización: avanzamos a “${current.title}”.`,
    },
    {
      atISO: lastUpdated.toISOString(),
      actor: "tramitador",
      message:
        current.status === "blocked"
          ? "Pendiente tu acción. En cuanto llegue, reanudamos sin perder turno."
          : "Seguimiento activo: próxima actualización al completar el siguiente hito.",
    },
  ];

  return {
    code: normalized,
    tramiteLabel: "Acompañamiento Vehicular 360",
    cityLabel: "Colombia (según tu ciudad)",
    lastUpdatedISO: lastUpdated.toISOString(),

    stageCurrentId: current.id,
    stages,

    events,
    evidences,

    publicSummary:
      current.status === "blocked"
        ? "Tu caso está bloqueado por una acción requerida."
        : "Tu caso está en curso. Te mostramos hitos y evidencias.",
  };
}
