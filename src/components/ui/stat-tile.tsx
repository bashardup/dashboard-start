import * as React from "react"
import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react"

import { cn } from "@/lib/utils"

/* ── Tone is the color signal: how this metric's delta should be interpreted.
   Pass deltaTone to override direction-based coloring — e.g. response-time down is positive. ── */

type Direction = "up" | "down" | "neutral"
type Tone = "positive" | "negative" | "neutral"

export interface StatTileDelta {
  /** Number or pre-formatted string ("+12%", "-18%", "+0.2"). */
  value: string | number
  /** Direction of change — drives the arrow icon. */
  direction: Direction
  /** Optional period label ("this week", "vs last month"). */
  label?: string
}

export interface StatTileProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick"> {
  label: string
  value: string | number
  delta?: StatTileDelta
  /**
   * Overrides direction-based coloring. Use when "down" is good for the metric (response time, churn).
   * Default — inferred from delta.direction: up=positive, down=negative, neutral=neutral.
   */
  deltaTone?: Tone
  icon?: React.ReactNode
  /** Array of numeric data points. Renders as a small inline SVG sparkline. */
  sparkline?: number[]
  /** Renders skeleton placeholders for label, value, delta, and sparkline. */
  loading?: boolean
  /** If set, the tile becomes a clickable button with hover affordance. */
  onClick?: () => void
}

/* ── Resolve the effective tone — explicit deltaTone wins over direction-based default ── */
function resolveTone(direction: Direction, override?: Tone): Tone {
  if (override) return override
  if (direction === "up") return "positive"
  if (direction === "down") return "negative"
  return "neutral"
}

const toneClasses: Record<Tone, string> = {
  positive: "text-success-600 dark:text-success-300",
  negative: "text-error-600 dark:text-error-300",
  neutral: "text-gray-500 dark:text-slate-400",
}

const arrowByDirection: Record<Direction, React.ReactNode> = {
  up: <ArrowUp className="size-3.5" />,
  down: <ArrowDown className="size-3.5" />,
  neutral: <ArrowRight className="size-3.5" />,
}

/* ── Sparkline: tiny inline SVG, viewBox 80×24, uses currentColor for stroke + fill. ── */
function Sparkline({ data, className }: { data: number[]; className?: string }) {
  if (data.length < 2) return null

  const w = 80
  const h = 24
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const xStep = w / (data.length - 1)

  const points = data.map((d, i) => {
    const x = i * xStep
    const y = h - ((d - min) / range) * (h - 2) - 1 // 1px padding top/bottom
    return [x, y] as const
  })

  const polyline = points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ")
  const area = `${polyline} ${w},${h} 0,${h}`

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      aria-hidden
      className={cn("text-primary-500 dark:text-primary-300 shrink-0", className)}
    >
      <polygon points={area} fill="currentColor" fillOpacity={0.12} />
      <polyline
        points={polyline}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const StatTile = React.forwardRef<HTMLDivElement, StatTileProps>(
  (
    {
      className,
      label,
      value,
      delta,
      deltaTone,
      icon,
      sparkline,
      loading,
      onClick,
      ...props
    },
    ref
  ) => {
    const interactive = Boolean(onClick) && !loading
    const Component: React.ElementType = interactive ? "button" : "div"

    const tone = delta ? resolveTone(delta.direction, deltaTone) : "neutral"

    return (
      <Component
        ref={ref as never}
        type={interactive ? "button" : undefined}
        onClick={interactive ? onClick : undefined}
        data-slot="stat-tile"
        className={cn(
          "flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-slate-900/40 p-5 text-start min-w-0",
          interactive &&
            "cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
          className
        )}
        {...(props as React.ComponentPropsWithoutRef<"div"> & React.ComponentPropsWithoutRef<"button">)}
      >
        {/* Header row: label + optional icon */}
        <div className="flex items-start justify-between gap-3">
          {loading ? (
            <span aria-hidden className="h-3 w-24 rounded bg-gray-200 dark:bg-white/10 animate-pulse" />
          ) : (
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground truncate">
              {label}
            </span>
          )}
          {icon && (
            <span
              aria-hidden
              className="shrink-0 inline-flex size-8 items-center justify-center rounded-lg bg-primary-50 text-primary-700 dark:bg-primary/15 dark:text-primary-300 [&_svg]:size-4"
            >
              {icon}
            </span>
          )}
        </div>

        {/* Value */}
        <div>
          {loading ? (
            <span aria-hidden className="block h-8 w-32 rounded bg-gray-200 dark:bg-white/10 animate-pulse" />
          ) : (
            <p className="text-3xl font-semibold tabular-nums text-gray-900 dark:text-slate-50 truncate">
              {value}
            </p>
          )}
        </div>

        {/* Delta + sparkline row */}
        <div className="flex items-end justify-between gap-3">
          {loading ? (
            <span aria-hidden className="h-3 w-20 rounded bg-gray-200 dark:bg-white/10 animate-pulse" />
          ) : delta ? (
            <div className={cn("inline-flex items-center gap-1 text-xs font-medium", toneClasses[tone])}>
              {arrowByDirection[delta.direction]}
              <span className="tabular-nums">{delta.value}</span>
              {delta.label && (
                <span className="font-normal text-muted-foreground">{delta.label}</span>
              )}
            </div>
          ) : (
            <span />
          )}

          {loading ? (
            <span aria-hidden className="h-6 w-20 rounded bg-gray-200 dark:bg-white/10 animate-pulse" />
          ) : (
            sparkline && sparkline.length >= 2 && <Sparkline data={sparkline} />
          )}
        </div>
      </Component>
    )
  }
)
StatTile.displayName = "StatTile"

export { StatTile }
