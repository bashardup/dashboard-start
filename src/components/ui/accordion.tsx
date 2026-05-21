import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { createContext, useContext } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"

/* ── Variant context ── */

type AccordionVariant = "transparent" | "rounded"

const AccordionVariantContext = createContext<AccordionVariant>("transparent")

/* ── CVA ── */

const accordionItemVariants = cva("", {
  variants: {
    variant: {
      transparent: "not-last:border-b",
      rounded: "mb-2 last:mb-0 rounded-2xl border border-border bg-muted/30 dark:bg-[#1C1D25] overflow-hidden",
    },
  },
  defaultVariants: { variant: "transparent" },
})

const accordionTriggerVariants = cva(
  "group/accordion-trigger relative flex flex-1 items-start justify-between rounded-lg border border-transparent text-left text-sm font-medium transition-all outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-disabled:pointer-events-none aria-disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground",
  {
    variants: {
      variant: {
        transparent: "py-2.5 hover:underline focus-visible:after:border-ring",
        rounded: "px-4 py-3 hover:bg-muted/50 dark:hover:bg-white/5",
      },
    },
    defaultVariants: { variant: "transparent" },
  }
)

const accordionContentVariants = cva(
  "overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up",
  {
    variants: {
      variant: {
        transparent: "",
        rounded: "",
      },
    },
    defaultVariants: { variant: "transparent" },
  }
)

const accordionContentInnerVariants = cva(
  "h-(--accordion-panel-height) pt-0 pb-2.5 data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
  {
    variants: {
      variant: {
        transparent: "",
        rounded: "px-4",
      },
    },
    defaultVariants: { variant: "transparent" },
  }
)

/* ── Components ── */

interface AccordionProps extends AccordionPrimitive.Root.Props, VariantProps<typeof accordionItemVariants> {}

function Accordion({ className, variant = "transparent", ...props }: AccordionProps) {
  return (
    <AccordionVariantContext.Provider value={variant ?? "transparent"}>
      <AccordionPrimitive.Root
        data-slot="accordion"
        className={cn("flex w-full flex-col", className)}
        {...props}
      />
    </AccordionVariantContext.Provider>
  )
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  const variant = useContext(AccordionVariantContext)
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(accordionItemVariants({ variant }), className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  const variant = useContext(AccordionVariantContext)
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(accordionTriggerVariants({ variant }), className)}
        {...props}
      >
        {children}
        <ChevronDownIcon data-slot="accordion-trigger-icon" className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden" />
        <ChevronUpIcon data-slot="accordion-trigger-icon" className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  const variant = useContext(AccordionVariantContext)
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className={cn(accordionContentVariants({ variant }))}
      {...props}
    >
      <div className={cn(accordionContentInnerVariants({ variant }), className)}>
        {children}
      </div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
