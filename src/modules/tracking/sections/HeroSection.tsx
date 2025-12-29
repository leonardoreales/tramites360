// src/modules/tracking/sections/HeroSection.tsx
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { BRAND } from "@/config/brand";

type HeroSectionProps = {
  waMessage: string;
};

export default function HeroSection({ waMessage }: HeroSectionProps) {
  return (
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
          Ingresa tu <span className="font-semibold text-white">Case ID</span>{" "}
          (por ejemplo <span className="font-semibold">T360-7H2K9</span>) para ver
          hitos, acciones pendientes y evidencias.
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
          Tu código se genera al formalizar (aceptación de T&C). No usamos
          placa/cédula en público.
        </p>
        <p className="mt-3 text-xs text-white/50">
          {BRAND.name} te guía, coordina y evidencía — no es entidad de tránsito.
        </p>
      </div>
    </div>
  );
}
