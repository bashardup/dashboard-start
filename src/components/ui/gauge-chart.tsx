import { useRef, useEffect, useState } from "react"
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion"
import { cn } from "@/lib/utils"

interface GaugeChartProps {
  value?: number
  max?: number
  label?: string
  className?: string
  delay?: number
}

const CX = 150
const CY = 162
const R = 125
const SW = 15
const ARC = `M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`
const PATH_LEN = Math.PI * R

export function GaugeChart({
  value = 87,
  max = 100,
  label = "Compliance rate",
  className,
  delay = 0, 
}: GaugeChartProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-30px" })
  const [num, setNum] = useState(0)

  const mp = useMotionValue(0)
  const dashOffset = useTransform(mp, (p) => PATH_LEN * (1 - p))
  const thumbX = useTransform(mp, (p) => CX + R * Math.cos((1 - p) * Math.PI))
  const thumbY = useTransform(mp, (p) => CY - R * Math.sin((1 - p) * Math.PI))

  useEffect(() => {
    if (!isInView) return
    const target = value / max
    const a = animate(mp, target, { duration: 1.5, ease: "easeInOut", delay })
    const b = animate(0, value, { duration: 1.5, ease: "easeInOut", delay, onUpdate: (v: number) => setNum(Math.round(v)) })
    return () => { a.stop(); b.stop() }
  }, [isInView, value, max, mp])

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex items-center justify-center",
        "[--gauge-track:theme(colors.gray.200)] [--gauge-thumb-bg:theme(colors.white)] [--gauge-value:theme(colors.gray.900)] [--gauge-label-bg:theme(colors.gray.100)] [--gauge-label-text:theme(colors.gray.500)]",
        "dark:[--gauge-track:#1e222c] dark:[--gauge-thumb-bg:#fff] dark:[--gauge-value:#ffffff] dark:[--gauge-label-bg:#1e2530] dark:[--gauge-label-text:#6b7a8f]",
        className
      )}
    >
      <svg
        viewBox="0 0 300 180"
        className="w-full max-w-sm"
        aria-label={`${label}: ${value} out of ${max}`}
        role="img"
      >
        <defs>
          <linearGradient id="gauge-fill" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#26D07C" />
            <stop offset="45%" stopColor="#0b6136"  stopOpacity={0.6}/>
            <stop offset="100%" stopColor="#26D07C" />

          </linearGradient>

          <filter id="gauge-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* <filter id="track-inner-glow" x="-5%" y="-100%" width="110%" height="300%">
            <feFlood floodColor="#26d07c" floodOpacity="0.45" result="color" />
            <feComposite in="color" in2="SourceAlpha" operator="in" result="clipped" />
            <feGaussianBlur in="clipped" stdDeviation="2.5" result="blurred" />
            <feComposite in="blurred" in2="SourceAlpha" operator="in" result="innerGlow" />
            <feMerge>
              <feMergeNode in="SourceGraphic" />
              <feMergeNode in="innerGlow" />
            </feMerge>
          </filter> */}
        </defs>

        <path
          d={ARC}
          fill="none"
          stroke="var(--gauge-track)"
          strokeWidth={SW}
          strokeLinecap="round"
          // filter="url(#track-inner-glow)"
        />

        <motion.path
          d={ARC}
          fill="none"
          stroke="url(#gauge-fill)"
          strokeWidth={SW}
          strokeLinecap="round"
          strokeDasharray={PATH_LEN}
          style={{ strokeDashoffset: dashOffset }}
          // initial={{ filter: "drop-shadow(0px 0px 0px #19e480)" }}
          // animate={isInView ? { filter: "drop-shadow(0px 0px 3px #19e480)" } : undefined}
          transition={{ delay: delay + 1, duration: 1.8, ease: "easeInOut" }}
        />

        <motion.circle
          r={13}
          style={{ cx: thumbX, cy: thumbY }}
          fill="var(--gauge-thumb-bg)"
          stroke="#26d07c"
          strokeWidth={2.5}
          // initial={{ filter: "drop-shadow(0px 0px 0px #26d07c)" }}
          // animate={isInView ? { filter: "drop-shadow(0px 0px 8px #26d07c)" } : undefined}
          transition={{ delay: delay + 1.8, duration: 1.8, ease: "easeInOut" }}
        />
        {/* Thumb dot */}
        <motion.circle
          r={8}
          style={{ cx: thumbX, cy: thumbY }}
          fill="#26d07c"
        />
      </svg>

      {/* Value + label overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-4 pointer-events-none">
        <span
          className="text-5xl font-bold font-mono leading-none"
          style={{ color: "var(--gauge-value)" }}
        >
          {num}
        </span>
        <span
          className="mt-2 px-4 py-1 rounded-full text-xs"
          style={{ background: "var(--gauge-label-bg)", color: "var(--gauge-label-text)" }}
        >
          {label}
        </span>
      </div>
    </div>
  )
}
