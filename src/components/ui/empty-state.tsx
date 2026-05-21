import * as React from "react"
import { Inbox, SearchX, AlertTriangle, Lock } from "lucide-react"

import { cn } from "@/lib/utils"

type EmptyVariant = "no-results" | "no-data" | "error" | "permission"

const defaultIconByVariant: Record<EmptyVariant, React.ReactNode> = {
  "no-results": <SearchX />,
  "no-data": <Inbox />,
  error: <AlertTriangle />,
  permission: <Lock />,
}

const iconTintByVariant: Record<EmptyVariant, string> = {
  "no-results": "text-gray-500 bg-gray-100 dark:text-slate-300 dark:bg-white/5",
  "no-data": "text-primary-700 bg-primary-50 dark:text-primary-200 dark:bg-primary/15",
  error: "text-error-700 bg-error-50 dark:text-error-200 dark:bg-error-500/15",
  permission: "text-warning-700 bg-warning-50 dark:text-warning-200 dark:bg-warning-500/15",
}

export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Selection model — determines default icon and icon tint when no `icon` prop is set. */
  variant?: EmptyVariant
  /** Icon or illustration. Defaults to a Lucide glyph per variant. Pass null to render no icon. */
  icon?: React.ReactNode
  /** Required heading. Keep it short and specific. */
  title: string
  /** Optional body text. Supports rich content (links, code, lists). */
  description?: React.ReactNode
  /** Primary action — typically a Button. Sits centred below the description. */
  action?: React.ReactNode
  /** Secondary action — typically a "ghost" / outline Button. Renders to the right of the primary action. */
  secondaryAction?: React.ReactNode
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      className,
      variant = "no-data",
      icon,
      title,
      description,
      action,
      secondaryAction,
      ...props
    },
    ref
  ) => {
    const resolvedIcon = icon === undefined ? defaultIconByVariant[variant] : icon
    return (
      <div
        ref={ref}
        data-slot="empty-state"
        data-variant={variant}
        className={cn(
          "flex flex-col items-center justify-center gap-4 text-center py-12 px-4",
          className
        )}
        {...props}
      >
        {resolvedIcon !== null && resolvedIcon !== false && (
          <div
            aria-hidden
            className={cn(
              "flex size-14 items-center justify-center rounded-full [&_svg]:size-7",
              iconTintByVariant[variant]
            )}
          >
            {resolvedIcon}
          </div>
        )}

        <div className="flex max-w-md flex-col gap-1.5">
          <h3 className="text-base font-semibold text-gray-900 dark:text-slate-100">{title}</h3>
          {description && (
            <div className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed">
              {description}
            </div>
          )}
        </div>

        {(action || secondaryAction) && (
          <div className="flex flex-wrap items-center justify-center gap-2">
            {action}
            {secondaryAction}
          </div>
        )}
      </div>
    )
  }
)
EmptyState.displayName = "EmptyState"

export { EmptyState }
