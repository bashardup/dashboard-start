import {
  ComposedChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Customized,
} from "recharts"
import { cn } from "@/lib/utils"
import { makeDot, makeActiveDot } from "@/components/ui/chart-elements/chart-dot"

/* ── Types ── */

export interface StraightLineChartSeries {
  key: string
  label: string
  color: string
  dashed?: boolean
  area?: boolean
}

interface StraightLineChartProps {
  data: Record<string, string | number>[]
  series: StraightLineChartSeries[]
  xKey: string
  height?: number
  className?: string
  delay?: number
}

/* ── Tooltip ── */

function fmt(v: number) {
  return v >= 1000 ? `${(v / 1000).toFixed(1)}K` : String(v)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ChartTooltip({ active, payload, label, colorMap }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-border bg-popover/80 backdrop-blur-sm px-4 py-3 shadow-lg text-xs min-w-[140px]">
      <p className="font-semibold text-foreground mb-2">{label}</p>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center justify-between gap-4 mb-1 last:mb-0">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full shrink-0" style={{ background: colorMap?.[p.dataKey] ?? p.color }} />
            <span className="text-muted-foreground">{p.name}</span>
          </div>
          <span className="font-mono font-bold text-foreground">{fmt(Number(p.value))}</span>
        </div>
      ))}
    </div>
  )
}

export function StraightLineChart({
  data,
  series,
  xKey,
  height = 280,
  className,
  delay = 0,
}: StraightLineChartProps) {
  const animationBegin = delay * 1000
  const colorMap = Object.fromEntries(series.map(s => [s.key, s.color]))

  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <Customized component={() => (
            <defs>
              {series.map(s => (
                <linearGradient key={s.key} id={`area-grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor={s.color} stopOpacity="0.35" />
                  <stop offset="100%" stopColor={s.color} stopOpacity="0"    />
                </linearGradient>
              ))}
            </defs>
          )} />

          <CartesianGrid vertical={false} strokeDasharray="4 4" stroke="var(--border)" />
          <XAxis
            dataKey={xKey}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          />
          <Tooltip
            content={<ChartTooltip colorMap={colorMap} />}
            cursor={{ stroke: "var(--border)", strokeWidth: 1, strokeDasharray: "4 3" }}
          />

          {series.map(s => (
            <Area
              key={s.key}
              type="linear"
              dataKey={s.key}
              name={s.label}
              stroke={s.color}
              strokeWidth={s.dashed ? 2 : 2.5}
              fill={`url(#area-grad-${s.key})`}
              {...({ animationBegin } as object)}
              strokeDasharray={s.dashed ? "6 4" : undefined}
              dot={makeDot(s.color)}
              activeDot={makeActiveDot(s.color)}
              // style={{ filter: `drop-shadow(0 0 6px ${s.color})` }}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex items-center justify-center gap-5 mt-3">
        {series.map(s => (
          <div key={s.key} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="size-2 rounded-full shrink-0" style={{ background: s.color, boxShadow: `0 0 5px ${s.color}` }} />
            {s.label}
          </div>
        ))}
      </div>
    </div>
  )
}
