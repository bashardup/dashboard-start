import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Customized,
} from "recharts"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { cn } from "@/lib/utils"
import { RoundedBar } from "@/components/ui/chart-elements/rounded-bar"
import { makeDot, makeActiveDot } from "@/components/ui/chart-elements/chart-dot"

/* ── Types ── */

export interface ActivityComposedChartProps {
  data: Record<string, string | number>[]
  barKey: string
  barLabel: string
  barColor: string
  barSecondaryColor?: string
  lineKey: string
  lineLabel: string
  lineColor: string
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
function ChartTooltip({ active, payload, label, barColor, lineColor, barKey, lineKey }: any) {
  if (!active || !payload?.length) return null
  const colorMap: Record<string, string> = { [barKey]: barColor, [lineKey]: lineColor }
  return (
    <div className="rounded-xl border border-border bg-popover/80 backdrop-blur-sm px-4 py-3 shadow-lg text-xs min-w-[140px]">
      <p className="font-semibold text-foreground mb-2">{label}</p>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center justify-between gap-4 mb-1 last:mb-0">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full shrink-0" style={{ background: colorMap[String(p.dataKey)] ?? p.color }} />
            <span className="text-muted-foreground">{p.name}</span>
          </div>
          <span className="font-mono font-bold text-foreground">{fmt(Number(p.value))}</span>
        </div>
      ))}
    </div>
  )
}

/* ── Public component ── */

export function ActivityComposedChart({
  data,
  barKey,
  barLabel,
  barColor,
  barSecondaryColor,
  lineKey,
  lineLabel,
  lineColor,
  xKey,
  height = 280,
  className,
  delay = 0,
}: ActivityComposedChartProps) {
  const animationBegin = delay * 1000
  const BAR_GRAD = `composed-bar-grad-${barKey}`
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })

  return (
    <div ref={ref} className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart data={data} barCategoryGap="30%" margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <Customized component={() => (
            <defs>
              <linearGradient id={BAR_GRAD} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor={barSecondaryColor ?? barColor} stopOpacity="1" />
                <stop offset="100%" stopColor={barColor}                      stopOpacity="1" />
              </linearGradient>
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
            content={
              <ChartTooltip
                barColor={barColor}
                lineColor={lineColor}
                barKey={barKey}
                lineKey={lineKey}
              />
            }
            cursor={false}
          />

          <Bar
            dataKey={barKey}
            name={barLabel}
            fill={`url(#${BAR_GRAD})`}
            isAnimationActive={false}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            shape={(props: any) => <RoundedBar {...props} fill={`url(#${BAR_GRAD})`} />}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            activeBar={(props: any) => <RoundedBar {...props} fill={`url(#${BAR_GRAD})`} entrance={false} />}
          />

          <Line
            dataKey={lineKey}
            name={lineLabel}
            type="monotone"
            stroke={lineColor}
            strokeWidth={2.5}
            dot={makeDot(lineColor)}
            activeDot={makeActiveDot(lineColor)}
            isAnimationActive={inView}
            {...({ animationBegin } as object)}
          />
        </ComposedChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex items-center justify-center gap-5 mt-3">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="size-2 rounded-full shrink-0" style={{ background: barColor, boxShadow: `0 0 5px ${barColor}` }} />
          {barLabel}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="size-2 rounded-full shrink-0" style={{ background: lineColor, boxShadow: `0 0 5px ${lineColor}` }} />
          {lineLabel}
        </div>
      </div>
    </div>
  )
}
