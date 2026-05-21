import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"

/* ── Root — controlled or uncontrolled open state ──────────────────── */

interface ComboboxRootProps extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root> {}

function Combobox(props: ComboboxRootProps) {
  return <PopoverPrimitive.Root {...props} />
}
Combobox.displayName = "Combobox"

/* ── Trigger — wrap whatever element you want to open the dropdown ── */

const ComboboxTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <PopoverPrimitive.Trigger
    ref={ref}
    data-slot="combobox-trigger"
    className={cn(className)}
    {...props}
  >
    {children}
  </PopoverPrimitive.Trigger>
))
ComboboxTrigger.displayName = "ComboboxTrigger"

/* ── Content — popover content that hosts the cmdk Command tree ──── */

const ComboboxContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
    /** Forwarded to the internal cmdk filter — pass false to disable client-side filtering (e.g. for async). */
    shouldFilter?: boolean
  }
>(({ className, align = "start", sideOffset = 4, shouldFilter, children, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      data-slot="combobox-content"
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-(--radix-popover-trigger-width) min-w-[200px] overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-lg outline-none",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        className
      )}
      {...props}
    > 
      <CommandPrimitive shouldFilter={shouldFilter} className="flex flex-col">
        {children}
      </CommandPrimitive>
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
))
ComboboxContent.displayName = "ComboboxContent"

/* ── Input — search input rendered at the top of the popover ─────── */

const ComboboxInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div
    data-slot="combobox-input-wrapper"
    className="flex items-center gap-2 border-b border-border px-3"
    cmdk-input-wrapper=""
  >
    <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
    <CommandPrimitive.Input
      ref={ref}
      data-slot="combobox-input"
      className={cn(
        "flex h-9 w-full bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
))
ComboboxInput.displayName = "ComboboxInput"

/* ── List — scrollable list region wrapping all items ─────────────── */

const ComboboxList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    data-slot="combobox-list"
    className={cn("max-h-[280px] overflow-y-auto p-1", className)}
    {...props}
  />
))
ComboboxList.displayName = "ComboboxList"

/* ── Empty — shown when no items match the current query ─────────── */

const ComboboxEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    data-slot="combobox-empty"
    className={cn("py-4 px-3 text-center text-sm text-muted-foreground", className)}
    {...props}
  />
))
ComboboxEmpty.displayName = "ComboboxEmpty"

/* ── Loading — opt-in loading row; renders when present ──────────── */

const ComboboxLoading = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Loading>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Loading>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Loading
    ref={ref}
    data-slot="combobox-loading"
    className={cn("py-4 px-3 text-center text-sm text-muted-foreground", className)}
    {...props}
  />
))
ComboboxLoading.displayName = "ComboboxLoading"

/* ── Group — heading + a collection of items ───────────────────────  */

const ComboboxGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    data-slot="combobox-group"
    className={cn(
      "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    )}
    {...props}
  />
))
ComboboxGroup.displayName = "ComboboxGroup"

/* ── Separator — divider between groups ─────────────────────────── */

const ComboboxSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    data-slot="combobox-separator"
    className={cn("my-1 h-px bg-border", className)}
    {...props}
  />
))
ComboboxSeparator.displayName = "ComboboxSeparator"

/* ── Item — a single selectable row ──────────────────────────────── */

const ComboboxItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    data-slot="combobox-item"
    className={cn(
      "relative flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none",
      "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground",
      "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      className
    )}
    {...props}
  />
))
ComboboxItem.displayName = "ComboboxItem"

export {
  Combobox,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxInput,
  ComboboxList,
  ComboboxEmpty,
  ComboboxLoading,
  ComboboxGroup,
  ComboboxSeparator,
  ComboboxItem,
}
