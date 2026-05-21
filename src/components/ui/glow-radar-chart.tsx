import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts"
import { cn } from "@/lib/utils"
import { makeDot, makeActiveDot } from "@/components/ui/chart-elements/chart-dot"

export interface GlowRadarSeries {
  key: string
  label: string
  color: string
}

const defaultData = [
  { metric: "Speed",       current: 80, previous: 62 },
  { metric: "Accuracy",   current: 92, previous: 78 },
  { metric: "Coverage",   current: 70, previous: 55 },
  { metric: "Response",   current: 85, previous: 74 },
  { metric: "Efficiency", current: 75, previous: 68 },
  { metric: "Compliance", current: 60, previous: 80 },
]

const defaultSeries: GlowRadarSeries[] = [
  { key: "current",  label: "Current",  color: "var(--chart-primary)" },
  { key: "previous", label: "Previous", color: "var(--chart-secondary)" },
]

const GLOW_ID = "radar-glow"

function GlowDefs({ series }: { series: GlowRadarSeries[] }) {
  return (
    <defs>
      <filter id={GLOW_ID} x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      {series.map(s => (
        <radialGradient key={s.key} id={`radar-fill-${s.key}`} cx="50%" cy="50%" r="50%">
          <stop offset="40%"  stopColor={s.color} stopOpacity={0.03} />
          <stop offset="100%" stopColor={s.color} stopOpacity={0.22} />
        </radialGradient>
      ))}
    </defs>
  )
}

interface GlowRadarChartProps {
  data?: Record<string, string | number>[]
  series?: GlowRadarSeries[]
  metricKey?: string
  className?: string
  delay?: number
  height?: number
}

export function GlowRadarChart({
  data = defaultData,
  series = defaultSeries,
  metricKey = "metric",
  className,
  delay = 0,
  height = 340,
}: GlowRadarChartProps) {
  const animationBegin = delay * 1000
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,#26d07c0d_0%,transparent_70%)]" /> */}

      <div>
        <ResponsiveContainer width="100%" height={height}>
          <RadarChart data={data} cx="50%" cy="50%" outerRadius="68%">
            <GlowDefs series={series} />

            <PolarGrid
              stroke="#26d07c"
              strokeOpacity={0.18}
              strokeWidth={0.8}
            />

            <PolarAngleAxis
              dataKey={metricKey}
              tick={{ fill: "#cbd5e1", fontSize: 10 }}
              tickLine={false}
              axisLine={false}
            />

            <PolarRadiusAxis
              tick={{ fill: "#26d07c", fontSize: 8, opacity: 0.35 }}
              axisLine={false}
              tickLine={false}
              stroke="transparent"
              tickCount={4}
            />

            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null
                const colorMap = Object.fromEntries(series.map(s => [s.key, s.color]))
                const seen = new Set()
                const unique = payload.filter(p => {
                  if (seen.has(p.dataKey)) return false
                  seen.add(p.dataKey)
                  return true
                })
                return (
                  <div className="rounded-xl border border-border bg-popover/80 backdrop-blur-sm px-4 py-3 shadow-lg text-xs min-w-[140px]">
                    <p className="font-semibold text-foreground mb-2">{label}</p>
                    {unique.map((p, i) => (
                      <div key={i} className="flex items-center justify-between gap-4 mb-1 last:mb-0">
                        <div className="flex items-center gap-1.5">
                          <span className="size-2 rounded-full shrink-0" style={{ background: colorMap[String(p.dataKey)] ?? p.color }} />
                          <span className="text-muted-foreground">{p.name}</span>
                        </div>
                        <span className="font-mono font-bold text-foreground">{p.value}</span>
                      </div>
                    ))}
                  </div>
                )
              }}
            />

            {series.map(s => (
              <Radar
                key={`fill-${s.key}`}
                dataKey={s.key}
                fill={`url(#radar-fill-${s.key})`}
                stroke="transparent"
                strokeWidth={0}
                {...({ animationBegin } as object)}
              />
            ))}

            {series.map(s => (
              <Radar
                key={`stroke-${s.key}`}
                dataKey={s.key}
                name={s.label}
                fill="transparent"
                stroke={s.color}
                strokeWidth={2}
                strokeLinejoin="round"
                {...({ animationBegin } as object)}
                dot={makeDot(s.color)}
                activeDot={makeActiveDot(s.color)}
                // style={{ filter: `url(#${GLOW_ID})` }}
              />
            ))}
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Center diamond */}
      {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 2L18 10L10 18L2 10Z"
            stroke="#26d07c"
            strokeWidth="1.5"
            fill="none"
            style={{ filter: `url(#${GLOW_ID})` }}
          />
          <path d="M10 5L15 10L10 15L5 10Z" fill="#26d07c" fillOpacity={0.3} />
        </svg>
      </div> */}
      {/* Legend */}
      <div className="flex items-center justify-center gap-5 mt-3 shrink-0">
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
