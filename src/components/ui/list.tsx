import * as React from "react"

import { cn } from "@/lib/utils"

type Density = "dense" | "comfortable"

const ListContext = React.createContext<{ density: Density; divided: boolean }>({
  density: "comfortable",
  divided: false,
})

interface ListRootProps extends React.HTMLAttributes<HTMLUListElement> {
  /** Row spacing. dense for compact rows (tables, side rails); comfortable for primary lists. */
  density?: Density
  /** Adds a divider line between adjacent items. */
  divided?: boolean
}

const ListRoot = React.forwardRef<HTMLUListElement, ListRootProps>(
  ({ className, density = "comfortable", divided = false, children, ...props }, ref) => (
    <ListContext.Provider value={{ density, divided }}>
      <ul
        ref={ref}
        data-slot="list"
        data-density={density}
        className={cn(
          "flex flex-col rounded-xl border border-gray-200 bg-white dark:border-white/10 dark:bg-slate-900/40 overflow-hidden",
          className
        )}
        {...props}
      >
        {children}
      </ul>
    </ListContext.Provider>
  )
)
ListRoot.displayName = "List"

interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  /** Adds hover state, focus ring, and tabindex. Pair with onClick. */
  interactive?: boolean
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, interactive, onClick, children, ...props }, ref) => {
    const { density, divided } = React.useContext(ListContext)
    const padding = density === "dense" ? "px-3 py-2" : "px-4 py-3"

    function handleKeyDown(e: React.KeyboardEvent<HTMLLIElement>) {
      if (!interactive || !onClick) return
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        onClick(e as unknown as React.MouseEvent<HTMLLIElement>)
      }
    }

    return (
      <li
        ref={ref}
        data-slot="list-item"
        role={interactive ? "button" : undefined}
        tabIndex={interactive ? 0 : undefined}
        onClick={interactive ? onClick : undefined}
        onKeyDown={interactive ? handleKeyDown : undefined}
        className={cn(
          "flex items-center gap-3",
          padding,
          divided && "border-b border-gray-200 last:border-0 dark:border-white/5",
          interactive &&
            "cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
          className
        )}
        {...props}
      >
        {children}
      </li>
    )
  }
)
ListItem.displayName = "List.Item"

const ListLeading = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="list-leading"
      className={cn("shrink-0 inline-flex items-center justify-center [&_svg]:size-4", className)}
      {...props}
    />
  )
)
ListLeading.displayName = "List.Leading"

const ListContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="list-content"
      className={cn("flex min-w-0 flex-1 flex-col gap-0.5", className)}
      {...props}
    />
  )
)
ListContent.displayName = "List.Content"

const ListTitle = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      data-slot="list-title"
      className={cn("truncate text-sm font-medium text-gray-900 dark:text-slate-100", className)}
      {...props}
    />
  )
)
ListTitle.displayName = "List.Title"

const ListDescription = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      data-slot="list-description"
      className={cn("truncate text-xs text-gray-500 dark:text-slate-400", className)}
      {...props}
    />
  )
)
ListDescription.displayName = "List.Description"

const ListTrailing = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="list-trailing"
      className={cn("shrink-0 inline-flex items-center gap-2", className)}
      {...props}
    />
  )
)
ListTrailing.displayName = "List.Trailing"

/* ── Compose into a single dot-notation API: List, List.Item, List.Leading, etc. ── */

type ListComponent = typeof ListRoot & {
  Item: typeof ListItem
  Leading: typeof ListLeading
  Content: typeof ListContent
  Title: typeof ListTitle
  Description: typeof ListDescription
  Trailing: typeof ListTrailing
}

const List = Object.assign(ListRoot, {
  Item: ListItem,
  Leading: ListLeading,
  Content: ListContent,
  Title: ListTitle,
  Description: ListDescription,
  Trailing: ListTrailing,
}) as ListComponent

export {
  List,
  ListItem,
  ListLeading,
  ListContent,
  ListTitle,
  ListDescription,
  ListTrailing,
}
