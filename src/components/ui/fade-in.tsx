import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

type FadeInDirection = "up" | "down" | "left" | "right" | "none"

interface FadeInProps {
  children: React.ReactNode
  className?: string
  /** Direction the element slides in from */
  from?: FadeInDirection
  /** Distance in px to travel */
  distance?: number
  /** Fixed delay in seconds */
  delay?: number
  /** Stagger index — final delay = index * stagger */
  index?: number
  /** Per-step stagger interval in seconds (used with index) */
  stagger?: number
  duration?: number
  /** Viewport margin before triggering */
  margin?: string
  once?: boolean
  onMouseEnter?: React.MouseEventHandler
  onMouseLeave?: React.MouseEventHandler
}

const directionOffset: Record<FadeInDirection, { x: number; y: number }> = {
  up:    { x: 0,  y: 1  },
  down:  { x: 0,  y: -1 },
  left:  { x: 1,  y: 0  },
  right: { x: -1, y: 0  },
  none:  { x: 0,  y: 0  },
}

export function FadeIn({
  children,
  className,
  from = "up",
  distance = 32,
  delay = 0,
  index = 0,
  stagger = 0,
  duration = 0.8,
  margin = "-40px",
  once = true,
  onMouseEnter,
  onMouseLeave,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isInView = useInView(ref, { once, margin: margin as any })

  const offset = directionOffset[from]
  const totalDelay = delay + index * stagger

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={{ opacity: 0, x: offset.x * distance, y: offset.y * distance }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration, ease: "easeInOut", delay: totalDelay }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  )
}
