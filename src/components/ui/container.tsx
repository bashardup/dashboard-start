import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const containerVariants = cva("mx-auto w-full px-4 sm:px-6 lg:px-8", {
  variants: {
    size: {
      sm: "max-w-screen-sm",   // 640px
      md: "max-w-screen-md",   // 768px
      lg: "max-w-screen-lg",   // 1024px
      xl: "max-w-screen-xl",   // 1280px
      "2xl": "max-w-screen-2xl", // 1536px
      full: "max-w-none",
    },
  },
  defaultVariants: {
    size: "lg",
  },
})

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  /** Render as a different element (section, main, article…). Default "div". */
  as?: React.ElementType
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, as, ...props }, ref) => {
    // Polymorphic root — widen Component to any so the JSX typer doesn't narrow
    // its prop set down to the intersection of every ElementType (which would be empty).
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Component: any = as ?? "div"
    return (
      <Component
        ref={ref}
        data-slot="container"
        data-size={size ?? "lg"}
        className={cn(containerVariants({ size }), className)}
        {...props}
      />
    )
  }
)
Container.displayName = "Container"

export { Container, containerVariants }
