import { cn } from "@/lib/utils"

export interface PyramidSegment {
  name: string
  value: number
  gradient: [string, string]
}

interface InvertedPyramidChartProps {
  data: PyramidSegment[]
  height?: number
  gap?: number
  bottomRatio?: number
  radius?: number
  className?: string
  valueFormatter?: (v: number) => string
}

/* ── SVG path helpers ── */

type Pt = [number, number]
const vec  = (a: Pt, b: Pt): Pt => [b[0] - a[0], b[1] - a[1]]
const vlen = (v: Pt) => Math.sqrt(v[0] * v[0] + v[1] * v[1])
const norm = (v: Pt): Pt => { const l = vlen(v); return l ? [v[0] / l, v[1] / l] : [0, 0] }
const add  = (a: Pt, b: Pt): Pt => [a[0] + b[0], a[1] + b[1]]
const scl  = (v: Pt, s: number): Pt => [v[0] * s, v[1] * s]
const f    = (p: Pt) => `${p[0].toFixed(2)},${p[1].toFixed(2)}`

function roundedTrap(tl: Pt, tr: Pt, br: Pt, bl: Pt, r: number): string {
  // Corners in winding order: TL → TR → BR → BL
  // For each corner: [incoming-from, corner, outgoing-to]
  const seq: [Pt, Pt, Pt][] = [
    [bl, tl, tr],
    [tl, tr, br],
    [tr, br, bl],
    [br, bl, tl],
  ]

  const arcs = seq.map(([prev, c, next]) => {
    const rc = Math.min(r, vlen(vec(prev, c)) * 0.45, vlen(vec(c, next)) * 0.45)
    return {
      start:  add(c, scl(norm(vec(prev, c)), -rc)),
      corner: c,
      end:    add(c, scl(norm(vec(c, next)),   rc)),
    }
  })

  // M start[0] → Q corner end → L start[1] → Q corner end → … → L start[0] → Z
  return [
    `M ${f(arcs[0].start)}`,
    ...arcs.flatMap((a, i) => [
      `Q ${f(a.corner)} ${f(a.end)}`,
      `L ${f(arcs[(i + 1) % arcs.length].start)}`,
    ]),
    "Z",
  ].join(" ")
}

/* ── Component ── */

export function InvertedPyramidChart({
  data,
  height = 240,
  gap = 4,
  bottomRatio = 0.28,
  radius = 10,
  className,
  valueFormatter = (v) => v.toLocaleString(),
}: InvertedPyramidChartProps) {
  const W = 300
  const n = data.length
  const segH = (height - gap * (n - 1)) / n
  const widthAt = (y: number) => W * (1 - (1 - bottomRatio) * (y / height))

  return (
    <svg
      viewBox={`0 0 ${W} ${height}`}
      width="100%"
      height={height}
      preserveAspectRatio="none"
      className={cn("block", className)}
      aria-label="Inverted pyramid chart"
    >
      <defs>
        {data.map((seg, i) => (
          <linearGradient key={i} id={`ipg-${i}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   style={{ stopColor: seg.gradient[0] }} />
            <stop offset="100%" style={{ stopColor: seg.gradient[1] }} />
          </linearGradient>
        ))}
      </defs>

      {data.map((seg, i) => {
        const topY = i * (segH + gap)
        const botY = topY + segH
        const topW = widthAt(topY)
        const botW = widthAt(botY)
        const tl: Pt = [(W - topW) / 2, topY]
        const tr: Pt = [(W + topW) / 2, topY]
        const br: Pt = [(W + botW) / 2, botY]
        const bl: Pt = [(W - botW) / 2, botY]
        const midY = (topY + botY) / 2

        return (
          <g key={i}>
            <path d={roundedTrap(tl, tr, br, bl, radius)} fill={`url(#ipg-${i})`} />
            <text
              x={W / 2} y={midY - 9}
              textAnchor="middle" dominantBaseline="middle"
              fill="white" fontSize={13} fontWeight={500}
              style={{ fontFamily: "var(--font-sans, sans-serif)" }}
            >
              {seg.name}
            </text>
            <text
              x={W / 2} y={midY + 11}
              textAnchor="middle" dominantBaseline="middle"
              fill="white" fontSize={20} fontWeight={700}
              style={{ fontFamily: "var(--font-mono, monospace)" }}
            >
              {valueFormatter(seg.value)}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
