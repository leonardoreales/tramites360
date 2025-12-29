import { buildWhatsAppUrl, type WhatsAppIntent } from "../../config/whatsapp";
import { Button } from "./button";

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

  const width = fullWidth ? "w-full" : "";

  // Preservamos el look actual (sin rediseñar) pero usamos la base accesible de shadcn Button.
  const stylePrimary =
    "bg-gradient-to-r from-indigo-500 to-cyan-400 text-slate-950 hover:opacity-90";
  const styleSecondary =
    "border border-white/15 bg-white/5 text-white hover:bg-white/10";

  const styles = variant === "primary" ? stylePrimary : styleSecondary;

  return (
    <Button
      asChild
      variant={variant === "primary" ? "default" : "secondary"}
      className={[styles, width, className].filter(Boolean).join(" ")}
    >
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
        {label}
      </a>
    </Button>
  );
}
