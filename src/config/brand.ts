export const BRAND = {
  name: "Trámite360",
  tagline: "Acompañamiento vehicular de inicio a fin",
  country: "Colombia",

  // Microcopy base (la iremos afinando para confianza/anti-estafa)
  heroHeadline: "Trámites vehiculares de inicio a fin, con seguimiento real",
  heroSubheadline:
    "Diagnóstico inmediato + gestión con expertos + ejecución local cuando se requiere. Te acompañamos hasta el cierre con soportes.",

  // Señales rápidas de valor (KPI cards)
  kpis: [
    { kpi: "Nacional", label: "Cobertura" },
    { kpi: "IA + Humano", label: "Atención" },
    { kpi: "Cierre", label: "Con soportes" },
  ],

  // Beneficios (cards)
  benefits: [
    {
      title: "✅ Claridad total",
      text: "Te decimos qué necesitas, qué sigue y cómo se mueve el proceso según tu ciudad.",
    },
    {
      title: "✅ Acompañamiento 360",
      text: "IA para guiar y filtrar, humano para cerrar y coordinar. Sin quedarte en visto.",
    },
    {
      title: "✅ Cobertura nacional",
      text: "Red de apoyo por zona cuando el trámite exige gestión local o entrega.",
    },
    {
      title: "✅ Seguimiento real",
      text: "Tu caso tiene estado: documentos, gestión, trámite, cierre. Con soportes al final.",
    },
  ],
} as const;
