// src/modules/tracking/hooks/useRoutePoints.ts
import * as React from "react";
import { VIEWBOX } from "../tracking.constants";

export type RoutePoint = {
  x: number;
  y: number;
  xPct: number;
  yPct: number;
};

export function useRoutePoints(count: number) {
  const pathRef = React.useRef<SVGPathElement | null>(null);
  const [points, setPoints] = React.useState<RoutePoint[]>([]);

  React.useEffect(() => {
    if (!pathRef.current) return;
    if (!count || count < 2) return;

    const path = pathRef.current;
    const total = path.getTotalLength();
    const out: RoutePoint[] = [];

    for (let i = 0; i < count; i += 1) {
      const t = i / (count - 1);
      const p = path.getPointAtLength(t * total);

      out.push({
        x: p.x,
        y: p.y,
        xPct: (p.x / VIEWBOX.w) * 100,
        yPct: (p.y / VIEWBOX.h) * 100,
      });
    }

    setPoints(out);
  }, [count]);

  return { pathRef, points };
}
