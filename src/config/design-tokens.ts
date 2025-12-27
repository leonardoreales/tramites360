// src/config/design-tokens.ts
// Sistema de tokens visuales para Trámite360.
// Objetivo: consistencia + evitar Tailwind dinámico (bg-${...}) + acelerar cambios globales.

export type Tone = "emerald" | "cyan" | "indigo" | "purple" | "amber" | "slate";

export const DESIGN_TOKENS = {
  radius: {
    sm: "rounded-xl",
    md: "rounded-2xl",
    lg: "rounded-3xl",
    pill: "rounded-full",
  },

  border: {
    subtle: "border border-white/10",
    medium: "border border-white/15",
    strong: "border border-white/20",
  },

  surface: {
    // Fondos tipo glass / panel
    glassLight: "bg-white/5",
    glassMedium: "bg-white/7",
    glassDark: "bg-slate-900/30",
    // Fondo header/overlay
    headerBase: "bg-slate-950/50",
    headerScrolled: "bg-slate-950/95",
  },

  shadow: {
    // Sombras que se sienten "producto" en dark mode
    subtle: "shadow-[0_0_0_1px_rgba(255,255,255,0.05)]",
    glow:
      "shadow-[0_0_0_1px_rgba(255,255,255,0.10),0_18px_60px_rgba(0,0,0,0.45)]",
    lift:
      "shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_16px_40px_rgba(0,0,0,0.50)]",
  },

  transition: {
    fast: "transition duration-200",
    normal: "transition duration-300",
    slow: "transition duration-500",
  },

  focus: {
    ring:
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-0",
  },

  text: {
    muted: "text-white/70",
    subtle: "text-white/60",
    faint: "text-white/50",
  },

  layout: {
    container: "mx-auto max-w-6xl px-6",
    sectionY: "py-16",
  },
} as const;

export const TONE_STYLES: Record<
  Tone,
  {
    icon: string;
    text: string;
    bgSoft: string;
    borderSoft: string;
    ringSoft: string;
    shadowGlow?: string;
  }
> = {
  emerald: {
    icon: "text-emerald-400",
    text: "text-emerald-200",
    bgSoft: "bg-emerald-500/10",
    borderSoft: "border-emerald-400/20",
    ringSoft: "ring-emerald-400/25",
    shadowGlow: "shadow-emerald-500/10",
  },
  cyan: {
    icon: "text-cyan-300",
    text: "text-cyan-200",
    bgSoft: "bg-cyan-500/10",
    borderSoft: "border-cyan-300/20",
    ringSoft: "ring-cyan-300/25",
    shadowGlow: "shadow-cyan-500/10",
  },
  indigo: {
    icon: "text-indigo-300",
    text: "text-indigo-200",
    bgSoft: "bg-indigo-500/10",
    borderSoft: "border-indigo-300/20",
    ringSoft: "ring-indigo-300/25",
    shadowGlow: "shadow-indigo-500/10",
  },
  purple: {
    icon: "text-purple-300",
    text: "text-purple-200",
    bgSoft: "bg-purple-500/10",
    borderSoft: "border-purple-300/20",
    ringSoft: "ring-purple-300/25",
    shadowGlow: "shadow-purple-500/10",
  },
  amber: {
    icon: "text-amber-300",
    text: "text-amber-200",
    bgSoft: "bg-amber-500/10",
    borderSoft: "border-amber-300/20",
    ringSoft: "ring-amber-300/25",
    shadowGlow: "shadow-amber-500/10",
  },
  slate: {
    icon: "text-white/80",
    text: "text-white/80",
    bgSoft: "bg-white/5",
    borderSoft: "border-white/10",
    ringSoft: "ring-white/15",
  },
} as const;

export function toneOrDefault(tone?: Tone): Tone {
  return tone ?? "slate";
}
