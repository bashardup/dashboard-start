import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const stackVariants = cva("flex", {
  variants: {
    direction: {
      row: "flex-row",
      column: "flex-col",
      "row-reverse": "flex-row-reverse",
      "column-reverse": "flex-col-reverse",
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
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    wrap: {
      true: "flex-wrap",
      false: "flex-nowrap",
    },
  },
  defaultVariants: {
    direction: "column",
    gap: "4",
    wrap: false,
  },
})

export interface StackProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof stackVariants> {
  /** Render as a different element (section, ul, ol…). Default "div". */
  as?: React.ElementType
  /** Element rendered between each child as a separator. */
  divider?: React.ReactElement
  children?: React.ReactNode
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    { className, direction, gap, align, justify, wrap, as, divider, children, ...props },
    ref
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Component: any = as ?? "div"
    const items = divider
      ? React.Children.toArray(children)
          .filter((c): c is React.ReactElement => React.isValidElement(c))
          .flatMap((child, i, arr) =>
            i < arr.length - 1
              ? [child, React.cloneElement(divider, { key: `divider-${i}` })]
              : [child]
          )
      : children

    return (
      <Component
        ref={ref}
        data-slot="stack"
        data-direction={direction ?? "column"}
        data-gap={gap ?? "4"}
        className={cn(stackVariants({ direction, gap, align, justify, wrap }), className)}
        {...props}
      >
        {items}
      </Component>
    )
  }
)
Stack.displayName = "Stack"

const HStack = React.forwardRef<HTMLDivElement, Omit<StackProps, "direction">>(
  ({ align = "center", ...props }, ref) => (
    <Stack ref={ref} direction="row" align={align} {...props} />
  )
)
HStack.displayName = "HStack"

const VStack = React.forwardRef<HTMLDivElement, Omit<StackProps, "direction">>(
  (props, ref) => <Stack ref={ref} direction="column" {...props} />
)
VStack.displayName = "VStack"

export { Stack, HStack, VStack, stackVariants }
