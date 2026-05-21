import { ResponsiveContainer, Sankey, Tooltip } from "recharts"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { cn } from "@/lib/utils"

/* ── Types ── */

export interface SankeyNode { name: string }
export interface SankeyLink { source: number; target: number; value: number }
export interface SankeyData  { nodes: SankeyNode[]; links: SankeyLink[] }

/* ── Palette ── */

const NODE_VARS = [
  "--color-primary-400",
  "--color-secondary-400",
  "--color-success-300",
  "--color-warning-300",
  "--color-primary-500",
  "--color-gray-400",
  "--color-error-500",
  "--color-warning-500",
  "--color-turquoise-400",
  "--color-informative-400",
  "--color-secondary-300",
  "--color-primary-300",
] as const

const NODE_COLORS = NODE_VARS.map(v => `var(${v})`)

/* ── Tooltip ── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SankeyTooltip({ active, payload }: { active?: boolean; payload?: any[] }) {
  if (!active || !payload?.length) return null
  const item = payload[0]?.payload
  if (!item) return null
  const isLink = item.source !== undefined
  const label = isLink ? `${item.source.name} → ${item.target.name}` : item.name
  const value: number = item.value ?? 0
  return (
    <div className="rounded-xl border border-border bg-popover/80 backdrop-blur-sm px-3 py-2 shadow-lg text-xs">
      <p className="font-medium text-foreground mb-1">{label}</p>
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">Value:</span>
        <span className="font-mono font-bold text-foreground">{value.toLocaleString()}</span>
      </div>
    </div>
  )
}

/* ── Custom Node ── */

interface NodeRenderProps {
  x: number; y: number; width: number; height: number
  index: number
  payload: { name: string; value?: number }
  containerWidth: number
}

function CustomNode({ x, y, width, height, index, payload, containerWidth }: NodeRenderProps) {
  const color  = NODE_COLORS[index % NODE_COLORS.length]
  const varName = NODE_VARS[index % NODE_VARS.length]
  const isLeft  = x + width < containerWidth / 2
  const labelX  = isLeft ? x + width + 10 : x - 10
  const anchor  = isLeft ? "start" : "end"
  return (
    <g style={{ cursor: "default" }}>
      <motion.rect
        x={x} y={y} width={width} height={height} rx={4}
        fill={color}
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ delay: 0.1 + index * 0.07, duration: 0.45, ease: "easeOut" }}
        style={{
          transformOrigin: `${x + width / 2}px ${y + height / 2}px`,
          filter: `drop-shadow(0 0 5px color-mix(in oklch, var(${varName}) 60%, transparent))`,
        }}
      />
      <motion.text
        x={labelX} y={y + height / 2}
        textAnchor={anchor} dominantBaseline="middle"
        fontSize={11.5} fontFamily="ui-monospace, monospace"
        fill={color}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ delay: 0.2 + index * 0.07, duration: 0.45 }}
      >
        {payload.name}
      </motion.text>
    </g>
  )
}

/* ── Custom Link ── */

interface LinkRenderProps {
  sourceX: number; sourceY: number
  targetX: number; targetY: number
  sourceControlX: number; targetControlX: number
  linkWidth: number; index: number
  payload: { source: { name: string }; target: { name: string }; value: number }
}

function makeCustomLink(colorByName: Record<string, string>) {
  return function CustomLink({
    sourceX, sourceY, targetX, targetY,
    sourceControlX, targetControlX,
    linkWidth, index, payload,
  }: LinkRenderProps) {
    const srcColor = colorByName[payload.source.name] ?? "#888"
    const tgtColor = colorByName[payload.target.name] ?? "#888"
    const gid  = `sk-g-${index}`
    const half = linkWidth / 2
    const d = [
      `M${sourceX},${sourceY - half}`,
      `C${sourceControlX},${sourceY - half}`,
      ` ${targetControlX},${targetY - half}`,
      ` ${targetX},${targetY - half}`,
      `L${targetX},${targetY + half}`,
      `C${targetControlX},${targetY + half}`,
      ` ${sourceControlX},${sourceY + half}`,
      ` ${sourceX},${sourceY + half}Z`,
    ].join("")
    return (
      <g>
        <defs>
          <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor={srcColor} stopOpacity="0.7" />
            <stop offset="100%" stopColor={tgtColor} stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <motion.path
          d={d} fill={`url(#${gid})`} stroke="none"
          style={{ cursor: "pointer" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          whileHover={{ opacity: 0.6 }}
          transition={{ delay: 0.55 + index * 0.03, duration: 0.55, ease: "easeOut" }}
        />
      </g>
    )
  }
}

/* ── Default data (channel → outcome) ── */

const defaultData: SankeyData = {
  nodes: [
    { name: "Web Portal" }, { name: "Mobile App" }, { name: "Walk-in" }, { name: "Partner" },
    { name: "Approved" }, { name: "Pending" }, { name: "Rejected" }, { name: "Escalated" },
  ],
  links: [
    { source: 0, target: 4, value: 2800 }, { source: 0, target: 5, value: 1500 },
    { source: 0, target: 6, value: 600  }, { source: 0, target: 7, value: 300  },
    { source: 1, target: 4, value: 1400 }, { source: 1, target: 5, value: 1200 },
    { source: 1, target: 6, value: 700  }, { source: 1, target: 7, value: 500  },
    { source: 2, target: 4, value: 500  }, { source: 2, target: 5, value: 400  },
    { source: 2, target: 6, value: 200  }, { source: 2, target: 7, value: 1000 },
    { source: 3, target: 4, value: 100  }, { source: 3, target: 5, value: 100  },
    { source: 3, target: 6, value: 100  }, { source: 3, target: 7, value: 600  },
  ],
}

/* ── Public component ── */

interface SankeyChartProps {
  data?: SankeyData
  height?: number
  className?: string
}

export function SankeyChart({ data = defaultData, height = 500, className }: SankeyChartProps) {
  const ref      = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  const colorByName: Record<string, string> = {}
  data.nodes.forEach((n, i) => { colorByName[n.name] = NODE_COLORS[i % NODE_COLORS.length] })

  const CustomLink = makeCustomLink(colorByName)

  return (
    <div ref={ref} className={cn("w-full", className)}>
      {isInView && (
        <ResponsiveContainer width="100%" height={height}>
          <Sankey
            data={data}
            nodeWidth={14}
            nodePadding={18}
            margin={{ top: 16, right: 150, bottom: 16, left: 150 }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            node={(props: any) => <CustomNode {...props} />}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            link={(props: any) => <CustomLink {...props} />}
          >
            <Tooltip content={<SankeyTooltip />} />
          </Sankey>
        </ResponsiveContainer>
      )}
    </div>
  )
}
