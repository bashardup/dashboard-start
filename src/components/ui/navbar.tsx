import * as React from "react"

import { cn } from "@/lib/utils"

/* ── Root — sticky | static, full-width container with border ── */

interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  /** Stick to the top of the scroll container. Pair with a parent with overflow set. */
  sticky?: boolean
}

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className, sticky, ...props }, ref) => (
    <header
      ref={ref}
      data-slot="navbar"
      className={cn(
        "z-30 flex h-14 w-full items-center gap-4 border-b border-border bg-background px-4 sm:px-6",
        sticky && "sticky top-0",
        className
      )}
      {...props}
    />
  )
)
Navbar.displayName = "Navbar"

/* ── Brand — logo + product name slot ── */

const NavbarBrand = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="navbar-brand"
      className={cn("flex shrink-0 items-center gap-2 text-sm font-semibold", className)}
      {...props}
    />
  )
)
NavbarBrand.displayName = "NavbarBrand"

/* ── Links — horizontal nav slot, optional ── */

const NavbarLinks = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <nav
      ref={ref}
      data-slot="navbar-links"
      className={cn("hidden flex-1 items-center gap-1 md:flex", className)}
      {...props}
    />
  )
)
NavbarLinks.displayName = "NavbarLinks"

interface NavbarLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean
}

const NavbarLink = React.forwardRef<HTMLAnchorElement, NavbarLinkProps>(
  ({ className, active, ...props }, ref) => (
    <a
      ref={ref}
      data-slot="navbar-link"
      data-active={active || undefined}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex h-9 items-center rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors",
        "hover:bg-muted hover:text-foreground",
        "data-[active=true]:bg-muted data-[active=true]:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      {...props}
    />
  )
)
NavbarLink.displayName = "NavbarLink"

/* ── Trailing slot — search / user menu / actions push to the right ── */

const NavbarTrailing = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="navbar-trailing"
      className={cn("ms-auto flex shrink-0 items-center gap-2", className)}
      {...props}
    />
  )
)
NavbarTrailing.displayName = "NavbarTrailing"

/* ── Search slot — wraps an Input or Combobox trigger ── */

const NavbarSearch = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="navbar-search"
      className={cn("hidden flex-1 max-w-md md:flex", className)}
      {...props}
    />
  )
)
NavbarSearch.displayName = "NavbarSearch"

export { Navbar, NavbarBrand, NavbarLinks, NavbarLink, NavbarTrailing, NavbarSearch }
