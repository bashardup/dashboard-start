import * as React from "react"
import {
  CardWidget, CardWidgetContent, CardWidgetHeader, CardWidgetIcon, CardWidgetTitle,
} from "@/components/ui/card-widget"
import { GlowRadarChart } from "@/components/ui/glow-radar-chart"
import { MultiLineChart } from "@/components/ui/multi-line-chart"
import { Button } from "@/components/ui/button"
import { MagicCard } from "@/components/ui/magic-card"
import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { motion, useInView, animate } from "framer-motion"
import { ArrowUpRight, ArrowDownRight, ChevronRight } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer } from "recharts"
import { InvertedPyramidChart, type PyramidSegment } from "@/components/ui/inverted-pyramid-chart"

const ICON = <img src="/img/icon-channel.svg" alt="" />

const glowPositionMap = {
  "left-bottom":  "translate-x-[-37%] translate-y-[60%]  left-0 bottom-0",
  "right-bottom": "translate-x-[37%]  translate-y-[60%]  right-0 bottom-0",
  "left-top":     "translate-x-[-37%] translate-y-[-60%] left-0 top-0",
  "right-top":    "translate-x-[37%]  translate-y-[-60%] right-0 top-0",
} as const
type GlowPos = keyof typeof glowPositionMap

/* ────────────────────────────────────────────────────────── */
/* ROW 1 — Analytics Stat Cards (with sparkline)            */
/* ────────────────────────────────────────────────────────── */

interface AnalyticsStatCardProps {
  title: string
  value: number
  metric: string
  metricLabel: string
  trend: "up" | "down"
  accentColor?: string
  data: { value: number }[]
  glowPosition?: GlowPos
  index?: number
}

export function AnalyticsStatCard({
  title, value, metric, metricLabel, trend,
  accentColor = "var(--chart-primary)", data, glowPosition = "left-bottom", index = 0,
}: AnalyticsStatCardProps) {
  const { theme } = useTheme()
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })
  const [num, setNum] = React.useState(0)
  const fillId = `af-${index}`

  React.useEffect(() => {
    if (!isInView) return
    const ctrl = animate(0, value, {
      duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: index * 0.12,
      onUpdate: v => setNum(Math.round(v)),
    })
    return () => ctrl.stop()
  }, [isInView, value, index])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.1 }}
    >
      <MagicCard gradientColor={theme === "dark" ? "color-mix(in oklch, var(--chart-primary) 30%, transparent)" : "var(--chart-primary)"} className="p-0 rounded-[32px]">
        <div className={cn(
          "p-5 pe-0 overflow-hidden relative flex items-stretch gap-2 h-full",
          "bg-white dark:bg-slate-800/50 rounded-[32px]",
          "shadow-[-2px_3px_9px_0px_rgba(230,239,235,1.00)] dark:shadow-none"
        )}>
          <div className={cn(
            "w-64 h-64 opacity-40 absolute rounded-full pointer-events-none",
            "dark:bg-[radial-gradient(color-mix(in_oklch,var(--chart-primary)_35%,transparent),transparent_65%)] bg-[radial-gradient(color-mix(in_oklch,var(--chart-primary-light)_60%,transparent),transparent_65%)]",
            glowPositionMap[glowPosition]
          )} />
          <div className="flex flex-col justify-between flex-1 z-10 min-w-0 gap-1">
            <p className="text-sm font-mono font-bold text-foreground truncate">{title}</p>
            <p className="text-4xl font-mono font-bold text-gray-700 dark:text-gray-100 leading-none tabular-nums">
              {num.toLocaleString()}
            </p>
            <div className="flex items-center gap-1.5">
              <span className={cn(
                "text-xs font-mono font-bold flex items-center gap-0.5",
                trend === "up" ? "text-chart-primary" : "text-chart-quaternary"
              )}>
                {trend === "up" ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                {metric}
              </span>
              <span className="text-xs text-muted-foreground">{metricLabel}</span>
            </div>
          </div>
          <div className="w-[130px] shrink-0 flex items-end">
            <div className="relative w-full">
              <div className="absolute inset-0 rounded-xl blur-xl opacity-25 bg-[radial-gradient(ellipse_at_bottom,var(--chart-primary)_0%,transparent_70%)] pointer-events-none" />
              <ResponsiveContainer width="100%" height={90}>
                <AreaChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={accentColor} stopOpacity={0.35} />
                      <stop offset="100%" stopColor={accentColor} stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="value" stroke={accentColor} strokeWidth={2}
                    fill={`url(#${fillId})`} dot={false}
                    activeDot={{ r: 3, strokeWidth: 0, fill: accentColor }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </MagicCard>
    </motion.div>
  )
}

export function TotalEmployeesCard() {
  return <AnalyticsStatCard title="Total Employees" value={1455} metric="+3%" metricLabel="vs Last month"
    trend="up" data={[{value:1200},{value:1280},{value:1230},{value:1310},{value:1390},{value:1455}]}
    glowPosition="left-bottom" index={0} />
}
export function ActiveAssessmentsCard() {
  return <AnalyticsStatCard title="Active Assessments" value={759} metric="74%" metricLabel="Completion Rate"
    trend="up" data={[{value:520},{value:600},{value:580},{value:650},{value:710},{value:759}]}
    glowPosition="right-top" index={1} />
}
export function InterviewCompletedCard() {
  return <AnalyticsStatCard title="Interview Completed" value={1102} metric="73%" metricLabel="Completion Rate"
    trend="up" data={[{value:800},{value:860},{value:920},{value:980},{value:1040},{value:1102}]}
    glowPosition="left-bottom" index={2} />
}
export function CriticalGapsCard() {
  return <AnalyticsStatCard title="Critical Gaps" value={120} metric="18%" metricLabel="Completion Rate"
    trend="down" accentColor="var(--chart-quaternary)"
    data={[{value:90},{value:105},{value:98},{value:112},{value:108},{value:120}]}
    glowPosition="right-top" index={3} />
}

/* ────────────────────────────────────────────────────────── */
/* Shared: MiniGauge (SVG ring)                             */
/* ────────────────────────────────────────────────────────── */

function MiniGauge({ value, label, color = "var(--chart-primary)", size = 70 }: {
  value: number; label: string; color?: string; size?: number
}) {
  const r = (size / 2) - 6
  const circ = 2 * Math.PI * r
  const offset = circ - (value / 100) * circ
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={size/2} cy={size/2} r={r} fill="none"
            stroke="currentColor" strokeWidth={5} className="text-muted/30" />
          <circle cx={size/2} cy={size/2} r={r} fill="none"
            stroke={color} strokeWidth={5}
            strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold font-mono tabular-nums" style={{ color }}>{value}%</span>
        </div>
      </div>
      <p className="text-[11px] text-muted-foreground text-center leading-tight max-w-[80px]">{label}</p>
    </div>
  )
}

/* ────────────────────────────────────────────────────────── */
/* ROW 2a — Technical Assessment Analytics                  */
/* ────────────────────────────────────────────────────────── */

export function TechnicalAssessmentCard() {
  return (
    <CardWidget className="flex flex-col">
      <CardWidgetHeader>
        <CardWidgetIcon>{ICON}</CardWidgetIcon>
        <CardWidgetTitle>Technical Assessment Analytics</CardWidgetTitle>
      </CardWidgetHeader>
      <CardWidgetContent className="flex-1 flex flex-col gap-4">
        <div className="flex gap-5 items-start">
          <div className="flex flex-col gap-4 shrink-0">
            <MiniGauge value={76} label="Stress Resilience" color="var(--chart-primary)" />
            <MiniGauge value={66} label="Pass Rate"         color="var(--chart-primary)" />
            <MiniGauge value={22} label="Fail Rate"         color="var(--chart-quaternary)" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-muted-foreground mb-2">Assessments Trend</p>
            <MultiLineChart
              data={[
                { month: "Jan", pass: 62, fail: 18 },
                { month: "Feb", pass: 65, fail: 21 },
                { month: "Mar", pass: 68, fail: 20 },
                { month: "Apr", pass: 64, fail: 23 },
                { month: "May", pass: 70, fail: 22 },
                { month: "Jun", pass: 66, fail: 22 },
              ]}
              series={[
                { key: "pass", label: "Pass Rate", color: "var(--chart-primary)" },
                { key: "fail", label: "Fail Rate", color: "var(--chart-secondary)" },
              ]}
              xKey="month"
            />
          </div>
        </div>
        <Button variant="tonal" className="self-stretch gap-1.5 mt-auto">
          View Assessments Details <ChevronRight className="size-3.5" />
        </Button>
      </CardWidgetContent>
    </CardWidget>
  )
}

/* ────────────────────────────────────────────────────────── */
/* ROW 2b — Competency Gap Heatmap                          */
/* ────────────────────────────────────────────────────────── */

type HeatLevel = "low" | "moderate" | "high" | "critical"

const heatStyles: Record<HeatLevel, string> = {
  low:      "bg-emerald-500/20 text-emerald-700 dark:bg-emerald-500/25 dark:text-emerald-400",
  moderate: "bg-amber-400/20 text-amber-700 dark:bg-amber-400/25 dark:text-amber-400",
  high:     "bg-orange-500/20 text-orange-700 dark:bg-orange-500/25 dark:text-orange-400",
  critical: "bg-red-500/20 text-red-700 dark:bg-red-500/25 dark:text-red-400",
}

const heatmapRows = [
  "Leadership Command", "Criminal Investigation", "Cyber Security", "Smart Services", "Support Services",
]
const heatmapCols = ["Leadership", "Strategic Thinking", "Digital Fluency", "Discourse", "Problem Solving", "Innovation"]
const heatmapValues: HeatLevel[][] = [
  ["low",      "low",      "moderate", "low",      "low",      "moderate"],
  ["low",      "moderate", "high",     "moderate", "low",      "low"],
  ["moderate", "high",     "critical", "high",     "moderate", "low"],
  ["high",     "critical", "high",     "moderate", "high",     "critical"],
  ["critical", "high",     "moderate", "critical", "high",     "moderate"],
]

export function CompetencyHeatmapCard() {
  return (
    <CardWidget className="flex flex-col">
      <CardWidgetHeader>
        <CardWidgetIcon>{ICON}</CardWidgetIcon>
        <CardWidgetTitle>Competency Gap Heatmap</CardWidgetTitle>
      </CardWidgetHeader>
      <CardWidgetContent className="flex-1 flex flex-col gap-4 overflow-x-auto">
        <div className="min-w-[520px]">
          <div className="grid mb-1" style={{ gridTemplateColumns: `150px repeat(${heatmapCols.length}, 1fr)` }}>
            <div />
            {heatmapCols.map(col => (
              <div key={col} className="text-[10px] font-medium text-muted-foreground text-center truncate px-0.5">
                {col}
              </div>
            ))}
          </div>
          {heatmapRows.map((row, ri) => (
            <div key={row} className="grid mb-1 items-center"
              style={{ gridTemplateColumns: `150px repeat(${heatmapCols.length}, 1fr)` }}>
              <div className="text-[11px] text-muted-foreground truncate pr-2">{row}</div>
              {heatmapValues[ri].map((level, ci) => (
                <div key={ci} className={cn(
                  "h-8 rounded-lg flex items-center justify-center text-[10px] font-semibold mx-0.5",
                  heatStyles[level]
                )}>
                  {level === "low" ? "L" : level === "moderate" ? "M" : level === "high" ? "H" : "C"}
                </div>
              ))}
            </div>
          ))}
          <div className="flex items-center gap-4 mt-3 flex-wrap">
            {(["low", "moderate", "high", "critical"] as HeatLevel[]).map(l => (
              <div key={l} className="flex items-center gap-1.5">
                <div className={cn("size-3 rounded", heatStyles[l])} />
                <span className="text-[11px] text-muted-foreground capitalize">
                  {l === "low" ? "Low Gap" : l}
                </span>
              </div>
            ))}
          </div>
        </div>
        <Button variant="tonal" className="self-stretch gap-1.5">
          View Heat Map Details <ChevronRight className="size-3.5" />
        </Button>
      </CardWidgetContent>
    </CardWidget>
  )
}

/* ────────────────────────────────────────────────────────── */
/* ROW 3a — Department Readiness Radar                      */
/* ────────────────────────────────────────────────────────── */

const deptRadarData = [
  { metric: "Leadership",    organisation: 82, average: 65 },
  { metric: "Digital Skills",organisation: 74, average: 60 },
  { metric: "Innovation",    organisation: 68, average: 55 },
  { metric: "Communication", organisation: 78, average: 70 },
  { metric: "Problem Solving",organisation: 85, average: 72 },
  { metric: "Organisation",  organisation: 72, average: 63 },
  { metric: "Ops Excellence",organisation: 80, average: 68 },
]

export function DepartmentReadinessCard() {
  return (
    <CardWidget className="flex flex-col overflow-hidden p-0">
      <CardWidgetHeader>
        <CardWidgetIcon>{ICON}</CardWidgetIcon>
        <CardWidgetTitle>Department Readiness Radar</CardWidgetTitle>
      </CardWidgetHeader>
      <CardWidgetContent className="flex-1 flex flex-col p-0">
        <GlowRadarChart
          className="w-full flex-1 min-h-[260px]"
          data={deptRadarData}
          metricKey="metric"
          series={[
            { key: "organisation", label: "Organisation", color: "var(--chart-primary)" },
            { key: "average",      label: "Average",      color: "var(--chart-secondary)" },
          ]}
        />
        <div className="p-4 pt-0">
          <Button variant="tonal" className="w-full gap-1.5">
            View Details <ChevronRight className="size-3.5" />
          </Button>
        </div>
      </CardWidgetContent>
    </CardWidget>
  )
}

/* ────────────────────────────────────────────────────────── */
/* ROW 3b — Succession Readiness 9-Box Matrix               */
/* ────────────────────────────────────────────────────────── */

type MatrixLevel = "ready" | "done" | "notready"

const matrixStyles: Record<MatrixLevel, string> = {
  ready:    "bg-emerald-500/20 text-emerald-700 dark:bg-emerald-500/30 dark:text-emerald-300 border border-emerald-500/30",
  done:     "bg-sky-500/20 text-sky-700 dark:bg-sky-500/30 dark:text-sky-300 border border-sky-500/30",
  notready: "bg-red-500/20 text-red-700 dark:bg-red-500/30 dark:text-red-300 border border-red-500/30",
}

const successionMatrix: { value: number; level: MatrixLevel }[][] = [
  [{ value: 12, level: "notready" }, { value: 27, level: "done" },     { value: 40, level: "ready" }],
  [{ value: 18, level: "done" },     { value: 42, level: "ready" },    { value: 31, level: "done" }],
  [{ value: 15, level: "notready" }, { value: 12, level: "notready" }, { value: 23, level: "done" }],
]
const perfLabels = ["High", "Med", "Low"]
const potLabels  = ["Low", "Med", "High"]

export function SuccessionMatrixCard() {
  return (
    <CardWidget className="flex flex-col">
      <CardWidgetHeader>
        <CardWidgetIcon>{ICON}</CardWidgetIcon>
        <CardWidgetTitle>Succession Readiness</CardWidgetTitle>
      </CardWidgetHeader>
      <CardWidgetContent className="flex-1 flex flex-col gap-4">
        <div className="flex gap-2 items-start">
          <div className="flex flex-col items-center justify-center self-stretch w-4 shrink-0">
            <span className="text-[10px] text-muted-foreground font-medium"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
              Performance
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-3 gap-1 mb-1 ms-7">
              {potLabels.map(l => (
                <div key={l} className="text-[10px] text-center text-muted-foreground font-medium">{l}</div>
              ))}
            </div>
            {successionMatrix.map((row, ri) => (
              <div key={ri} className="flex items-center gap-1 mb-1">
                <span className="text-[10px] text-muted-foreground w-6 shrink-0 text-right">{perfLabels[ri]}</span>
                <div className="grid grid-cols-3 gap-1 flex-1">
                  {row.map((cell, ci) => (
                    <div key={ci} className={cn(
                      "h-12 rounded-xl flex items-center justify-center text-xl font-bold font-mono",
                      matrixStyles[cell.level]
                    )}>
                      {cell.value}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <p className="text-[10px] text-muted-foreground text-center mt-1 font-medium">Potential</p>
          </div>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          {(["ready", "done", "notready"] as MatrixLevel[]).map(l => (
            <div key={l} className="flex items-center gap-1.5">
              <div className={cn("size-3 rounded", matrixStyles[l])} />
              <span className="text-[11px] text-muted-foreground">
                {l === "notready" ? "Not Ready" : l === "done" ? "Done" : "Ready Now"}
              </span>
            </div>
          ))}
        </div>
        <Button variant="tonal" className="self-stretch gap-1.5">
          View Talent Matrix <ChevronRight className="size-3.5" />
        </Button>
      </CardWidgetContent>
    </CardWidget>
  )
}

/* ────────────────────────────────────────────────────────── */
/* ROW 3c — Leadership Pipeline (funnel)                    */
/* ────────────────────────────────────────────────────────── */

const pipelineData = [
  { label: "Total Employees", value: 2230, pct: null, color: "bg-chart-primary",       text: "text-chart-primary" },
  { label: "High Potential",  value: 850,  pct: 36,   color: "bg-chart-primary-light", text: "text-chart-primary" },
  { label: "Ready Now",       value: 230,  pct: 27,   color: "bg-chart-tertiary",      text: "text-chart-tertiary" },
  { label: "Ready in 1–2 yrs",value: 78,   pct: 34,   color: "bg-chart-quaternary",    text: "text-chart-quaternary" },
]
const pipelineMax = pipelineData[0].value

export function LeadershipPipelineCard() {
  return (
    <CardWidget className="flex flex-col">
      <CardWidgetHeader>
        <CardWidgetIcon>{ICON}</CardWidgetIcon>
        <CardWidgetTitle>Leadership Pipeline</CardWidgetTitle>
      </CardWidgetHeader>
      <CardWidgetContent className="flex-1 flex flex-col gap-3">
        {pipelineData.map((item, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-foreground">{item.label}</span>
              <span className={cn("font-mono font-bold", item.text)}>
                {item.value.toLocaleString()}
                {item.pct != null && (
                  <span className="text-muted-foreground font-normal ml-1.5">{item.pct}%</span>
                )}
              </span>
            </div>
            <div className="h-5 rounded-full bg-muted/40 overflow-hidden">
              <motion.div
                className={cn("h-full rounded-full", item.color)}
                initial={{ width: 0 }}
                whileInView={{ width: `${(item.value / pipelineMax) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut", delay: i * 0.15 }}
              />
            </div>
          </div>
        ))}
        <div className="flex items-center gap-4 mt-1 flex-wrap text-[11px] text-muted-foreground">
          <div className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-chart-quaternary inline-block" />Delay</div>
          <div className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-chart-tertiary inline-block" />Current</div>
          <div className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-chart-primary inline-block" />High Priority</div>
        </div>
        <Button variant="tonal" className="self-stretch gap-1.5 mt-auto">
          Pipeline Details <ChevronRight className="size-3.5" />
        </Button>
      </CardWidgetContent>
    </CardWidget>
  )
}

/* ────────────────────────────────────────────────────────── */
/* ROW 4 — Progress Stat Cards                              */
/* ────────────────────────────────────────────────────────── */

interface ProgressStatCardProps {
  title: string
  value: number
  subLabel: string
  progressValue: number
  progressLabel: string
  progressColor?: string
  trend?: string
  trendUp?: boolean
  index?: number
}

export function ProgressStatCard({
  title, value, subLabel, progressValue, progressLabel,
  progressColor = "var(--chart-primary)", trend, trendUp = true, index = 0,
}: ProgressStatCardProps) {
  const { theme } = useTheme()
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-30px" })
  const [num, setNum] = React.useState(0)

  React.useEffect(() => {
    if (!isInView) return
    const ctrl = animate(0, value, {
      duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.1,
      onUpdate: v => setNum(Math.round(v)),
    })
    return () => ctrl.stop()
  }, [isInView, value, index])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
    >
      <MagicCard gradientColor={theme === "dark" ? "color-mix(in oklch, var(--chart-primary) 30%, transparent)" : "var(--chart-primary)"} className="p-0 rounded-[32px]">
        <div className={cn(
          "p-5 overflow-hidden relative flex flex-col gap-2",
          "bg-white dark:bg-slate-800/50 rounded-[32px]",
          "shadow-[-2px_3px_9px_0px_rgba(230,239,235,1.00)] dark:shadow-none"
        )}>
          <p className="text-sm font-mono font-bold text-foreground">{title}</p>
          <p className="text-4xl font-mono font-bold text-gray-700 dark:text-gray-100 leading-none tabular-nums">
            {num.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">{subLabel}</p>
          {trend && (
            <span className={cn(
              "text-xs font-mono font-bold flex items-center gap-0.5 w-fit",
              trendUp ? "text-chart-primary" : "text-chart-quaternary"
            )}>
              {trendUp ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
              {trend}
            </span>
          )}
          <div className="flex flex-col gap-1 mt-1">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{progressLabel}</span>
              <span className="font-mono font-bold" style={{ color: progressColor }}>{progressValue}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted/50 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: progressColor }}
                initial={{ width: 0 }}
                whileInView={{ width: `${progressValue}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 + 0.3 }}
              />
            </div>
          </div>
        </div>
      </MagicCard>
    </motion.div>
  )
}

export function EmployeesProgressCard() {
  return <ProgressStatCard title="Total Employees" value={2350} subLabel="vs Last month"
    progressValue={72} progressLabel="Growth Rate" trend="+3% vs Last month" trendUp index={0} />
}
export function AssessmentsProgressCard() {
  return <ProgressStatCard title="Active Assessments" value={1245} subLabel="In Progress"
    progressValue={72} progressLabel="Completion" progressColor="var(--chart-primary)" index={1} />
}
export function InterviewsProgressCard() {
  return <ProgressStatCard title="Completed Interviews" value={2350} subLabel="vs Last month"
    progressValue={74} progressLabel="Completion" progressColor="var(--chart-secondary)" index={2} />
}
export function TechnicalProgressCard() {
  return <ProgressStatCard title="Technical Assessments" value={1102} subLabel="vs Last month"
    progressValue={73} progressLabel="Pass Rate" progressColor="var(--chart-quaternary)" index={3} />
}

/* ────────────────────────────────────────────────────────── */
/* ROW 5 — Score Cards (animated ring + sparkline)          */
/* ────────────────────────────────────────────────────────── */

function ScoreRing({ value, color, size = 110 }: { value: number; color: string; size?: number }) {
  const r = (size / 2) - 10
  const circ = 2 * Math.PI * r
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [offset, setOffset] = React.useState(circ)

  React.useEffect(() => {
    if (!isInView) return
    const target = circ - (value / 100) * circ
    const ctrl = animate(circ, target, {
      duration: 1.5, ease: "easeInOut",
      onUpdate: v => setOffset(v),
    })
    return () => ctrl.stop()
  }, [isInView, value, circ])

  return (
    <div ref={ref} className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none"
          stroke="currentColor" strokeWidth={9} className="text-muted/20" />
        <circle cx={size/2} cy={size/2} r={r} fill="none"
          stroke={color} strokeWidth={9}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold font-mono tabular-nums" style={{ color }}>{value}%</span>
      </div>
    </div>
  )
}

interface ScoreCardProps {
  title: string
  score: number
  label: string
  trend: string
  trendUp?: boolean
  color: string
  sparkData: { value: number }[]
  index?: number
}

export function ScoreCard({
  title, score, label, trend, trendUp = true, color, sparkData, index = 0,
}: ScoreCardProps) {
  const fillId = `sc-${index}`
  return (
    <CardWidget>
      <CardWidgetHeader>
        <CardWidgetIcon>{ICON}</CardWidgetIcon>
        <CardWidgetTitle>{title}</CardWidgetTitle>
      </CardWidgetHeader>
      <CardWidgetContent>
        <div className="flex items-center gap-4">
          <ScoreRing value={score} color={color} />
          <div className="flex flex-col gap-1 min-w-0">
            <p className="text-base font-medium text-foreground">{label}</p>
            <span className={cn(
              "text-sm font-mono font-bold flex items-center gap-0.5",
              trendUp ? "text-chart-primary" : "text-chart-quaternary"
            )}>
              {trendUp ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
              {trend}
            </span>
            <span className="text-xs text-muted-foreground">vs Last Quarter</span>
          </div>
        </div>
        <div className="mt-3 h-16">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparkData} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="value" stroke={color} strokeWidth={2}
                fill={`url(#${fillId})`} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardWidgetContent>
    </CardWidget>
  )
}

export function WorkforceReadinessCard() {
  return <ScoreCard title="Workforce Readiness Score" score={78} label="Good"
    trend="↑8%" trendUp color="var(--chart-primary)"
    sparkData={[{value:62},{value:65},{value:70},{value:68},{value:72},{value:78}]} index={0} />
}
export function OverallGapCard() {
  return <ScoreCard title="Overall Gap Percentage" score={42} label="Moderate"
    trend="↓3%" trendUp={false} color="var(--chart-tertiary)"
    sparkData={[{value:50},{value:47},{value:45},{value:44},{value:43},{value:42}]} index={1} />
}
export function WorkforceOverdueCard() {
  return <ScoreCard title="Workforce Overdue Score" score={78} label="Critical"
    trend="↑22%" trendUp={false} color="var(--chart-quaternary)"
    sparkData={[{value:55},{value:60},{value:65},{value:70},{value:75},{value:78}]} index={2} />
}

/* ────────────────────────────────────────────────────────── */
/* ROW 6a — Psychological Analysis                          */
/* ────────────────────────────────────────────────────────── */

const psychoMetrics = [
  { label: "Emotional Intelligence", value: 82, color: "var(--chart-primary)" },
  { label: "Stress Resilience",      value: 76, color: "var(--chart-secondary)" },
  { label: "Team Collaboration",     value: 88, color: "var(--chart-quinary)" },
  { label: "Adaptability",           value: 79, color: "var(--chart-tertiary)" },
]

const psychoRadarData = [
  { metric: "Emotional Intelligence", organisation: 82, average: 70 },
  { metric: "Self Awareness",         organisation: 75, average: 65 },
  { metric: "Decision Making",        organisation: 80, average: 68 },
  { metric: "Adaptability",           organisation: 79, average: 72 },
  { metric: "Team Collaboration",     organisation: 88, average: 75 },
  { metric: "Stress Resilience",      organisation: 76, average: 63 },
]

export function PsychologicalAnalysisCard() {
  return (
    <CardWidget className="flex flex-col">
      <CardWidgetHeader>
        <CardWidgetIcon>{ICON}</CardWidgetIcon>
        <CardWidgetTitle>Psychological Analysis</CardWidgetTitle>
      </CardWidgetHeader>
      <CardWidgetContent className="flex-1 flex flex-col gap-4">
        <div className="flex gap-6 items-start">
          <div className="flex-1 flex flex-col gap-4 min-w-0">
            {psychoMetrics.map(m => (
              <div key={m.label} className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{m.label}</span>
                  <span className="font-mono font-bold tabular-nums" style={{ color: m.color }}>{m.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted/40 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: m.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${m.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="w-[200px] shrink-0 hidden lg:block">
            <GlowRadarChart
              className="w-full"
              height={220}
              data={psychoRadarData}
              metricKey="metric"
              series={[
                { key: "organisation", label: "Organisation", color: "var(--chart-primary)" },
                { key: "average",      label: "Average",      color: "var(--chart-secondary)" },
              ]}
            />
          </div>
        </div>
        <Button variant="tonal" className="self-stretch gap-1.5 mt-auto">
          View Full Analysis Details <ChevronRight className="size-3.5" />
        </Button>
      </CardWidgetContent>
    </CardWidget>
  )
}

/* ────────────────────────────────────────────────────────── */
/* ROW 6b — Interview Analytics                             */
/* ────────────────────────────────────────────────────────── */

const interviewFunnelData: PyramidSegment[] = [
  { name: "Scheduled",   value: 1500, gradient: ["oklch(0.58 0.09 200)", "oklch(0.43 0.11 200)"] },
  { name: "In Progress", value: 1102, gradient: ["oklch(0.63 0.13 57)",  "oklch(0.48 0.15 57)"]  },
  { name: "Evaluation",  value: 321,  gradient: ["oklch(0.60 0.18 12)",  "oklch(0.45 0.20 12)"]  },
  { name: "Completed",   value: 1125, gradient: ["oklch(0.75 0.17 152)", "oklch(0.58 0.19 152)"] },
]

export function InterviewAnalyticsCard() {
  return (
    <CardWidget className="flex flex-col">
      <CardWidgetHeader>
        <CardWidgetIcon>{ICON}</CardWidgetIcon>
        <CardWidgetTitle>Interview Analytics</CardWidgetTitle>
      </CardWidgetHeader>
      <CardWidgetContent className="flex-1 flex flex-col gap-4">
        <div className="flex gap-6 items-start">
          <div className="flex flex-col gap-4 shrink-0">
            <MiniGauge value={73} label="Completed 1,125" color="var(--chart-primary)" size={72} />
            <MiniGauge value={66} label="Pending 321"     color="var(--chart-secondary)" size={65} />
            <MiniGauge value={22} label="Overdue 77"      color="var(--chart-quaternary)" size={65} />
          </div>
          <div className="flex-1 min-w-0 flex flex-col gap-2">
            <InvertedPyramidChart data={interviewFunnelData} height={210} />
            <div className="mt-2 p-3 rounded-xl bg-muted/30 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Average Time to Complete</span>
              <div className="text-right">
                <p className="text-lg font-mono font-bold">
                  14.6 <span className="text-sm font-normal text-muted-foreground">Days</span>
                </p>
                <p className="text-xs text-chart-primary font-mono">↑ +2.1 days vs last month</p>
              </div>
            </div>
          </div>
        </div>
        <Button variant="tonal" className="self-stretch gap-1.5 mt-auto">
          View Interview Report <ChevronRight className="size-3.5" />
        </Button>
      </CardWidgetContent>
    </CardWidget>
  )
}
