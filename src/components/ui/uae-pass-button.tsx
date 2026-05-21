import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * UAE Pass official button — 3 appearance variants × 3 corner-radius options.
 * Source: https://docs.uaepass.ae/guidelines/design-guidelines/button-guidelines
 *
 * Variant   | Background      | Text      | Border
 * --------- | --------------- | --------- | ------
 * white     | #FFFFFF         | #1A1A1A   | none
 * outline   | #FFFFFF         | #1A1A1A   | #D4D4D4
 * black     | #1A1A1A         | #FFFFFF   | none
 *
 * Radius    | Value
 * --------- | ------
 * rectangle | 0px
 * default   | 12px
 * pill      | 999px
 */

const uaePassButtonVariants = cva(
  // Base — layout, typography, transition
  [
    "inline-flex items-center justify-center gap-3",
    "h-12 px-5 w-full",
    "text-sm font-semibold select-none",
    "cursor-pointer transition-all duration-150",
    "outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#26D07C]",
    "disabled:opacity-50 disabled:pointer-events-none",
    "active:scale-[0.98]",
  ],
  {
    variants: {
      variant: {
        white: [
          "bg-white text-[#1A1A1A]",
          "shadow-[0_1px_4px_rgba(0,0,0,0.12)]",
          "hover:bg-[#F5F5F5]",
        ],
        outline: [
          "bg-white text-[#1A1A1A]",
          "border border-[#D4D4D4]",
          "shadow-[0_1px_3px_rgba(0,0,0,0.08)]",
          "hover:bg-[#F5F5F5]",
        ],
        black: [
          "bg-[#1A1A1A] text-white",
          "shadow-[0_1px_4px_rgba(0,0,0,0.30)]",
          "hover:bg-[#2C2C2C]",
        ],
      },
      radius: {
        rectangle: "rounded-none",
        default: "rounded-xl",   // 12px per official spec
        pill: "rounded-full",    // 999px per official spec
      },
    },
    defaultVariants: {
      variant: "white",
      radius: "pill",
    },
  }
)

// UAE Pass official SVG logo (fingerprint + brand mark)
function UAEPassIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-6 shrink-0", className)}
      aria-hidden="true"
    >
      {/* Green circle background */}
      <circle cx="20" cy="20" r="20" fill="#26D07C" />
      {/* Fingerprint paths */}
      <path
        d="M20 10C14.477 10 10 14.477 10 20C10 22.5 10.9 24.8 12.4 26.6"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M20 13C16.134 13 13 16.134 13 20C13 21.9 13.75 23.6 15 24.9"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M20 16C17.791 16 16 17.791 16 20C16 21.3 16.6 22.45 17.5 23.25"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M20 19C20 19 20 22 20 26"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M20 16C22.209 16 24 17.791 24 20C24 21.3 23.4 22.45 22.5 23.25L20 26"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M20 13C23.866 13 27 16.134 27 20C27 22.4 25.9 24.5 24.2 25.9"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M20 10C25.523 10 30 14.477 30 20C30 22.9 28.8 25.5 26.9 27.4"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

export interface UAEPassButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    VariantProps<typeof uaePassButtonVariants> {
  label?: string
}

const UAEPassButton = React.forwardRef<HTMLButtonElement, UAEPassButtonProps>(
  (
    {
      className,
      variant,
      radius,
      label = "Sign In with UAE Pass",
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(uaePassButtonVariants({ variant, radius }), className)}
        {...props}
      >
        <UAEPassIcon />
        <span>{label}</span>
      </button>
    )
  }
)
UAEPassButton.displayName = "UAEPassButton"

export { UAEPassButton, uaePassButtonVariants }
