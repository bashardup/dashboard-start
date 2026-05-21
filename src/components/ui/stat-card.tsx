import * as React from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "../theme-provider"
import { MagicCard } from "./magic-card"
import { motion, useInView, animate } from "framer-motion"
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts"

interface MiniTooltipProps {
  active?: boolean
  payload?: Array<{ value?: number }>
}

type GlowPosition = "left-bottom" | "left-top" | "right-bottom" | "right-top"

const glowPositionClasses: Record<GlowPosition, string> = {
  "left-bottom":  "translate-x-[-37%] translate-y-[60%]  ltr:left-0 rtl:right-0 bottom-0",
  "left-top":     "translate-x-[-37%] translate-y-[-60%] ltr:left-0 rtl:right-0 top-0",
  "right-bottom": "translate-x-[37%]  translate-y-[60%]  ltr:right-0 rtl:left-0 bottom-0",
  "right-top":    "translate-x-[37%]  translate-y-[-60%] ltr:right-0 rtl:left-0 top-0",
}

export interface StatCardDataPoint {
  value: number
  [key: string]: string | number
}

interface StatCardProps extends React.ComponentProps<"div"> {
  title: string
  description: string
  data: StatCardDataPoint[]
  trend?: "up" | "down" | "flat"
  glowPosition?: GlowPosition
  index?: number
}

function MiniTooltip({ active, payload }: MiniTooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-border bg-popover px-2 py-1 text-xs shadow">
      <span className="font-medium text-foreground">{payload[0].value}</span>
    </div>
  )
}

function StatCard({
  className,
  title,
  description,
  data,
  glowPosition = "left-bottom",
  index = 0,
  ...props
}: StatCardProps) {
  const { theme } = useTheme()
  const cardRef = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-40px" })

  const numericValue = React.useMemo(() => {
    const n = Number(description)
    return isNaN(n) ? null : n
  }, [description])

  const [displayNum, setDisplayNum] = React.useState(0)

  React.useEffect(() => {
    if (!isInView || numericValue === null) return
    const ctrl = animate(0, numericValue, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      delay: index * 0.2,
      onUpdate: (v) => setDisplayNum(Math.round(v)),
    })
    return () => ctrl.stop()
  }, [isInView, numericValue, index])

  const strokeColor = "#26D07C"
  const fillId = `stat-fill-${index}`

  return (
    <motion.div
      ref={cardRef}
      className="relative will-change-transform"
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeInOut", delay: index * 0.2 }}
    >
      <MagicCard
        gradientColor={theme === "dark" ? "#14cf594d" : "#26D07CFF"}
        className="p-0 rounded-3xl md:rounded-[32px]"
      >
        <div
          data-slot="stat-card"
          className={cn(
            "p-6 md:p-8 pe-0 md:pe-0  cursor-pointer overflow-hidden group bg-white dark:bg-slate-800/50 backdrop-blur-sm relative",
            "shadow-[-2px_3px_9px_0px_rgba(230,239,235,1.00)] dark:shadow-none rounded-[32px]",
            "flex items-stretch h-full gap-1 md:gap-4",
            className
          )}
          {...props}
        >
          {/* Background radial glow */}
          <div
            className={cn(
              "w-96 h-96 opacity-50 absolute rounded-full dark:bg-[radial-gradient(#26d07c59,#26d07c00_65%)] bg-[radial-gradient(#cbf1d8,#eaf9ef00_65%)]",
              glowPositionClasses[glowPosition]
            )}
          />

          {/* Text section */}
          <div className="flex-col-auto w-full order-2 md:order-1 md:w-[45%]">
            <div className="z-40 relative flex flex-col justify-between h-full">
              <h3 className="font-mono leading-normal text-center md:text-start text-sm md:text-base font-bold mb-0.5">
                {title}
              </h3>
              <p className="text-center md:text-start justify-center md:justify-start text-2xl md:text-5xl font-mono font-bold leading-none text-gray-600 dark:text-gray-100 flex items-center gap-1">
                {numericValue !== null ? displayNum : description}
              </p>
            </div>
          </div>

          {/* Chart section */}
          <div className="flex-col-full w-full order-1 md:order-2 flex items-end justify-end">
            <div className="relative w-full max-w-[180px] ms-auto h-[100px]">
              {/* Glow bloom behind chart */}
              <div className="absolute inset-0 rounded-xl blur-xl opacity-30 bg-[radial-gradient(ellipse_at_bottom,#26d07c_0%,transparent_70%)] pointer-events-none" />

              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={strokeColor} stopOpacity={0.35} />
                      <stop offset="100%" stopColor={strokeColor} stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <Tooltip content={<MiniTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={strokeColor}
                    strokeWidth={2}
                    fill={`url(#${fillId})`}
                    dot={false}
                    activeDot={{ r: 4, strokeWidth: 0, fill: strokeColor }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </MagicCard>
    </motion.div>
  )
}

export { StatCard }
