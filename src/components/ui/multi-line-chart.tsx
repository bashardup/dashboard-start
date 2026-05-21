import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Customized,
} from "recharts"
import { cn } from "@/lib/utils"
import { makeActiveDot } from "@/components/ui/chart-elements/chart-dot"

interface TooltipEntry {
  dataKey?: string | number
  name?: string
  value?: number
  color?: string
}

interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipEntry[]
  label?: string
}

export interface MultiLineChartSeries {
  key: string
  label: string
  color: string
}

interface MultiLineChartProps {
  data: Record<string, string | number>[]
  series: MultiLineChartSeries[]
  xKey: string
  height?: number
  className?: string
  delay?: number
}

function RoundedCursor({ points }: { points?: Array<{ x: number; y: number }> }) {
  if (!points?.length) return null
  const x = points[0].x
  const top = Math.min(...points.map(p => p.y))
  const bottom = Math.max(...points.map(p => p.y))
  const height = bottom - top
  return (
    <g>
      <defs>
        <linearGradient id="cursor-radial" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="transparent" stopOpacity="0" />
          <stop offset="75%" stopColor="white" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <rect
        x={x - 18}
        y={top}
        width={35}
        height={height}
        rx={20}
        fill="url(#cursor-radial)"
        style={{ filter: "blur(3px)" }}
      />
    </g>
  )
}

function ChartTooltip({ active, payload, label, colorMap = {} }: CustomTooltipProps & { colorMap?: Record<string, string> }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-border bg-popover/80 backdrop-blur-sm px-3 py-2 shadow-lg text-xs">
      <p className="font-medium text-foreground mb-1">{label}</p>
      {payload.map((p: TooltipEntry, i: number) => (
        <div key={i} className="flex items-center gap-2">
          <span className="size-2 rounded-full shrink-0" style={{ background: colorMap[String(p.dataKey)] ?? p.color }} />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-medium text-foreground">{p.value}</span>
        </div>
      ))}
    </div>
  )
}

export function MultiLineChart({
  data,
  series,
  xKey,
  height = 220,
  className,
  delay = 0,
}: MultiLineChartProps) {
  const animationBegin = delay * 1000
  return (
    <div className={cn("w-full", className)}>

<div
  className="relative"
  // style={{
  //   maskImage: "linear-gradient(to right, transparent 0px, black 80px, black calc(100% - 80px), transparent 100%)",
  //   WebkitMaskImage: "linear-gradient(to right, transparent 0px, black 80px, black calc(100% - 80px), transparent 100%)",
  // }}
>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
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
          <Customized component={() => (
            <defs>
              {series.map(s => (
                <linearGradient key={s.key} id={`lg-${s.key}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor={"#17191d"} stopOpacity="0" />
                  <stop offset="15%"  stopColor={s.color} stopOpacity="1" />
                  <stop offset="85%"  stopColor={s.color} stopOpacity="1" />
                  <stop offset="100%" stopColor={"#17191d"} stopOpacity="0" />
                </linearGradient>
              ))}
            </defs>
          )} />
          <Tooltip content={<ChartTooltip colorMap={Object.fromEntries(series.map(s => [s.key, s.color]))} />} cursor={<RoundedCursor />} />
          {series.map(s => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.label}
              stroke={`url(#lg-${s.key})`}
              color={s.color}
              strokeWidth={3}
              dot={false}
              {...({ animationBegin } as object)}
              activeDot={makeActiveDot(s.color, 7)}
              // style={{ filter: `drop-shadow(0 0 5px ${s.color})` }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
</div>
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
