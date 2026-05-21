import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/* ── Sizing + tone via cva ── */

const spinnerVariants = cva("animate-spin shrink-0", {
  variants: {
    size: {
      xs: "size-3",
      sm: "size-4",
      md: "size-5",
      lg: "size-6",
      xl: "size-8",
    },
    tone: {
      default: "text-primary",
      muted: "text-muted-foreground",
      foreground: "text-foreground",
      destructive: "text-destructive",
      onPrimary: "text-primary-foreground",
    },
  },
  defaultVariants: {
    size: "md",
    tone: "default",
  },
})

export interface SpinnerProps
  extends Omit<React.SVGAttributes<SVGSVGElement>, "color">,
    VariantProps<typeof spinnerVariants> {
  /**
   * Optional accessible label. When set, the spinner is exposed to screen readers
   * with role="status". Default is decorative (aria-hidden).
   */
  label?: string
}

const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, size, tone, label, ...props }, ref) => {
    const decorative = !label
    return (
      <svg
        ref={ref}
        data-slot="spinner"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden={decorative ? true : undefined}
        role={decorative ? undefined : "status"}
        aria-label={label}
        className={cn(spinnerVariants({ size, tone }), className)}
        {...props}
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeOpacity={0.2}
          strokeWidth={3}
        />
        <path
          d="M12 2 A10 10 0 0 1 22 12"
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
        />
      </svg>
    )
  }
)
Spinner.displayName = "Spinner"

export { Spinner, spinnerVariants }
