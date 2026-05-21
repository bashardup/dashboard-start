import { cn } from "@/lib/utils"
import { TrendingUp } from "lucide-react"

/* ── Constants ── */

const SVG_W = 560
const CHART_TOP = 40
const CHART_BOT = 205
const CHART_H = CHART_BOT - CHART_TOP
const CENTER_Y = (CHART_TOP + CHART_BOT) / 2
const COL_X = [72, 280, 488]

const BAND_COLORS = ["#FF6B2B", "#FF9A56", "#FFD4A8"] as const

/* ── Data ── */

interface Period {
  label: string
  stat: string
  change: string
  compare: string
  values: [number, number, number]
}

const PERIODS: Period[] = [
  {
    label: "Weekly",
    stat: "$2,197",
    change: "+19.6%",
    compare: "Compared to $1,340 last week",
    values: [20030, 18782, 14221],
  },
  {
    label: "Monthly",
    stat: "$8,903",
    change: "+1.9%",
    compare: "Compared to $5,441 last month",
    values: [50331, 40795, 30123],
  },
  {
    label: "Yearly",
    stat: "$98,134",
    change: "+22%",
    compare: "Compared to $76,330 last year",
    values: [270120, 210650, 200080],
  },
]

const TABLE_ROWS = [
  { region: "Los Angeles", cells: ["$20,030", "$50,331", "$270,120"] },
  { region: "New York",    cells: ["$18,782", "$40,795", "$210,650"] },
  { region: "Canada",      cells: ["$14,221", "$30,123", "$200,080"] },
]

/* ── SVG helpers ── */

const MAX_TOTAL = Math.max(...PERIODS.map(p => p.values.reduce((a, b) => a + b, 0)))
const SCALE = (CHART_H * 0.92) / MAX_TOTAL

function stackBands(values: [number, number, number]) {
  const totalH = values.reduce((a, b) => a + b, 0) * SCALE
  let y = CENTER_Y - totalH / 2
  return values.map(v => {
    const h = v * SCALE
    const band = { y, h }
    y += h
    return band
  })
}

function flowPath(
  x1: number, y1: number, h1: number,
  x2: number, y2: number, h2: number,
): string {
  const mx = (x1 + x2) / 2
  return [
    `M ${x1},${y1}`,
    `C ${mx},${y1} ${mx},${y2} ${x2},${y2}`,
    `L ${x2},${y2 + h2}`,
    `C ${mx},${y2 + h2} ${mx},${y1 + h1} ${x1},${y1 + h1}`,
    `Z`,
  ].join(" ")
}

/* ── Component ── */

interface SalesReportChartProps {
  className?: string
}

export function SalesReportChart({ className }: SalesReportChartProps) {
  const cols = PERIODS.map((p, i) => ({
    x: COL_X[i],
    values: p.values,
    bands: stackBands(p.values),
  }))

  return (
    <div className={cn("bg-white dark:bg-slate-900 rounded-2xl", className)}>
      {/* Title */}
      <div className="flex items-center justify-between px-6 pt-6 pb-3">
        <h3 className="font-mono font-bold text-lg">Sales Report</h3>
        <div className="size-7 rounded-full bg-primary flex items-center justify-center">
          <TrendingUp className="size-3.5 text-white" strokeWidth={2.5} />
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 px-6 pb-4">
        {PERIODS.map(p => (
          <div key={p.label}>
            <p className="text-xs text-muted-foreground mb-0.5">{p.label}</p>
            <div className="flex items-baseline gap-1 flex-wrap">
              <span className="text-xl font-mono font-bold leading-none">{p.stat}</span>
              <span className="text-[10px] text-emerald-500 font-semibold">{p.change}</span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-0.5 leading-snug">{p.compare}</p>
          </div>
        ))}
      </div>

      {/* SVG chart */}
      <div className="px-1">
        <svg viewBox={`0 0 ${SVG_W} 248`} className="w-full h-auto overflow-visible">
          <defs>
            {/* warm background glow */}
            <radialGradient id="sr-bg" cx="55%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#FFE0A0" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#FFE0A0" stopOpacity="0" />
            </radialGradient>

            {/* per-band horizontal gradients */}
            {BAND_COLORS.map((c, i) => (
              <linearGradient key={i} id={`sr-b${i}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor={c} stopOpacity="0.28" />
                <stop offset="45%"  stopColor={c} stopOpacity="0.75" />
                <stop offset="100%" stopColor={c} stopOpacity="0.95" />
              </linearGradient>
            ))}
          </defs>

          {/* background glow rect */}
          <rect x="0" y="0" width={SVG_W} height="248" fill="url(#sr-bg)" rx="12" />

          {/* flowing bands: segment 0→1 and 1→2 */}
          {([0, 1] as const).map(seg =>
            ([0, 1, 2] as const).map(band => {
              const L = cols[seg]
              const R = cols[seg + 1]
              return (
                <path
                  key={`${seg}-${band}`}
                  d={flowPath(
                    L.x, L.bands[band].y, L.bands[band].h,
                    R.x, R.bands[band].y, R.bands[band].h,
                  )}
                  fill={`url(#sr-b${band})`}
                />
              )
            })
          )}

          {/* column indicators */}
          {cols.map((col, i) => {
            const topY  = col.bands[0].y - 14
            const botY  = col.bands[2].y + col.bands[2].h + 14
            const isActive = i === 1
            return (
              <g key={i}>
                <line
                  x1={col.x} y1={topY}
                  x2={col.x} y2={botY}
                  stroke="white"
                  strokeWidth={isActive ? 2 : 1.5}
                  strokeOpacity={isActive ? 1 : 0.75}
                />
                <circle
                  cx={col.x} cy={topY + 8}
                  r={isActive ? 5 : 3.5}
                  fill="white"
                  fillOpacity={isActive ? 1 : 0.8}
                />
                {/* top value */}
                <text
                  x={col.x} y={topY - 4}
                  textAnchor="middle"
                  fontSize="11"
                  fontFamily="monospace"
                  fill="currentColor"
                  opacity="0.65"
                >
                  {col.values[0].toLocaleString()}
                </text>
                {/* bottom value */}
                <text
                  x={col.x} y={botY + 16}
                  textAnchor="middle"
                  fontSize="11"
                  fontFamily="monospace"
                  fill="currentColor"
                  opacity="0.65"
                >
                  {col.values[2].toLocaleString()}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Region breakdown table */}
      <div className="px-6 pb-6 mt-1">
        <table className="w-full">
          <tbody>
            {TABLE_ROWS.map((row, i) => (
              <tr key={i} className="border-t border-border/40">
                <td className="py-2 text-sm text-muted-foreground">{row.region}</td>
                {row.cells.map((v, j) => (
                  <td key={j} className="py-2 text-right font-mono text-sm">{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
