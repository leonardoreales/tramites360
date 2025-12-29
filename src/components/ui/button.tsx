/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { DESIGN_TOKENS } from "@/config/design-tokens";

const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap select-none font-semibold",
    DESIGN_TOKENS.radius.sm,
    DESIGN_TOKENS.transition.normal,
    DESIGN_TOKENS.focus.ring,
    "disabled:pointer-events-none disabled:opacity-50",
    "active:translate-y-0",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
  ),
  {
    variants: {
      variant: {
        // Alias "primary" + compat: "default" se ve como primary Trámite360.
        primary:
          "bg-gradient-to-r from-indigo-500 to-cyan-400 text-slate-950 shadow-lg shadow-indigo-500/10 hover:opacity-95 hover:-translate-y-0.5",
        default:
          "bg-gradient-to-r from-indigo-500 to-cyan-400 text-slate-950 shadow-lg shadow-indigo-500/10 hover:opacity-95 hover:-translate-y-0.5",

        secondary:
          "border border-white/15 bg-white/5 text-white shadow-sm hover:bg-white/10 hover:-translate-y-0.5",

        outline:
          "border border-white/15 bg-transparent text-white hover:bg-white/5 hover:-translate-y-0.5",

        ghost: "bg-transparent text-white hover:bg-white/5",

        link: "bg-transparent text-white underline underline-offset-4 hover:text-white/90",

        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:opacity-95 hover:-translate-y-0.5",
      },
      size: {
        // Compat: mantenemos keys de shadcn pero con tamaños más “producto”.
        default: "h-11 px-6 text-base",
        sm: cn("h-9 px-4 text-sm", DESIGN_TOKENS.radius.sm),
        lg: cn("h-14 px-8 text-lg", DESIGN_TOKENS.radius.sm),
        icon: cn("h-11 w-11", DESIGN_TOKENS.radius.sm),
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
