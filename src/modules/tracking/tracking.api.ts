// src/modules/tracking/tracking.api.ts
import type { CaseLookupResponse } from "./tracking.types";
import { mockLookupCase } from "./tracking.mock";
import { normalizeCaseCode, sleep } from "./tracking.helpers";

export type LookupCaseResult =
  | { ok: true; data: CaseLookupResponse }
  | { ok: false; error: string };

const DEFAULT_LATENCY_MS = 500;

export async function lookupCase(rawCode: string): Promise<LookupCaseResult> {
  const code = normalizeCaseCode(rawCode);

  // Simula latencia (UX realista + loader)
  await sleep(DEFAULT_LATENCY_MS);

  // HOY: mock
  const res = mockLookupCase(code);
  if (!res) {
    return {
      ok: false,
      error: "Código inválido. Verifica el formato (ej: T360-7H2K9).",
    };
  }

  return { ok: true, data: res };
}

/**
 * NOTA (Etapa 3 / Backend):
 * Reemplazar el bloque "HOY: mock" por:
 *  - fetch(`/api/v1/cases/${encodeURIComponent(code)}`)
 *  - parse JSON y mapear a CaseLookupResponse
 *  - retornar ok:false con mensaje usable
 *
 * Importante: NO cambiar firma de lookupCase() para no tocar hooks/UI.
 */
