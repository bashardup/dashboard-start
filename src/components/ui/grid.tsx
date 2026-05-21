import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const gridVariants = cva("grid", {
  variants: {
    cols: {
      "1": "grid-cols-1",
      "2": "grid-cols-2",
      "3": "grid-cols-3",
      "4": "grid-cols-4",
      "5": "grid-cols-5",
      "6": "grid-cols-6",
      "12": "grid-cols-12",
    },
    gap: {
      "0": "gap-0",
      "1": "gap-1",
      "2": "gap-2",
      "3": "gap-3",
      "4": "gap-4",
      "5": "gap-5",
      "6": "gap-6",
      "8": "gap-8",
      "10": "gap-10",
      "12": "gap-12",
    },
  },
  defaultVariants: {
    cols: "1",
    gap: "4",
  },
})

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  /** Render as a different element (section, ul, ol…). Default "div". */
  as?: React.ElementType
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols, gap, as, ...props }, ref) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Component: any = as ?? "div"
    return (
      <Component
        ref={ref}
        data-slot="grid"
        data-cols={cols ?? "1"}
        data-gap={gap ?? "4"}
        className={cn(gridVariants({ cols, gap }), className)}
        {...props}
      />
    )
  }
)
Grid.displayName = "Grid"

export { Grid, gridVariants }
