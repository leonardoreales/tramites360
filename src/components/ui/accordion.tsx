import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { DESIGN_TOKENS } from "@/config/design-tokens";

const Accordion = AccordionPrimitive.Root;

type AccordionItemProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Item
> & {
  variant?: "default" | "card";
};

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(({ className, variant = "default", ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      variant === "default" && "border-b border-white/10",
      variant === "card" &&
        cn(
          DESIGN_TOKENS.radius.lg,
          DESIGN_TOKENS.border.subtle,
          DESIGN_TOKENS.surface.glassLight,
          DESIGN_TOKENS.shadow.subtle,
          "mb-3 overflow-hidden"
        ),
      className
    )}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

type AccordionTriggerProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Trigger
> & {
  showChevron?: boolean;
};

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ className, children, showChevron = true, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex flex-1 items-center justify-between gap-3 py-4 text-left text-sm font-semibold text-white/90 transition-all duration-300",
        "hover:text-white",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
        "[&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      {showChevron ? (
        <ChevronDown className="h-4 w-4 shrink-0 text-white/60 transition-transform duration-200" />
      ) : null}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-sm text-white/70 leading-relaxed",
      "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    )}
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
