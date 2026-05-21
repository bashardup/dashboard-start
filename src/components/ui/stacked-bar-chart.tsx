import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { cn } from "@/lib/utils"

const chartData = [
  { name: "Dec 2", s1: 70, s2: 20 },
  { name: "Dec 3", s1: 40, s2: 12 },
  { name: "Dec 4", s1: 20, s2: 15 },
  { name: "Dec 5", s1: 65, s2: 5 },
  { name: "Dec 6", s1: 10, s2: 33 },
  { name: "Dec 7", s1: 20, s2: 45 },
]

/* ── Custom bar shapes ── */

interface ShapeProps {
  x?: number
  y?: number
  width?: number
  height?: number
}

function GhostBar({ x = 0, y = 0, width = 0, height = 0 }: ShapeProps) {
  if (height <= 0) return null
  const r = Math.min(width / 2, 8)
  return (
    <rect
      x={x} y={y} width={width} height={height}
      rx={r} ry={r}
      fill="#2D3835"
      fillOpacity={0.18}
    />
  )
}

function BottomBar({ x = 0, y = 0, width = 0, height = 0 }: ShapeProps) {
  if (height <= 0) return null
  const r = Math.min(width / 2, 8)
  const uid = `bb-${x}`
  return (
    <g>
      <defs>
        <linearGradient id={uid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#19844E" stopOpacity="1" />
          <stop offset="100%" stopColor="#0F5332" stopOpacity="1" />
        </linearGradient>
      </defs>
      <path
        d={`M ${x},${y} L ${x + width},${y} L ${x + width},${y + height - r} Q ${x + width},${y + height} ${x + width - r},${y + height} L ${x + r},${y + height} Q ${x},${y + height} ${x},${y + height - r} Z`}
        fill={`url(#${uid})`}
      />
    </g>
  )
}

function TopBar({ x = 0, y = 0, width = 0, height = 0 }: ShapeProps) {
  if (height <= 0) return null
  const r = Math.min(width / 2, 8)
  const uid = `tb-${x}`
  return (
    <g>
      <defs>
        <linearGradient id={uid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#67DEA3" stopOpacity="1" />
          <stop offset="100%" stopColor="#1EA663" stopOpacity="1" />
        </linearGradient>
      </defs>
      <path
        d={`M ${x},${y + r} Q ${x},${y} ${x + r},${y} L ${x + width - r},${y} Q ${x + width},${y} ${x + width},${y + r} L ${x + width},${y + height - r} Q ${x + width},${y + height} ${x + width - r},${y + height} L ${x + r},${y + height} Q ${x},${y + height} ${x},${y + height - r} Z`}
        fill={`url(#${uid})`}
      />
    </g>
  )
}

/* ── Tooltip ── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-border bg-popover/80 backdrop-blur-sm px-3 py-2 shadow-lg text-xs">
      <p className="font-medium text-foreground mb-1">{label}</p>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center gap-2">
          <span className="size-2 rounded-full shrink-0" style={{ background: p.fill }} />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-mono font-bold text-foreground">{p.value}</span>
        </div>
      ))}
    </div>
  )
}

/* ── Public component ── */

interface StackedBarChartProps {
  className?: string
}

export function StackedBarChart({ className }: StackedBarChartProps) {
  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          barCategoryGap="20%"
          margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
        >
          <CartesianGrid vertical={false} strokeDasharray="4 4" stroke="var(--border)" />
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          />
          <Tooltip content={<ChartTooltip />} cursor={false} />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 12, paddingTop: 16 }}
            formatter={(value) => <span style={{ color: "var(--muted-foreground)" }}>{value}</span>}
          />
          <Bar dataKey="s1" name="Series 1" stackId="a" fill="#22c55e" shape={<TopBar/>} background={<GhostBar />} />
          <Bar dataKey="s2" name="Series 2" stackId="a" fill="#bbf7d0" shape={<BottomBar />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
