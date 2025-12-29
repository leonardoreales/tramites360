// src/modules/tracking/TrackingPage.tsx
import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Clock3,
  FileText,
  Flag,
  MapPinned,
  Search,
  ShieldCheck,
  Truck,
} from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { DESIGN_TOKENS, TONE_STYLES, toneOrDefault } from "@/config/design-tokens";

import { PATH_D, VIEWBOX } from "./tracking.constants";
import { actorLabel, formatDateTime } from "./tracking.helpers";
import EvidenceIcon from "./ui/EvidenceIcon";
import StatusPill from "./ui/StatusPill";
import ToneDot from "./ui/ToneDot";
import { useCaseLookup } from "./hooks/useCaseLookup";
import { useRoutePoints } from "./hooks/useRoutePoints";

export default function TrackingPage() {
  const { codeInput, setCodeInput, isLoading, error, data, handleLookup, reset } = useCaseLookup();

  const stagesCount = data?.stages?.length ?? 0;
  const { pathRef, points } = useRoutePoints(stagesCount);

  const currentIndex = useMemo(() => {
    if (!data?.stages?.length) return 0;
    const idx = data.stages.findIndex((s) => s.id === data.stageCurrentId);
    return idx >= 0 ? idx : 0;
  }, [data]);

  const currentStage = useMemo(() => {
    if (!data?.stages?.length) return null;
    return data.stages.find((s) => s.id === data.stageCurrentId) ?? data.stages[0] ?? null;
  }, [data]);

  const carPoint = points[currentIndex];

  const waMessage = data
    ? `Hola, quiero consultar el estado de mi caso ${data.code}.`
    : "Hola, quiero consultar el estado de mi caso (tengo mi código de seguimiento).";

  const showResults = !!data && !!currentStage;

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* Ambient background (consistente con Home) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-40 right-[-120px] h-[520px] w-[520px] rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent" />
      </div>

      <div className="relative z-10">
        <Header />

        <main className="mx-auto max-w-6xl px-6 py-12 md:py-16">
          {/* Top */}
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Seguimiento 360
                <span className="ml-2 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/70">
                  por código
                </span>
              </p>

              <h1 className="mt-5 text-3xl font-black tracking-tight md:text-5xl">
                Consulta tu{" "}
                <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-cyan-300 bg-clip-text text-transparent">
                  progreso
                </span>{" "}
                en tiempo real
              </h1>

              <p className="mt-3 max-w-2xl text-white/70">
                Ingresa tu <span className="font-semibold text-white">Case ID</span> (por ejemplo{" "}
                <span className="font-semibold">T360-7H2K9</span>) para ver hitos, acciones pendientes y evidencias.
              </p>
            </div>

            <div className="md:w-[340px]">
              <WhatsAppButton
                label="Necesito ayuda"
                variant="secondary"
                fullWidth
                intent="general"
                message={waMessage}
              />
              <p className="mt-2 text-xs text-white/50">
                Tu código se genera al formalizar (aceptación de T&C). No usamos placa/cédula en público.
              </p>
            </div>
          </div>

          {/* SearchDock */}
          <div className="mt-8">
            <Card className={cn("border-white/10 bg-white/5 text-white", DESIGN_TOKENS.radius.lg, "backdrop-blur")}>
              <CardContent className="p-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-center">
                  <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
                    <input
                      value={codeInput}
                      onChange={(e) => setCodeInput(e.target.value)}
                      placeholder="Ej: T360-7H2K9"
                      className={cn(
                        "w-full",
                        DESIGN_TOKENS.radius.sm,
                        "border border-white/15 bg-slate-950/40 px-10 py-3 text-base text-white placeholder:text-white/40",
                        "outline-none",
                        "focus:border-white/25 focus:ring-2 focus:ring-white/20"
                      )}
                      inputMode="text"
                      autoComplete="off"
                      aria-label="Código de seguimiento"
                    />
                    <div className="mt-2 flex items-center gap-2 text-xs text-white/50">
                      <ShieldCheck className="h-4 w-4" />
                      Acceso por código: más privacidad, menos fricción.
                    </div>
                  </div>

                  <div className="flex gap-2 md:justify-end">
                    <Button
                      type="button"
                      variant="primary"
                      className="h-12"
                      onClick={() => void handleLookup(codeInput)}
                      disabled={isLoading || !codeInput}
                    >
                      {isLoading ? "Consultando..." : "Consultar"}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className="h-12"
                      onClick={reset}
                      disabled={isLoading && !data}
                    >
                      Limpiar
                    </Button>
                  </div>
                </div>

                {error ? (
                  <div className="mt-4 rounded-2xl border border-amber-300/20 bg-amber-500/10 p-4 text-amber-200">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="mt-0.5 h-5 w-5" />
                      <div>
                        <div className="font-extrabold">No pudimos encontrar ese código</div>
                        <div className="mt-1 text-sm text-amber-100/80">{error}</div>
                        <div className="mt-3">
                          <WhatsAppButton
                            label="Hablar con un asesor"
                            variant="secondary"
                            intent="general"
                            message={`Hola, no pude consultar mi caso. Mi código es: ${codeInput || "_____"}`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          {showResults ? (
            <div className="mt-10 grid gap-6 lg:grid-cols-12">
              {/* Left: Route + stages */}
              <div className="lg:col-span-7">
                <Card className={cn("border-white/10 bg-white/5 text-white", DESIGN_TOKENS.radius.lg, "backdrop-blur")}>
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <Truck className="h-5 w-5 text-cyan-200" />
                          <div className="text-lg font-extrabold">Ruta 360</div>
                        </div>
                        <p className="mt-1 text-sm text-white/70">
                          Caso <span className="font-semibold text-white">{data.code}</span> ·{" "}
                          <span className="inline-flex items-center gap-2">
                            <MapPinned className="h-4 w-4 text-white/60" />
                            {data.cityLabel}
                          </span>
                        </p>
                        <p className="mt-1 text-xs text-white/50">
                          Última actualización: {formatDateTime(data.lastUpdatedISO)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <StatusPill status={currentStage!.status} />
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                          <Clock3 className="h-4 w-4" />
                          ETA: {currentStage!.eta ?? "—"}
                        </span>
                      </div>
                    </div>

                    {/* Map */}
                    <div className="relative mt-6">
                      <div className={cn("relative w-full", DESIGN_TOKENS.radius.md, "border border-white/10 bg-slate-900/30 p-4")}>
                        <svg
                          viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`}
                          className="h-[210px] w-full"
                          role="img"
                          aria-label="Mapa de progreso del trámite"
                        >
                          <defs>
                            <linearGradient id="t360-path" x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0%" stopColor="rgba(99,102,241,0.55)" />
                              <stop offset="55%" stopColor="rgba(56,189,248,0.55)" />
                              <stop offset="100%" stopColor="rgba(34,211,238,0.55)" />
                            </linearGradient>
                            <filter id="glow">
                              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                              <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                              </feMerge>
                            </filter>
                          </defs>

                          {/* Base path */}
                          <path
                            ref={pathRef}
                            d={PATH_D}
                            fill="none"
                            stroke="url(#t360-path)"
                            strokeWidth="10"
                            strokeLinecap="round"
                            opacity="0.45"
                          />
                          <path
                            d={PATH_D}
                            fill="none"
                            stroke="rgba(255,255,255,0.14)"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />

                          {/* Stations */}
                          {points.map((pt, idx) => {
                            const st = data.stages[idx];
                            const t = TONE_STYLES[toneOrDefault(st.tone)];
                            const isDone = st.status === "done";
                            const isActive = st.status === "active";
                            const isBlocked = st.status === "blocked";

                            const fill = isBlocked
                              ? "rgba(245,158,11,0.25)"
                              : isActive
                                ? "rgba(56,189,248,0.20)"
                                : isDone
                                  ? "rgba(16,185,129,0.20)"
                                  : "rgba(255,255,255,0.10)";

                            const ring = isBlocked
                              ? "rgba(253,230,138,0.45)"
                              : isActive
                                ? "rgba(125,211,252,0.55)"
                                : isDone
                                  ? "rgba(110,231,183,0.55)"
                                  : "rgba(255,255,255,0.20)";

                            return (
                              <g key={st.id} filter={isActive ? "url(#glow)" : undefined}>
                                <circle cx={pt.x} cy={pt.y} r={18} fill={fill} />
                                <circle cx={pt.x} cy={pt.y} r={18} fill="transparent" stroke={ring} strokeWidth="2" />
                                <circle
                                  cx={pt.x}
                                  cy={pt.y}
                                  r={9}
                                  fill={
                                    t.icon.includes("emerald")
                                      ? "rgba(16,185,129,0.65)"
                                      : "rgba(99,102,241,0.55)"
                                  }
                                  opacity={isDone ? 0.9 : isActive ? 0.9 : 0.45}
                                />
                                <text
                                  x={pt.x}
                                  y={pt.y + 40}
                                  textAnchor="middle"
                                  fontSize="12"
                                  fill="rgba(255,255,255,0.65)"
                                >
                                  {idx + 1}
                                </text>
                              </g>
                            );
                          })}
                        </svg>

                        {/* Car (HTML overlay) */}
                        {carPoint ? (
                          <motion.div
                            className="pointer-events-none absolute"
                            style={{
                              left: `${carPoint.xPct}%`,
                              top: `${carPoint.yPct}%`,
                              transform: "translate(-50%, -50%)",
                            }}
                            animate={{ left: `${carPoint.xPct}%`, top: `${carPoint.yPct}%` }}
                            transition={{ type: "spring", stiffness: 220, damping: 22 }}
                          >
                            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/15 bg-gradient-to-r from-indigo-500/30 to-cyan-400/25 shadow-[0_0_0_1px_rgba(255,255,255,0.10),0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur">
                              <Truck className="h-6 w-6 text-cyan-200" />
                            </div>
                          </motion.div>
                        ) : null}
                      </div>

                      {/* Stage chips */}
                      <div className="mt-4 grid gap-2 md:grid-cols-2">
                        {data.stages.map((s, idx) => (
                          <div
                            key={s.id}
                            className={cn(
                              "flex items-start gap-3",
                              DESIGN_TOKENS.radius.md,
                              "border border-white/10 bg-slate-900/30 p-4",
                              "transition hover:bg-slate-900/45"
                            )}
                          >
                            <div className="mt-1 flex items-center gap-2">
                              <ToneDot tone={s.tone} status={s.status} />
                              <span className="text-xs font-black text-white/60">{idx + 1}</span>
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                  <div className="truncate font-extrabold">{s.title}</div>
                                  <div className="mt-0.5 text-sm text-white/60">{s.subtitle}</div>
                                </div>
                                <StatusPill status={s.status} />
                              </div>

                              <div className="mt-3 text-sm text-white/70">
                                {s.status === "done" && s.doneSummary ? s.doneSummary : null}
                                {s.status === "active" && s.nextAction ? `Siguiente paso: ${s.nextAction}` : null}
                                {s.status === "blocked" ? (
                                  <span className="text-amber-200">
                                    Acción requerida: {s.nextAction ?? "revisar con asesor"}
                                  </span>
                                ) : null}
                                {s.status === "pending" ? "Aún no inicia. Te avisamos al avanzar." : null}
                              </div>

                              {s.notes?.length ? (
                                <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-white/50">
                                  {s.notes.map((n) => (
                                    <li key={n}>{n}</li>
                                  ))}
                                </ul>
                              ) : null}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right: Current + events + evidences */}
              <div className="lg:col-span-5">
                <div className="space-y-6">
                  {/* Current */}
                  <Card className={cn("border-white/10 bg-white/5 text-white", DESIGN_TOKENS.radius.lg, "backdrop-blur")}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-lg font-extrabold">Estado actual</div>
                          <div className="mt-1 text-white/70">{currentStage!.title}</div>
                        </div>
                        <StatusPill status={currentStage!.status} />
                      </div>

                      <div className="mt-4 rounded-2xl border border-white/10 bg-slate-900/30 p-4">
                        <div className="text-sm text-white/70">
                          {currentStage!.status === "blocked" ? (
                            <>
                              Tu caso está <span className="font-semibold text-amber-200">bloqueado</span>. Normalmente es
                              por documento, firma o dato pendiente. Apenas lo resolvamos, avanzamos sin perder continuidad.
                            </>
                          ) : (
                            <>
                              Estamos en <span className="font-semibold text-cyan-200">proceso</span>. La próxima actualización
                              llega al completar el siguiente hito.
                            </>
                          )}
                        </div>

                        <div className="mt-4 flex flex-col gap-2">
                          <div className="text-xs text-white/50">Acción sugerida</div>
                          <div className="text-sm text-white/80">
                            {currentStage!.nextAction ?? "Mantente atento a la próxima actualización."}
                          </div>

                          <div className="mt-3">
                            <WhatsAppButton
                              label={currentStage!.status === "blocked" ? "Resolver bloqueo por WhatsApp" : "Pedir actualización"}
                              variant="primary"
                              fullWidth
                              intent="general"
                              message={`${waMessage} Etapa actual: ${currentStage!.title}.`}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-2 text-xs text-white/50">
                        <ShieldCheck className="h-4 w-4" />
                        Transparencia: Trámite360 no es entidad de tránsito; te guiamos, coordinamos y evidenciamos.
                      </div>
                    </CardContent>
                  </Card>

                  {/* Events */}
                  <Card className={cn("border-white/10 bg-white/5 text-white", DESIGN_TOKENS.radius.lg, "backdrop-blur")}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2">
                        <Clock3 className="h-5 w-5 text-white/70" />
                        <div className="text-lg font-extrabold">Bitácora</div>
                      </div>
                      <p className="mt-2 text-sm text-white/60">
                        Registro breve de avances. Lo importante: siempre hay “siguiente paso”.
                      </p>

                      <div className="mt-4 space-y-3">
                        {data.events.map((e, i) => (
                          <div
                            key={`${e.atISO}-${i}`}
                            className={cn(
                              "rounded-2xl border border-white/10 bg-slate-900/30 p-4",
                              "transition hover:bg-slate-900/45"
                            )}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="text-sm font-semibold text-white/80">{actorLabel(e.actor)}</div>
                              <div className="text-xs text-white/50">{formatDateTime(e.atISO)}</div>
                            </div>
                            <div className="mt-2 text-sm text-white/70">{e.message}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Evidences */}
                  <Card className={cn("border-white/10 bg-white/5 text-white", DESIGN_TOKENS.radius.lg, "backdrop-blur")}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-white/70" />
                        <div className="text-lg font-extrabold">Evidencias</div>
                      </div>
                      <p className="mt-2 text-sm text-white/60">
                        Se habilitan al avanzar. Cuando esté disponible, verás el soporte aquí.
                      </p>

                      <div className="mt-4 space-y-2">
                        {data.evidences.map((ev) => (
                          <div
                            key={ev.id}
                            className={cn(
                              "flex items-center justify-between gap-3",
                              DESIGN_TOKENS.radius.md,
                              "border border-white/10 bg-slate-900/30 p-4"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <span className={cn("grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5")}>
                                <EvidenceIcon kind={ev.kind} />
                              </span>
                              <div>
                                <div className="font-semibold">{ev.label}</div>
                                <div className="text-xs text-white/50">
                                  {ev.available ? "Disponible" : "Pendiente por etapa"}
                                </div>
                              </div>
                            </div>

                            <Button
                              variant={ev.available ? "secondary" : "outline"}
                              size="sm"
                              disabled={!ev.available}
                              title={ev.available ? "Abrir soporte" : "Aún no disponible"}
                              onClick={() => {
                                // En producción: abrir URL firmada / Drive con permisos.
                                // Hoy: mock (no hacemos nada).
                              }}
                            >
                              {ev.available ? "Ver" : "—"}
                            </Button>
                          </div>
                        ))}
                      </div>

                      <div className="mt-5 rounded-2xl border border-white/10 bg-slate-900/30 p-4 text-xs text-white/50">
                        <div className="flex items-start gap-3">
                          <Flag className="mt-0.5 h-4 w-4 text-white/60" />
                          <div>
                            <div className="font-semibold text-white/70">Tip</div>
                            Este módulo está listo para conectarse a backend. Solo cambia el mock por una API real, sin tocar
                            el diseño.
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Back to home (temporal, sin router) */}
                  <div className="flex items-center justify-between gap-3">
                    <a
                      href="/"
                      className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                    >
                      Volver al inicio
                    </a>

                    <Button variant="link" className="text-white/70" onClick={reset}>
                      Consultar otro código
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {/* Empty state (when no lookup yet) */}
          {!data && !error ? (
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                {
                  icon: ShieldCheck,
                  title: "Privado por diseño",
                  text: "Tu progreso se consulta por Case ID, no por placa/cédula pública.",
                },
                {
                  icon: Truck,
                  title: "Ruta visual 360",
                  text: "Carrito + estaciones: siempre sabes qué pasó y qué sigue.",
                },
                {
                  icon: Flag,
                  title: "Evidencias al avanzar",
                  text: "Comprobantes y soportes se habilitan por etapa, con trazabilidad.",
                },
              ].map((x) => (
                <Card
                  key={x.title}
                  className="rounded-3xl border-white/10 bg-white/5 text-white transition hover:bg-white/[0.07] hover:-translate-y-0.5"
                >
                  <CardContent className="p-6">
                    <x.icon className="h-6 w-6 text-cyan-200" />
                    <div className="mt-3 text-lg font-extrabold">{x.title}</div>
                    <div className="mt-2 text-sm text-white/70">{x.text}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : null}
        </main>

        <Footer />
      </div>
    </div>
  );
}
