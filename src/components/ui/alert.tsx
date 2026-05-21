import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "group/alert relative grid w-full gap-0.5 rounded-lg border px-2.5 py-2 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        info:
          "bg-informative-50 text-informative-900 border-informative-200 *:data-[slot=alert-description]:text-informative-700 dark:bg-informative-500/10 dark:text-informative-100 dark:border-informative-500/30 dark:*:data-[slot=alert-description]:text-informative-200",
        success:
          "bg-success-50 text-success-900 border-success-200 *:data-[slot=alert-description]:text-success-700 dark:bg-success-500/10 dark:text-success-100 dark:border-success-500/30 dark:*:data-[slot=alert-description]:text-success-200",
        warning:
          "bg-warning-50 text-warning-900 border-warning-200 *:data-[slot=alert-description]:text-warning-700 dark:bg-warning-500/10 dark:text-warning-100 dark:border-warning-500/30 dark:*:data-[slot=alert-description]:text-warning-200",
        destructive:
          "bg-error-50 text-error-900 border-error-200 *:data-[slot=alert-description]:text-error-700 dark:bg-error-500/10 dark:text-error-100 dark:border-error-500/30 dark:*:data-[slot=alert-description]:text-error-200 *:[svg]:text-current",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-sm text-balance text-muted-foreground md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
        className
      )}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute top-2 right-2", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction }
