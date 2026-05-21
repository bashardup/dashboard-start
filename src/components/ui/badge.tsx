import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default:     "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary:   "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive: "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline:     "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost:       "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link:        "text-primary underline-offset-4 hover:underline",
        // status variants
        success: "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
        warning: "bg-amber-500/10 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
        danger:  "bg-red-500/10 text-red-700 dark:bg-red-500/15 dark:text-red-400",
        info:    "bg-blue-500/10 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
        pending: "bg-orange-500/10 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400",
        neutral: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
      },
      size: {
        sm: "h-4 px-1.5 text-[10px] gap-0.5 rounded-full [&>svg]:size-2.5!",
        md: "h-5 px-2 text-xs gap-1 rounded-full",
        lg: "h-6 px-3 text-sm gap-1.5 rounded-full [&>svg]:size-3.5!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

function Badge({
  className,
  variant = "default",
  size = "md",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant, size }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
