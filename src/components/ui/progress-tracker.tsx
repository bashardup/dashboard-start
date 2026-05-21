import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export type StepStatus = "completed" | "in-progress" | "pending"

const StepContext = React.createContext<{ isFirst: boolean; isLast: boolean; index: number }>({
  isFirst: false,
  isLast: false,
  index: 0,
})

const statusStyles: Record<StepStatus, { dot: string; badgeClass: string }> = {
  completed: {
    dot: "bg-primary border-primary",
    badgeClass: "bg-primary/10 text-primary dark:bg-primary/20 border-0",
  },
  "in-progress": {
    dot: "bg-warning-400 border-warning-400",
    badgeClass: "bg-warning-50 text-warning-600 dark:bg-warning-400/20 dark:text-warning-400 border-0",
  },
  pending: {
    dot: "bg-gray-25 border-border",
    badgeClass: "bg-muted text-muted-foreground border-0",
  },
}

export interface ProgressTrackerItemProps {
  status: StepStatus
  title: string
  statusLabel?: string
  description?: string
  children?: React.ReactNode
  className?: string
}

function ProgressTrackerItem({
  status,
  title,
  statusLabel,
  description,
  children,
  className,
}: ProgressTrackerItemProps) {
  const { isFirst, isLast, index } = React.useContext(StepContext)

  return (
    <motion.div
      data-slot="progress-tracker-item"
      className={cn(
        "relative grid grid-cols-[auto_1fr] gap-x-4 px-6",
        "has-data-[slot=progress-tracker-header]:grid-cols-[auto_1fr_auto]",
        "bg-white dark:bg-slate-800/60 rounded-3xl border border-[#ffffff03] overflow-hidden",
        className
      )}
      initial={{ opacity: 0, y: (index+1)*60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <span className="pointer-events-none absolute top-0 left-0 h-full w-full dark:bg-[linear-gradient(171deg,#26d07c1a_-10%,transparent_50%)]" />

      <div className="row-span-2 col-start-1 flex flex-col items-center justify-center self-start pt-6 z-10 w-3 h-full relative">
        {/* top line */}
        <motion.div
          className={cn(
            "w-px absolute top-0 left-1/2 -translate-x-1/2 origin-top",
            isFirst ? "opacity-0" : "bg-black/10 dark:bg-white/10",
          )}
          style={{ height: 30 }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.3, delay: index * 0.3 + 0.3, ease: "easeOut" }}
        />

        {/* dot */}
        <motion.div
          className={cn("size-3 rounded-full border-2 shrink-0 relative", statusStyles[status].dot)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: index * 0.3 + 0.3, type: "spring", stiffness: 300, damping: 18 }}
        >
          {/* pulse ring for in-progress */}
          {status === "in-progress" && (
            <motion.span
              className="absolute inset-0 rounded-full bg-warning-400/40"
              animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
            />
          )}
        </motion.div>

        {/* bottom line */}
        <motion.div
          className={cn(
            "w-px flex-1 origin-top",
            isLast ? "opacity-0" : "bg-black/10 dark:bg-white/10",
          )}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.3, ease: "easeOut" }}
        />
      </div>

      <motion.div
        className="col-start-2 row-start-1 flex min-h-[88px] py-5 has-data-[slot=progress-tracker-content]:pb-3 z-10"
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.3, delay: index * 0.1 + 0.2, ease: "easeOut" }}
      >
        <div className="min-w-0">
          <p className={cn("font-mono font-bold text-sm leading-tight", status === "pending" && "text-muted-foreground")}>
            {title}
          </p>
          {statusLabel && (
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <Badge className={cn("h-auto px-2 py-0.5 text-xs font-medium rounded-md", statusStyles[status].badgeClass)}>
                {statusLabel}
              </Badge>
              {description && <span className="text-xs text-muted-foreground">{description}</span>}
            </div>
          )}
        </div>
      </motion.div>
      {children}
    </motion.div>
  )
}

function ProgressTrackerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="progress-tracker-header"
      className={cn("col-start-3 row-start-1 self-center z-10 shrink-0", className)}
      {...props}
    />
  )
}

function ProgressTrackerContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="progress-tracker-content"
      className={cn(
        "col-start-2 col-span-2 row-start-2 pb-5 z-10",
        "text-sm text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function ProgressTracker({ children, className }: { children: React.ReactNode; className?: string }) {
  const items = React.Children.toArray(children)
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {items.map((child, i) => (
        <StepContext.Provider key={i} value={{ isFirst: i === 0, isLast: i === items.length - 1, index: i }}>
          {child}
        </StepContext.Provider>
      ))}
    </div>
  )
}

export { ProgressTracker, ProgressTrackerItem, ProgressTrackerHeader, ProgressTrackerContent }
