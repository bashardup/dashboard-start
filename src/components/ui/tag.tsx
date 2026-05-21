import * as React from "react"
import { X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const tagVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border font-medium transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
  {
    variants: {
      variant: {
        default:
          "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 data-[selected=true]:bg-gray-200 data-[selected=true]:border-gray-300 dark:bg-white/10 dark:text-slate-200 dark:border-white/10 dark:hover:bg-white/15 dark:data-[selected=true]:bg-white/20 dark:data-[selected=true]:border-white/20",
        primary:
          "bg-primary-50 text-primary-700 border-primary-200 hover:bg-primary-100 data-[selected=true]:bg-primary-100 data-[selected=true]:border-primary-300 dark:bg-primary/20 dark:text-primary-200 dark:border-primary/30 dark:hover:bg-primary/30 dark:data-[selected=true]:bg-primary/40",
        secondary:
          "bg-secondary-50 text-secondary-700 border-secondary-200 hover:bg-secondary-100 data-[selected=true]:bg-secondary-100 data-[selected=true]:border-secondary-300 dark:bg-secondary-300/15 dark:text-secondary-100 dark:border-secondary-300/30 dark:hover:bg-secondary-300/25 dark:data-[selected=true]:bg-secondary-300/35",
        success:
          "bg-success-50 text-success-700 border-success-200 hover:bg-success-100 data-[selected=true]:bg-success-100 data-[selected=true]:border-success-300 dark:bg-success-300/15 dark:text-success-200 dark:border-success-300/30 dark:hover:bg-success-300/25 dark:data-[selected=true]:bg-success-300/35",
        warning:
          "bg-warning-50 text-warning-700 border-warning-200 hover:bg-warning-100 data-[selected=true]:bg-warning-100 data-[selected=true]:border-warning-300 dark:bg-warning-500/15 dark:text-warning-200 dark:border-warning-500/30 dark:hover:bg-warning-500/25 dark:data-[selected=true]:bg-warning-500/35",
        destructive:
          "bg-error-50 text-error-700 border-error-200 hover:bg-error-100 data-[selected=true]:bg-error-100 data-[selected=true]:border-error-300 dark:bg-error-500/15 dark:text-error-200 dark:border-error-500/30 dark:hover:bg-error-500/25 dark:data-[selected=true]:bg-error-500/35",
      },
      size: {
        sm: "h-6 px-2 text-xs",
        md: "h-7 px-2.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface TagProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onClick">,
    VariantProps<typeof tagVariants> {
  /** Visual selected state — applies a stronger background and border. */
  selected?: boolean
  /** Renders an X button on the right. Calls onRemove (does not call onClick). */
  removable?: boolean
  /** Fires when the user clicks the remove (X) button. */
  onRemove?: () => void
  /** Leading icon (typically Lucide). */
  icon?: React.ReactNode
  /** Fires when the user clicks the tag body. If set, renders as a <button>. */
  onClick?: () => void
}

const Tag = React.forwardRef<HTMLElement, TagProps>(
  (
    {
      className,
      variant,
      size,
      selected,
      removable,
      onRemove,
      icon,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    const isInteractive = Boolean(onClick)
    const Component = isInteractive ? "button" : "span"

    return (
      <Component
        ref={ref as never}
        type={isInteractive ? "button" : undefined}
        data-slot="tag"
        data-selected={selected || undefined}
        onClick={onClick}
        className={cn(
          tagVariants({ variant, size }),
          isInteractive && "cursor-pointer",
          className
        )}
        {...props}
      >
        {icon && (
          <span aria-hidden className="-ms-0.5 inline-flex shrink-0 [&_svg]:size-3.5">
            {icon}
          </span>
        )}
        <span>{children}</span>
        {removable && (
          <button
            type="button"
            aria-label="Remove"
            onClick={(e) => {
              e.stopPropagation()
              onRemove?.()
            }}
            className="-me-1 inline-flex size-4 items-center justify-center rounded-full text-current/70 hover:bg-black/10 hover:text-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:hover:bg-white/15"
          >
            <X className="size-3" />
          </button>
        )}
      </Component>
    )
  }
)
Tag.displayName = "Tag"

export { Tag, tagVariants }
