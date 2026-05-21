import * as React from "react"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

/* ── Root nav + list ── */

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  )
}

function PaginationItem(props: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

/* ── Link button — looks like a Button, renders as <a> ── */

interface PaginationLinkProps extends React.ComponentProps<"a"> {
  isActive?: boolean
  size?: "sm" | "md"
}

function PaginationLink({
  className,
  isActive,
  size = "md",
  ...props
}: PaginationLinkProps) {
  return (
    <Button
      asChild
      variant={isActive ? "tonal" : "text"}
      size={size}
      className={cn(className)}
    >
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive || undefined}
      {...props}
    />
    </Button>
  )
}

/* ── Prev / Next / First / Last shortcuts ── */

function PaginationPrevious({ className, children, ...props }: PaginationLinkProps) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      className={cn("gap-1 px-3", className)}
      {...props}
    >
      <ChevronLeft className="size-4" aria-hidden />
      {children ?? <span>Previous</span>}
    </PaginationLink>
  )
}

function PaginationNext({ className, children, ...props }: PaginationLinkProps) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      className={cn("gap-1 px-3", className)}
      {...props}
    >
      {children ?? <span>Next</span>}
      <ChevronRight className="size-4" aria-hidden />
    </PaginationLink>
  )
}

function PaginationFirst({ className, ...props }: PaginationLinkProps) {
  return (
    <PaginationLink
      aria-label="Go to first page"
      className={cn("px-2.5", className)}
      {...props}
    >
      <ChevronsLeft className="size-4" aria-hidden />
    </PaginationLink>
  )
}

function PaginationLast({ className, ...props }: PaginationLinkProps) {
  return (
    <PaginationLink
      aria-label="Go to last page"
      className={cn("px-2.5", className)}
      {...props}
    >
      <ChevronsRight className="size-4" aria-hidden />
    </PaginationLink>
  )
}

/* ── Ellipsis for skipped page ranges ── */

function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex h-9 w-9 items-center justify-center text-muted-foreground", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationFirst,
  PaginationLast,
  PaginationEllipsis,
}
