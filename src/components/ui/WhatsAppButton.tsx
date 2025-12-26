import { buildWhatsAppUrl, type WhatsAppIntent } from "../../config/whatsapp";

type WhatsAppButtonProps = {
  label?: string;
  intent?: WhatsAppIntent;
  message?: string;
  phoneE164NoPlus?: string;
  className?: string;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
};

export default function WhatsAppButton({
  label = "Cotizar por WhatsApp",
  intent = "diagnostico",
  message,
  phoneE164NoPlus,
  className = "",
  variant = "primary",
  fullWidth = false,
}: WhatsAppButtonProps) {
  const href = buildWhatsAppUrl({ intent, message, phoneE164NoPlus });

  const base =
    "inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40";
  const width = fullWidth ? "w-full" : "";
  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-indigo-500 to-cyan-400 text-slate-950 hover:opacity-90"
      : "border border-white/15 bg-white/5 text-white hover:bg-white/10";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={[base, styles, width, className].filter(Boolean).join(" ")}
    >
      {label}
    </a>
  );
}
