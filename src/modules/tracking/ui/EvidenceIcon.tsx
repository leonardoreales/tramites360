// src/modules/tracking/ui/EvidenceIcon.tsx
import { FileText, Flag, ShieldCheck } from "lucide-react";

import type { EvidenceKind } from "../tracking.types";

type EvidenceIconProps = {
  kind: EvidenceKind;
  className?: string;
};

export default function EvidenceIcon({ kind, className = "h-4 w-4" }: EvidenceIconProps) {
  if (kind === "radicado") return <Flag className={className} aria-hidden="true" />;
  if (kind === "pago") return <ShieldCheck className={className} aria-hidden="true" />;
  return <FileText className={className} aria-hidden="true" />;
}
