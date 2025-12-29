// src/modules/tracking/sections/SearchDockSection.tsx
import { AlertCircle, Search, ShieldCheck } from "lucide-react";

import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { DESIGN_TOKENS } from "@/config/design-tokens";

type SearchDockSectionProps = {
  codeInput: string;
  setCodeInput: (v: string) => void;

  isLoading: boolean;
  error: string | null;

  onLookup: (code: string) => void | Promise<void>;
  onReset: () => void;

  waHelpMessage: string;
};

export default function SearchDockSection({
  codeInput,
  setCodeInput,
  isLoading,
  error,
  onLookup,
  onReset,
  waHelpMessage,
}: SearchDockSectionProps) {
  return (
    <div className="mt-8">
      <Card
        className={cn(
          "border-white/10 bg-white/5 text-white",
          DESIGN_TOKENS.radius.lg,
          "backdrop-blur"
        )}
      >
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
                onClick={() => void onLookup(codeInput)}
                disabled={isLoading || !codeInput}
              >
                {isLoading ? "Consultando..." : "Consultar"}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="h-12"
                onClick={onReset}
                disabled={isLoading}
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
                      message={waHelpMessage}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
