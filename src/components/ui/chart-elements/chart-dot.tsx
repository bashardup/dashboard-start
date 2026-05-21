import { useEffect, useRef } from "react"

interface ChartDotProps {
  cx?: number
  cy?: number
  color: string
  active?: boolean
  r?: number
}

function ActiveDot({ cx, cy, color, radius }: { cx: number; cy: number; color: string; radius: number }) {
  const ref = useRef<SVGCircleElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.getAnimations().forEach(a => a.cancel())
    el.animate(
      [
        { transform: "scale(0.3)", opacity: "0" },
        { transform: "scale(1)",   opacity: "1" },
      ],
      { duration: 350, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)", fill: "forwards" }
    )
  })

  return (
    <circle
      ref={ref}
      cx={cx} cy={cy} r={radius}
      fill="white"
      stroke={color}
      strokeWidth={1.5}
      style={{
        transformBox: "fill-box",
        transformOrigin: "center",
      }}
    />
  )
}

export function ChartDot({ cx, cy, color, active = false, r }: ChartDotProps) {
  if (cx == null || cy == null) return null
  const radius = r ?? (active ? 5 : 3)
  if (active) {
    return <ActiveDot cx={cx} cy={cy} color={color} radius={radius} />
  }
  return (
    <circle cx={cx} cy={cy} r={radius} fill="white" stroke={color} strokeWidth={2} />
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeDot(color: string, r?: number) {
  return (props: any) => <ChartDot cx={props.cx} cy={props.cy} color={color} r={r} />
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeActiveDot(color: string, r?: number) {
  return (props: any) => <ChartDot cx={props.cx} cy={props.cy} color={color} active r={r} />
}
