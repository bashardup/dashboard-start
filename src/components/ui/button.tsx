import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "relative font-mono font-bold overflow-hidden inline-flex gap-2 items-center justify-center whitespace-nowrap  text-sm ring-offset-background transition-all ease-custom-ease duration-300  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 disabled:text-[#121212] disabled:bg-[#DEDEE1]   active:before:opacity-100 active:before:bg-black/10  active:before:translate-y-[60%] before:absolute before:inset-0 before:bg-[#4A4459] before:bg-opacity-10  before:rounded-[100%] before:pointer-events-none before:opacity-0 before:translate-y-full before:scale-x-[150%] before:scale-y-[140%] before:transition-all before:duration-300 active:before:duration-300  ",
  {
    variants: {
      variant: {
        // Figma "Buttons_new" hierarchy
        filled: "bg-primary text-white hover:bg-primary-600 dark:bg-primary-500 dark:text-white dark:hover:bg-primary-600 dark:active:bg-primary-700 dark:focus-visible:bg-primary-500 dark:disabled:bg-primary-500/40 dark:disabled:text-white/60",
        filledDestructive: "bg-destructive text-error-600 hover:bg-destructive/90 dark:text-error-50",
        filledWarning: "bg-warning text-warning-500 hover:bg-warning/90 dark:bg-warning-500 dark:text-white dark:hover:bg-warning-600 dark:active:bg-warning-700 dark:focus-visible:bg-warning-500 dark:disabled:bg-warning-500/40 dark:disabled:text-white/60",
        tonal: "bg-primary-50 text-primary-600 hover:bg-primary-100 dark:bg-primary/30 dark:text-sage-100 dark:hover:bg-primary/40",
        gray: "bg-gray-50 text-gray-700 hover:bg-gray-100 dark:bg-white/10 dark:text-white dark:hover:bg-white/15",
        outlineGray: "border border-gray-300 bg-gray-10 text-gray-700 hover:bg-gray-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-700",
        outlineGreen: "border-[1.5px] border-primary-600 bg-transparent text-primary-600 hover:bg-primary-50 dark:border-primary-300 dark:text-primary-300 dark:hover:bg-primary/10",
        text: "bg-transparent text-gray-700 hover:bg-gray-50 dark:text-slate-50 dark:hover:bg-slate-800",
        linkGray: "bg-transparent text-gray-700 hover:underline dark:text-slate-100",
        linkGreen: "bg-transparent text-primary-600 hover:underline dark:text-primary",
      },
      size: {
        // Figma "Buttons_new" sizes
        xs: "h-8 rounded-[6px] focus-visible:rounded-[12px] active:rounded-[12px] px-[10px] py-[6px] text-sm gap-1",
        sm: "rounded-[8px] focus-visible:rounded-[16px] active:rounded-[16px] before:translate-x-[100%] active:before:translate-x-[30%]  h-9 px-4 text-xs",
        md: "rounded-[12px] focus-visible:rounded-[24px] active:rounded-[24px] before:translate-x-[100%] active:before:translate-x-[30%]  h-[40px]  px-4 text-xs",
        lg: "h-11 rounded-[12px] focus-visible:rounded-[24px] active:rounded-[24px] px-4 py-[10px] text-sm gap-1.5",
        xl: "h-12 rounded-[14px] focus-visible:rounded-[28px] active:rounded-[28px] px-[18px] py-3 text-sm gap-1.5",
        xxl: "h-14 rounded-[16px] focus-visible:rounded-[32px] active:rounded-[32px] px-[22px] py-4 text-sm gap-2",
        "icon-xs": "size-8 rounded-[6px] active:rounded-[12px] before:translate-x-[0%] active:before:translate-x-[0%]",
        "icon-sm": "size-9 rounded-[8px] active:rounded-[16px] before:translate-x-[0%] active:before:translate-x-[0%]",
        "icon-md": "size-10 rounded-[12px] active:rounded-[24px] before:translate-x-[0%] active:before:translate-x-[0%]",
        "icon-lg": "size-11 rounded-[12px] active:rounded-[24px] before:translate-x-[0%] active:before:translate-x-[0%]",
        "icon-xl": "size-12 rounded-[14px] active:rounded-[28px] before:translate-x-[0%] active:before:translate-x-[0%]",
        "icon-xxl": "size-14 rounded-[16px] active:rounded-[32px] before:translate-x-[0%] active:before:translate-x-[0%]",
      },
    },
    compoundVariants: [
      {
        variant: ["linkGray", "linkGreen"],
        className: "h-auto p-0 border-0 bg-transparent",
      },
    ],
    defaultVariants: {
      variant: "filled",
      size: "xl",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
