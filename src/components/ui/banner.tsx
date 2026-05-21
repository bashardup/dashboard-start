import * as React from "react"
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const bannerVariants = cva(
  "relative flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-sm",
  {
    variants: {
      variant: {
        info:
          "bg-informative-50 text-informative-900 border-informative-200 dark:bg-informative-500/10 dark:text-informative-100 dark:border-informative-500/30",
        success:
          "bg-success-50 text-success-900 border-success-200 dark:bg-success-500/10 dark:text-success-100 dark:border-success-500/30",
        warning:
          "bg-warning-50 text-warning-900 border-warning-200 dark:bg-warning-500/10 dark:text-warning-100 dark:border-warning-500/30",
        error:
          "bg-error-50 text-error-900 border-error-200 dark:bg-error-500/10 dark:text-error-100 dark:border-error-500/30",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
)

const iconColorByVariant: Record<NonNullable<BannerProps["variant"]>, string> = {
  info: "text-informative-600 dark:text-informative-300",
  success: "text-success-600 dark:text-success-300",
  warning: "text-warning-600 dark:text-warning-300",
  error: "text-error-600 dark:text-error-300",
}

const defaultIconByVariant: Record<NonNullable<BannerProps["variant"]>, React.ReactNode> = {
  info: <Info />,
  success: <CheckCircle2 />,
  warning: <AlertTriangle />,
  error: <XCircle />,
}

export interface BannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  /** Heading text. Optional — description alone is valid. */
  title?: string
  /** Body content. Plain string or rich nodes (links, code). */
  description?: React.ReactNode
  /** Trailing action node — typically a Button. Stays inline on desktop, stacks on mobile. */
  action?: React.ReactNode
  /** Renders an X button on the far right that calls onDismiss. */
  dismissible?: boolean
  /** Fires when the user clicks the dismiss (X) button. */
  onDismiss?: () => void
  /** Override the default variant icon. Pass null to render no icon. */
  icon?: React.ReactNode
}

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      className,
      variant = "info",
      title,
      description,
      action,
      dismissible,
      onDismiss,
      icon,
      children,
      ...props
    },
    ref
  ) => {
    const resolvedIcon = icon === undefined ? defaultIconByVariant[variant ?? "info"] : icon
    return (
      <div
        ref={ref}
        role="status"
        data-slot="banner"
        data-variant={variant}
        className={cn(bannerVariants({ variant }), className)}
        {...props}
      >
        {resolvedIcon !== null && resolvedIcon !== false && (
          <span
            aria-hidden
            className={cn(
              "mt-0.5 inline-flex shrink-0 [&_svg]:size-5",
              iconColorByVariant[variant ?? "info"]
            )}
          >
            {resolvedIcon}
          </span>
        )}

        <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-start sm:gap-4">
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            {title && (
              <p className="font-semibold leading-tight">{title}</p>
            )}
            {description && (
              <div className="leading-relaxed">{description}</div>
            )}
            {children}
          </div>
          {action && (
            <div className="shrink-0 sm:mt-0.5">{action}</div>
          )}
        </div>

        {dismissible && (
          <button
            type="button"
            aria-label="Dismiss"
            onClick={onDismiss}
            className={cn(
              "-mt-0.5 -me-1 inline-flex size-6 shrink-0 items-center justify-center rounded-md text-current/70 hover:bg-black/5 hover:text-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:hover:bg-white/10"
            )}
          >
            <X className="size-4" />
          </button>
        )}
      </div>
    )
  }
)
Banner.displayName = "Banner"

export { Banner, bannerVariants }
