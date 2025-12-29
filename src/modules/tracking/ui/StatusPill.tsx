// src/modules/tracking/ui/StatusPill.tsx
import type { LucideIcon } from "lucide-react";
import { AlertCircle, CheckCircle2, Clock3 } from "lucide-react";

import { cn } from "@/lib/utils";
import { DESIGN_TOKENS } from "@/config/design-tokens";

import type { StageStatus } from "../tracking.types";
import { statusBadgeClass, statusLabel } from "../tracking.helpers";

type StatusPillProps = {
  status: StageStatus;
  className?: string;
};

const STATUS_ICON: Record<StageStatus, LucideIcon> = {
  done: CheckCircle2,
  active: Clock3,
  blocked: AlertCircle,
  pending: Clock3,
};

export default function StatusPill({ status, className = "" }: StatusPillProps) {
  const Icon = STATUS_ICON[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2",
        DESIGN_TOKENS.radius.pill,
        "border px-3 py-1 text-xs font-semibold",
        statusBadgeClass(status),
        className
      )}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {statusLabel(status)}
    </span>
  );
}
