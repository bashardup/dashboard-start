import { motion } from "framer-motion"

export interface RoundedBarProps {
  x?: number
  y?: number
  width?: number
  height?: number
  fill?: string
  index?: number
  entrance?: boolean
  orientation?: "vertical" | "horizontal"
}

export function RoundedBar({
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  fill,
  index = 0,
  entrance = true,
  orientation = "vertical",
}: RoundedBarProps) {
  const isHorizontal = orientation === "horizontal"

  if (isHorizontal) {
    if (width <= 0) return null
    const r = Math.min(height / 2, 6)
    const d = `M ${x},${y} L ${x + width - r},${y} Q ${x + width},${y} ${x + width},${y + r} L ${x + width},${y + height - r} Q ${x + width},${y + height} ${x + width - r},${y + height} L ${x},${y + height} Z`
    return (
      <motion.path
        d={d} fill={fill}
        initial={entrance ? { scaleX: 0 } : false}
        animate={entrance ? { scaleX: 1 } : undefined}
        style={{ originX: 0, originY: 0.5 }}
        transition={entrance
          ? { delay: index * 0.1, duration: 0.8, ease: [0.34, 1.2, 0.64, 1] }
          : { duration: 0.8, ease: "easeOut" }
        }
      /> 
    )
  }

  if (height <= 0) return null
  const r = Math.min(width / 2, 6)
  const d = `M ${x},${y + r} Q ${x},${y} ${x + r},${y} L ${x + width - r},${y} Q ${x + width},${y} ${x + width},${y + r} L ${x + width},${y + height} L ${x},${y + height} Z`
  return (
    <motion.path
      d={d} fill={fill}
      initial={entrance ? { scaleY: 0 } : false} 
      animate={entrance ? { scaleY: 1 } : undefined}
      style={{ originX: 0.5, originY: 1 }}
      transition={entrance
        ? { delay: index * 0.07, duration: 0.8, ease: [0.34, 1.2, 0.64, 1] }
        : { duration: 0.8, ease: "easeOut" }
      }
    />
  )
}
