import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis } from "recharts"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

/* ── Data ── */

interface BubbleDatum {
  x: number
  y: number
  value: number
  label: string
  size: number
}

const DATA: BubbleDatum[] = [
  { x: 12,  y: 68, value: 44,  label: "Sections",       size: 52 },
  { x: 48,  y: 44, value: 180, label: "Working hours",  size: 70 },
  { x: 84,  y: 70, value: 28,  label: "Components",     size: 44 },
  { x: 24,  y: 16, value: 92,  label: "Data points",    size: 56 },
  { x: 74,  y: 14, value: 16,  label: "Modules",        size: 38 },
]

// Connection stub angles per bubble (radiants)
const STUBS: number[][] = [
  [0.5,  2.2],
  [1.1, -0.4, 2.9],
  [-0.7, 1.6],
  [0.3,  3.1],
  [-1.0, 0.7],
]

/* ── Shape renderer ── */

interface NodeProps {
  cx?: number
  cy?: number
  index?: number
  payload?: BubbleDatum
}

function BubbleNode({ cx = 0, cy = 0, index = 0, payload }: NodeProps) {
  if (!payload) return null
  const { value, label, size } = payload
  const uid = `b${index}`
  const hR = size * 1.28

  return (
    <motion.g
      style={{ cursor: "pointer", transformOrigin: `${cx}px ${cy}px` }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover="hovered"
      transition={{ delay: index * 0.1, type: "spring", stiffness: 200, damping: 16 }}
    >
      <defs>
        <radialGradient id={`dg${uid}`} cx="50%" cy="42%" r="55%">
          <stop offset="0%"   stopColor="#1c2336" />
          <stop offset="100%" stopColor="#080c14" />
        </radialGradient>

        <radialGradient id={`hg${uid}`} cx="34%" cy="28%" r="65%">
          <stop offset="0%"   stopColor="#d1fae5" stopOpacity="0.95" />
          <stop offset="26%"  stopColor="#4ade80" stopOpacity="0.95" />
          <stop offset="60%"  stopColor="#16a34a" stopOpacity="0.9"  />
          <stop offset="88%"  stopColor="#052e16" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.6"  />
        </radialGradient>

        <filter id={`gf${uid}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Connection stubs */}
      {STUBS[index]?.map((angle, i) => (
        <motion.line
          key={i}
          x1={cx + Math.cos(angle) * size}
          y1={cy + Math.sin(angle) * size}
          x2={cx + Math.cos(angle) * (size + 80)}
          y2={cy + Math.sin(angle) * (size + 80)}
          stroke="#26d07c"
          strokeWidth={0.8}
          strokeDasharray="4 5"
          variants={{
            hovered: { opacity: 0.6 },
          }}
          style={{ opacity: 0.22 }}
          transition={{ duration: 0.25 }}
        />
      ))}

      

      {/* Idle: dark orb with dashed border */}
      <motion.circle
        cx={cx} cy={cy} r={size}
        fill={`url(#dg${uid})`}
        stroke="#26d07c"
        strokeWidth={1.3}
        strokeDasharray="5 4"
        variants={{
          hovered: { opacity: 0, scale: 0.72 },
        }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />

      {/* Hover: green sphere */}
      <motion.circle
        cx={cx} cy={cy} r={hR}
        fill={`url(#hg${uid})`}
        initial={{ opacity: 0, scale: 0.65 }}
        variants={{
          hovered: { opacity: 1, scale: 0.72 },
        }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />

      {/* Invisible hit-area to ensure hover registers over full bubble */}
      <circle cx={cx} cy={cy} r={hR + 8} fill="transparent" />

      {/* Value */}
      <motion.text
        x={cx}
        y={cy - 7}
        textAnchor="middle"
        fontSize={value >= 100 ? 20 : 22}
        fontWeight="700"
        fontFamily="ui-monospace, monospace"
        fill="#b8c4ce"
        variants={{ hovered: { fill: "#ffffff" } }}
        transition={{ duration: 0.2 }}
      >
        {value}
      </motion.text>

      {/* Superscript + */}
      <motion.text
        x={cx + (value >= 100 ? 24 : value >= 10 ? 16 : 12)}
        y={cy - 17}
        fontSize={13}
        fontWeight="600"
        fontFamily="ui-monospace, monospace"
        fill="#26d07c"
        variants={{ hovered: { fill: "#86efac" } }}
        transition={{ duration: 0.2 }}
      >
        +
      </motion.text>

      {/* Label */}
      <motion.text
        x={cx}
        y={cy + 14}
        textAnchor="middle"
        fontSize={11}
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fill="#64748b"
        variants={{ hovered: { fill: "#d1fae5" } }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.text>
    </motion.g>
  )
}

/* ── Public component ── */

interface BubbleStatChartProps {
  className?: string
}

export function BubbleStatChart({ className }: BubbleStatChartProps) {
  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={550}>
        <ScatterChart margin={{ top: 90, right: 90, bottom: 90, left: 90 }}>
          <XAxis dataKey="x" type="number" domain={[0, 100]}  />
          <YAxis dataKey="y" type="number" domain={[0, 100]}  />
          <Scatter
            data={DATA}
            isAnimationActive={false}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            shape={(props: any) => <BubbleNode {...props} />}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}
