export type WhatsAppIntent =
  | "diagnostico"
  | "traspaso"
  | "prenda"
  | "duplicado"
  | "general";

export const WHATSAPP = {
  /**
   * Número en formato E.164 SIN el "+" para wa.me
   * Ejemplo Colombia: 573001234567
   * TODO: Reemplazar por el número oficial del negocio.
   */
  numberE164NoPlus: "573014659048",

  messages: {
    diagnostico:
      "Hola, quiero un diagnóstico y acompañamiento para un trámite vehicular. Mi ciudad es: _____. El trámite es: _____.",
    traspaso:
      "Hola, necesito acompañamiento para un traspaso. Ciudad: _____. Tipo de vehículo: _____. ¿Qué requisitos debo tener?",
    prenda:
      "Hola, necesito asesoría para un trámite relacionado con prenda. Ciudad: _____. ¿Cuál es el paso a paso y requisitos?",
    duplicado:
      "Hola, necesito duplicado (placa/licencia/soat u otro). Ciudad: _____. ¿Cómo lo gestionamos?",
    general:
      "Hola, quiero información sobre trámites vehiculares y acompañamiento. Mi ciudad es: _____.",
  } satisfies Record<WhatsAppIntent, string>,
} as const;

/**
 * Construye un link wa.me listo para usar.
 * - Sanitiza el número (deja solo dígitos).
 * - Encodea el mensaje.
 */
export function buildWhatsAppUrl(opts?: {
  intent?: WhatsAppIntent;
  message?: string;
  phoneE164NoPlus?: string;
}) {
  const phoneRaw = opts?.phoneE164NoPlus ?? WHATSAPP.numberE164NoPlus;
  const phone = String(phoneRaw).replace(/\D/g, "");

  const msg =
    opts?.message ??
    WHATSAPP.messages[opts?.intent ?? "diagnostico"] ??
    WHATSAPP.messages.diagnostico;

  const text = encodeURIComponent(msg);
  return `https://wa.me/${phone}?text=${text}`;
}
