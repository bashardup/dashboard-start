import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Customized,
} from "recharts"
import { useId } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { RoundedBar } from "@/components/ui/chart-elements/rounded-bar"

/* ── Types ── */

export interface ActivityBarChartSeries {
  key: string
  label: string
  color: string
  secondaryColor?: string
}

interface ActivityBarChartProps {
  data: Record<string, string | number>[]
  series: ActivityBarChartSeries[]
  xKey: string
  height?: number
  className?: string
  stacked?: boolean
  orientation?: "vertical" | "horizontal"
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

/* ── Hover group cursor ── */

const BG_GRAD_ID = "bar-bg-grad"
const BG_GRAD_H_ID = "bar-bg-grad-h"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function GroupCursorVertical({ x = 0, y = 0, width = 0, height = 0 }: any) {
  const pad = 6
  const cx = x - pad
  const cy = y
  const cw = width + pad * 2
  const ch = height
  const r = 8
  const d = `M ${cx},${cy + r} Q ${cx},${cy} ${cx + r},${cy} L ${cx + cw - r},${cy} Q ${cx + cw},${cy} ${cx + cw},${cy + r} L ${cx + cw},${cy + ch} L ${cx},${cy + ch} Z`
  return (
    <g>
      <defs>
        <linearGradient id={BG_GRAD_ID} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9DFFCE" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#448C6A" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="bar-cursor-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.4" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={d}
        fill={`url(#${BG_GRAD_ID})`}
        stroke="url(#bar-cursor-stroke)"
        strokeWidth={1}
        initial={{ opacity: 0, scaleY: 0.85 }}
        animate={{ opacity: 1, scaleY: 1 }}
        style={{ transformOrigin: `${cx + cw / 2}px ${cy + ch}px` }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
    </g>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function GroupCursorHorizontal({ x = 0, y = 0, width = 0, height = 0 }: any) {
  const pad = 4
  const cx = x
  const cy = y - pad
  const cw = width
  const ch = height + pad * 2
  const r = 8
  const d = `M ${cx},${cy + r} Q ${cx},${cy} ${cx + r},${cy} L ${cx + cw - r},${cy} Q ${cx + cw},${cy} ${cx + cw},${cy + r} L ${cx + cw},${cy + ch - r} Q ${cx + cw},${cy + ch} ${cx + cw - r},${cy + ch} L ${cx},${cy + ch} Z`
  return (
    <g>
      <defs>
        <linearGradient id={BG_GRAD_H_ID} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9DFFCE" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#448C6A" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="bar-cursor-stroke-h" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.4" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={d}
        fill={`url(#${BG_GRAD_H_ID})`}
        stroke="url(#bar-cursor-stroke-h)"
        strokeWidth={1}
        initial={{ opacity: 0, scaleX: 0.9 }}
        animate={{ opacity: 1, scaleX: 1 }}
        style={{ transformOrigin: `${cx}px ${cy + ch / 2}px` }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
    </g>
  )
}

/* ── Public component ── */

export function ActivityBarChart({
  data,
  series,
  xKey,
  height = 280,
  className,
  stacked = false,
  orientation = "vertical",
}: ActivityBarChartProps) {
  const uid = useId().replace(/:/g, "")
  const colorMap = Object.fromEntries(series.map(s => [s.key, s.color]))
  const isHorizontal = orientation === "horizontal"
  const gradId = (key: string) => `bar-grad-${uid}-${key}`

  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          layout={isHorizontal ? "vertical" : "horizontal"}
          barGap={4}
          barCategoryGap="25%"
          margin={isHorizontal
            ? { top: 8, right: 16, left: 8, bottom: 0 }
            : { top: 8, right: 8, left: -16, bottom: 0 }
          }
        >
          <Customized component={() => (
            <defs>
              {series.map(s => (
                <linearGradient
                  key={s.key}
                  id={gradId(s.key)}
                  x1="0" y1="0"
                  x2={isHorizontal ? "1" : "0"}
                  y2={isHorizontal ? "0" : "1"}
                >
                  <stop offset="0%" stopColor={s.secondaryColor ?? s.color} stopOpacity="1" />
                  <stop offset="100%" stopColor={s.color} stopOpacity="1" />
                </linearGradient>
              ))}
            </defs>
          )} />

          <CartesianGrid
            vertical={isHorizontal}
            horizontal={!isHorizontal}
            strokeDasharray="4 4"
            stroke="var(--border)"      
          />

          {isHorizontal ? (
            <>
              <XAxis
                type="number"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              />
              <YAxis
                type="category"
                dataKey={xKey}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                width={72}
              />
            </>
          ) : (
            <>
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
            </>
          )}

          <Tooltip
            content={<ChartTooltip colorMap={colorMap} />}
            cursor={isHorizontal ? <GroupCursorHorizontal /> : <GroupCursorVertical />}
          />

          {series.map((s) => (
            <Bar
              key={s.key}
              dataKey={s.key}
              name={s.label}
              fill={`url(#${gradId(s.key)})`}
              stackId={stacked ? "a" : undefined}
              isAnimationActive={false}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              shape={(props: any) => (
                <RoundedBar {...props} fill={`url(#${gradId(s.key)})`} orientation={isHorizontal ? "horizontal" : "vertical"} />
              )}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              activeBar={(props: any) => (
                <RoundedBar {...props} fill={`url(#${gradId(s.key)})`} entrance={false} orientation={isHorizontal ? "horizontal" : "vertical"} />
              )}
            />
          ))}
        </BarChart>
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
