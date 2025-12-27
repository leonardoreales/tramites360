import { BRAND } from "../../config/brand";
import { cn } from "@/lib/utils";
import { DESIGN_TOKENS } from "@/config/design-tokens";

type FooterLink = { label: string; href: string };

type BrandFooterExtras = {
  footerProductLinks?: FooterLink[];
  footerLegalLinks?: FooterLink[];
  contactEmail?: string;
  contactPhone?: string;
  footerTrustLine?: string;
};

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function isFooterLinkArray(v: unknown): v is FooterLink[] {
  return (
    Array.isArray(v) &&
    v.every(
      (x) =>
        x &&
        typeof x === "object" &&
        isNonEmptyString((x as { label?: unknown }).label) &&
        isNonEmptyString((x as { href?: unknown }).href)
    )
  );
}

export default function Footer() {
  // Sin `any`: extendemos BRAND de forma segura y no rompemos build si faltan llaves.
  const extras = BRAND as unknown as BrandFooterExtras;

  const productLinks: FooterLink[] = isFooterLinkArray(extras.footerProductLinks)
    ? extras.footerProductLinks
    : [
        { label: "Cómo funciona", href: "#como-funciona" },
        { label: "Beneficios", href: "#beneficios" },
        { label: "FAQ", href: "#faq" },
      ];

  const legalLinks: FooterLink[] = isFooterLinkArray(extras.footerLegalLinks)
    ? extras.footerLegalLinks
    : [];

  const contactEmail = extras.contactEmail;
  const contactPhone = extras.contactPhone;

  const trustLine = isNonEmptyString(extras.footerTrustLine)
    ? extras.footerTrustLine
    : "Hecho para claridad, confianza y cierre con soportes.";

  const hasLegal = legalLinks.length > 0;
  const hasContact = isNonEmptyString(contactEmail) || isNonEmptyString(contactPhone);

  return (
    <footer className={cn("border-t bg-slate-950/60", DESIGN_TOKENS.border.subtle)}>
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Marca */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "grid h-9 w-9 place-items-center bg-white/5 ring-1 ring-white/10",
                  DESIGN_TOKENS.radius.sm
                )}
                aria-hidden="true"
              >
                <span className="text-sm font-black">360</span>
              </div>

              <div className="leading-tight">
                <div className="font-black tracking-tight">{BRAND.name}</div>
                <div className="text-xs text-white/60">{BRAND.tagline}</div>
              </div>
            </div>

            <p className="mt-4 text-sm text-white/60">{trustLine}</p>

            <div className="mt-6 text-xs text-white/50">
              © {new Date().getFullYear()} {BRAND.name}
            </div>
          </div>

          {/* Producto */}
          <div>
            <div className="text-sm font-extrabold text-white/90">Producto</div>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {productLinks.map((l) => (
                <li key={`${l.href}-${l.label}`}>
                  <a className="hover:text-white" href={l.href}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <div className="text-sm font-extrabold text-white/90">Legal</div>

            {hasLegal ? (
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {legalLinks.map((l) => (
                  <li key={`${l.href}-${l.label}`}>
                    <a className="hover:text-white" href={l.href}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-white/60">
                Textos legales pendientes de configuración (términos, privacidad y cookies).
              </p>
            )}
          </div>

          {/* Contacto */}
          <div>
            <div className="text-sm font-extrabold text-white/90">Contacto</div>

            {hasContact ? (
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {isNonEmptyString(contactEmail) ? (
                  <li>
                    <a className="hover:text-white" href={`mailto:${contactEmail}`}>
                      {contactEmail}
                    </a>
                  </li>
                ) : null}

                {isNonEmptyString(contactPhone) ? (
                  <li>
                    <a className="hover:text-white" href={`tel:${contactPhone}`}>
                      {contactPhone}
                    </a>
                  </li>
                ) : null}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-white/60">
                Datos de contacto pendientes de configuración.
              </p>
            )}

            <div className={cn("mt-6 p-4", DESIGN_TOKENS.radius.md, "border border-white/10 bg-white/5")}>
              <div className="text-sm font-extrabold">Transparencia</div>
              <p className="mt-2 text-sm text-white/70">
                Trámite360 no es una entidad de tránsito. Es un servicio de acompañamiento y gestión.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-8 text-xs text-white/50">
          Diseñado para conversión en WhatsApp: beneficios → confianza → acción.
        </div>
      </div>
    </footer>
  );
}
