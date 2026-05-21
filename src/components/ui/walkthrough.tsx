import * as React from "react"
import { createPortal } from "react-dom"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"

/* ── Types ──────────────────────────────────────────────────────────────── */

export interface WalkthroughStep {
  /** CSS selector of the element to highlight. Omit for centered modal. */
  target?: string
  title: string
  description: string
  icon?: React.ReactNode
  /** Preferred tooltip placement relative to target */
  placement?: "top" | "bottom" | "left" | "right"
}

export interface WalkthroughProps {
  steps: WalkthroughStep[]
  open: boolean
  onClose: () => void
  /** Called when the last step's Next is clicked */
  onFinish?: () => void
}

/* ── Placement helpers ──────────────────────────────────────────────────── */

const TOOLTIP_W = 340
const TOOLTIP_H = 200 // approximate
const GAP = 16

interface Rect { top: number; left: number; width: number; height: number }

function computePosition(
  target: Rect,
  placement: WalkthroughStep["placement"] = "bottom"
): { top: number; left: number; placement: string } {
  const vw = window.innerWidth
  const vh = window.innerHeight
  const PAD = 12

  const positions = {
    bottom: { top: target.top + target.height + GAP, left: target.left + target.width / 2 - TOOLTIP_W / 2 },
    top:    { top: target.top - TOOLTIP_H - GAP,     left: target.left + target.width / 2 - TOOLTIP_W / 2 },
    right:  { top: target.top + target.height / 2 - TOOLTIP_H / 2, left: target.left + target.width + GAP },
    left:   { top: target.top + target.height / 2 - TOOLTIP_H / 2, left: target.left - TOOLTIP_W - GAP },
  }

  // Try preferred, fall back if off-screen
  const order: Array<WalkthroughStep["placement"]> = [placement, "bottom", "top", "right", "left"]
  for (const p of order) {
    const pos = positions[p!]
    if (
      pos.top >= PAD &&
      pos.top + TOOLTIP_H <= vh - PAD &&
      pos.left >= PAD &&
      pos.left + TOOLTIP_W <= vw - PAD
    ) {
      return { ...pos, placement: p! }
    }
  }

  // Clamp to viewport
  const pos = positions[placement ?? "bottom"]
  return {
    top: Math.max(PAD, Math.min(pos.top, vh - TOOLTIP_H - PAD)),
    left: Math.max(PAD, Math.min(pos.left, vw - TOOLTIP_W - PAD)),
    placement: placement ?? "bottom",
  }
}

/* ── Spotlight overlay ──────────────────────────────────────────────────── */

function Spotlight({ rect, borderRadius = 12 }: { rect: Rect | null; borderRadius?: number }) {
  if (!rect) return (
    <div className="fixed inset-0 bg-black/50 z-[9998]" />
  )

  const { top, left, width, height } = rect
  const r = borderRadius

  return (
    <svg
      className="fixed inset-0 z-[9998] pointer-events-none"
      width="100%"
      height="100%"
      style={{ position: "fixed", top: 0, left: 0 }}
    >
      <defs>
        <mask id="walkthrough-mask">
          <rect width="100%" height="100%" fill="white" />
          <rect
            x={left - 4}
            y={top - 4}
            width={width + 8}
            height={height + 8}
            rx={r}
            ry={r}
            fill="black"
          />
        </mask>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill="rgba(0,0,0,0.55)"
        mask="url(#walkthrough-mask)"
      />
      {/* highlight ring */}
      <rect
        x={left - 4}
        y={top - 4}
        width={width + 8}
        height={height + 8}
        rx={r}
        ry={r}
        fill="none"
        stroke="rgba(38,208,124,0.6)"
        strokeWidth="2"
      />
    </svg>
  )
}

/* ── Tooltip card ───────────────────────────────────────────────────────── */

interface TooltipCardProps {
  step: WalkthroughStep
  index: number
  total: number
  style: React.CSSProperties
  onPrev: () => void
  onNext: () => void
  onClose: () => void
  isFirst: boolean
  isLast: boolean
}

function TooltipCard({ step, index, total, style, onPrev, onNext, onClose, isFirst, isLast }: TooltipCardProps) {
  return (
    <div
      className="fixed z-[9999] border-0 w-[340px] dark:bg-[#12151C] bg-white border  rounded-2xl p-5 shadow-2xl"
      style={style}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 size-7 flex items-center justify-center rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
      >
        <X className="size-3.5" />
      </button>

      {step.icon && (
        <div className="mb-3">
          {step.icon}
        </div>
      )}

      <p className="font-mono font-bold text-card-foreground text-base leading-snug mb-1.5 pr-6">
        {step.title}
      </p>

      <p className="text-sm text-zinc-400 leading-relaxed mb-5">
        {step.description}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-zinc-500 font-mono">{index + 1}/{total}</span>
        <div className="flex items-center gap-2">
          {!isFirst && (
            <Button
              size="sm"
              variant="tonal"
              className="gap-1 rounded-4xl"
              onClick={onPrev}
            >
              <ChevronLeft className="size-3.5" />
              Back
            </Button>
          )}
          <Button
            size="sm"
            variant="tonal"
            className="gap-1 rounded-4xl"
            onClick={onNext}
          >
            {isLast ? "Finish" : "Next"}
            {!isLast && <ChevronRight className="size-3.5" />}
          </Button>
        </div>
      </div>
    </div>
  )
}


export function Walkthrough({ steps, open, onClose, onFinish }: WalkthroughProps) {
  const [index, setIndex] = React.useState(0)
  const [targetRect, setTargetRect] = React.useState<Rect | null>(null)
  const [tooltipStyle, setTooltipStyle] = React.useState<React.CSSProperties>({})

  const step = steps[index]

  React.useEffect(() => {
    if (!open) return

    function update() {
      const el = step.target ? document.querySelector(step.target!) as HTMLElement | null : null
      if (el) {
        el.scrollIntoView({ block: "center", behavior: "smooth" })
        const r = el.getBoundingClientRect()
        const rect = { top: r.top, left: r.left, width: r.width, height: r.height }
        setTargetRect(rect)
        const { top, left } = computePosition(rect, step.placement)
        setTooltipStyle({ top, left })
      } else {
        setTargetRect(null)
        // Center on screen
        setTooltipStyle({
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        })
      }
    }

    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [open, index, step])

  // Reset on open
  React.useEffect(() => {
    if (open) setIndex(0)
  }, [open])

  if (!open) return null

  const handleNext = () => {
    if (index === steps.length - 1) {
      onClose()
      onFinish?.()
    } else {
      setIndex((i) => i + 1)
    }
  }

  const handlePrev = () => setIndex((i) => Math.max(0, i - 1))

  return createPortal(
    <>
      <Spotlight rect={targetRect} />
      <TooltipCard
        step={step}
        index={index}
        total={steps.length}
        style={tooltipStyle}
        onPrev={handlePrev}
        onNext={handleNext}
        onClose={onClose}
        isFirst={index === 0}
        isLast={index === steps.length - 1}
      />
    </>,
    document.body
  )
}

/* ── useWalkthrough hook ─────────────────────────────────────────────────── */

export function useWalkthrough() {
  const [open, setOpen] = React.useState(false)
  return {
    open,
    start: () => setOpen(true),
    close: () => setOpen(false),
  }
}
