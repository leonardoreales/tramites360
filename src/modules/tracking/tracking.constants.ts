// src/modules/tracking/tracking.constants.ts

export const VIEWBOX = { w: 1000, h: 220 } as const;

export const PATH_D =
  "M 60 150 C 220 40 380 40 520 150 S 820 200 940 110";

export const CODE_PREFIX = "T360-" as const;

export const CODE_REGEX = /^T360-[A-Z0-9]{5}$/;
