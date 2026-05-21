import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronsUpDown, User } from "lucide-react"
import { cn } from "@/lib/utils"
import useIsRtl from "@/hooks/useIsRtl"

export interface ProfileSwitcherOption {
  value: string
  label: string
  description?: string
  icon: string
}

interface ProfileSwitcherProps {
  options: ProfileSwitcherOption[]
  value?: string
  onChange?: (value: string) => void
  className?: string
}

const ITEM_H  = 82
const PEEK_H  = 8
const MAX_PEEK = 2
const EASE = [0.77, 0, 0.18, 1] as const

export function ProfileSwitcher({ options, value, onChange, className }: ProfileSwitcherProps) {
  const [expanded, setExpanded] = useState(false)
  const [internalSelected, setInternalSelected] = useState(value ?? options[0]?.value)
  const collapseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isRtl = useIsRtl()

  const selected  = value ?? internalSelected
  const others    = options.filter(o => o.value !== selected)
  // const peekCount = Math.min(others.length, MAX_PEEK)

  const collapsedH = ITEM_H
  const expandedH  = options.length * ITEM_H

  function handleSelect(val: string) {
    setInternalSelected(val)
    onChange?.(val)
    setExpanded(false)
}

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => {
        if (collapseTimer.current) clearTimeout(collapseTimer.current)
      }}
      onMouseLeave={() => {
        collapseTimer.current = setTimeout(() => setExpanded(false), 1000)
      }}
    >
      {/* Toggle */}
      <button
        onClick={() => setExpanded(p => !p)}
        className={cn(
          "z-20 cursor-pointer absolute bottom-[30px] p-1 text-muted-foreground transition-all duration-300 ease-in-out",
          isRtl ? "left-[15px]" : "right-[15px]",
          expanded ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto delay-100"
        )}
      >
        <ChevronsUpDown className="h-4 w-4" />
      </button>

      {/* Glow accent */}
      {/* <span className={cn(
        "z-1 block absolute pointer-events-none top-0 -translate-y-[30%] bg-[radial-gradient(#7af2c729,transparent_75%)] rounded-full w-full h-full",
        isRtl ? "-translate-x-[10%]" : "translate-x-[10%]"
      )} /> */}

      {/* Container */}
      <motion.div
        className="relative border bg-white dark:bg-slate-800 rounded-2xl border-border overflow-hidden"
        animate={{ height: expanded ? expandedH : collapsedH }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {options.map((opt, i) => {
          const isSelected = opt.value === selected
          const rank = others.indexOf(opt) // -1 for selected, 0…N for others

          /* ── Collapsed positions ─────────────────────────────────────────
           * Selected sits at top (y=0).
           * Peek cards stack below the selected card, each peeking PEEK_H px.
           *   rank=0 (closest peek):  y = ITEM_H + (MAX_PEEK-1)*PEEK_H, z=9, scaleX=0.96
           *   rank=1 (further peek):  y = ITEM_H + 0,                   z=8, scaleX=0.92
           * Higher-z peek is positioned lower so it blocks the lower-z one's bottom strip.
           * ───────────────────────────────────────────────────────────────── */
          let cY: number, cScaleX: number, cZ: number, cOpacity: number
          if (isSelected) {
            cY = 0; cScaleX = 1; cZ = 10; cOpacity = 1
          } else if (rank < MAX_PEEK) {
            cY       = ITEM_H + (MAX_PEEK - 1 - rank) * PEEK_H
            cScaleX  = 1 - (rank + 1) * 0.04
            cZ       = 9 - rank
            cOpacity = 1
          } else {
            cY = ITEM_H + MAX_PEEK * PEEK_H + (rank - MAX_PEEK) * 4
            cScaleX = 0.85; cZ = 1; cOpacity = 0
          }

          // Expanded: items laid out top-to-bottom in their original order
          const eY      = i * ITEM_H
          const eScaleX = 1
          const eZ      = isSelected ? options.length + 1 : options.length - i
          const eOpacity = 1

          return (
            <motion.button
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className="absolute top-0 left-0 w-full p-5 text-left overflow-hidden bg-white dark:bg-slate-800 group/btn"
              style={{ height: ITEM_H, originX: 0.5, originY: 0 }}
              animate={{
                y:       expanded ? eY       : cY,
                scaleX:  expanded ? eScaleX  : cScaleX,
                opacity: expanded ? eOpacity : cOpacity,
                zIndex:  expanded ? eZ       : cZ,
              }}
              transition={{
                duration: 0.65,
                ease: EASE,
                delay: expanded ? i * 0.04 : (options.length - 1 - i) * 0.03,
              }}
            >
              <div className="flex items-center gap-8">
                {/* Icon */}
                <div className={cn("size-10  relative shrink-0 ")}>
                  <span className="rounded-lg absolute bg-transparent bg-linear-to-tr to-[#8DED60]  from-[#5BCD5E] backdrop-blur-xs inset-0 size-full object-cover transition-transform duration-700 ease-[cubic-bezier(.77,0,.18,1)] scale-90 rotate-12 group-hover/btn:-rotate-20 translate-x-[31%] -translate-y-[20%] group-hover/btn:scale-100 group-hover/btn:translate-x-0 group-hover/btn:translate-y-0" />
                
                 <div className={cn("rotate-0 group-hover/btn:rotate-12 transition-all duration-700 ease-[cubic-bezier(.77,0,.18,1)] translate-x-0 translate-y-0 group-hover/btn:translate-x-[31%] group-hover/btn:translate-y-[-20%] size-full rounded-lg bg-[#5BCD5E]/50 border-2 border-white/20 backdrop-blur-xs relative shrink-0", isSelected ? "opacity-100" : "opacity-50")}>
                
                  <User className="absolute inset-0 m-auto size-5" fill="white" stroke="white" />
                  </div>
                </div>

                {/* Text */}
                <div className="grow min-w-0">
                  {opt.description && (
                    <p className="text-muted-foreground text-xs font-normal leading-none mb-1">{opt.description}</p>
                  )}
                  <h3 className={cn("text-xs font-bold leading-none truncate transition-colors duration-300", isSelected ? "text-foreground" : "text-muted-foreground")}>
                    {opt.label}
                  </h3>
                </div>

                {/* Radio */}
                <div className={cn(
                  "shrink-0 p-[2px] w-4 h-4 border-2 relative bg-white rounded-full transition-all duration-300",
                  isSelected ? "border-emerald-600" : "border-muted-foreground/40",
                  expanded ? "opacity-100" : "opacity-0 pointer-events-none"
                )}>
                  <div className={cn("size-full rounded-full bg-emerald-600 transition-all duration-300", isSelected ? "opacity-100 scale-100" : "opacity-0 scale-0")} />
                </div>
              </div>
            </motion.button>
          )
        })}
      </motion.div>
    </div>
  )
}
