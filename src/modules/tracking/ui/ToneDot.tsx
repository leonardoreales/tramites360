// src/modules/tracking/ui/ToneDot.tsx
import { cn } from "@/lib/utils";
import { TONE_STYLES, toneOrDefault, type Tone } from "@/config/design-tokens";

import type { StageStatus } from "../tracking.types";

type ToneDotProps = {
  tone?: Tone;
  status: StageStatus;
  className?: string;
};

export default function ToneDot({ tone, status, className = "" }: ToneDotProps) {
  const t = TONE_STYLES[toneOrDefault(tone)];

  const base = cn(
    "h-3.5 w-3.5 rounded-full",
    "ring-1",
    status === "done" ? "opacity-95" : status === "active" ? "opacity-100" : "opacity-70",
    t.bgSoft,
    t.ringSoft
  );

  const extra =
    status === "active"
      ? cn("shadow-[0_0_0_1px_rgba(255,255,255,0.08)]", t.shadowGlow)
      : status === "blocked"
        ? "bg-amber-500/15 ring-amber-300/25"
        : "";

  return <span className={cn(base, extra, className)} aria-hidden="true" />;
}
