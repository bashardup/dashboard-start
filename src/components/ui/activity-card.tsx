import * as React from "react"
import { useLottie } from "lottie-react"
import { cn } from "@/lib/utils"
import { useTheme } from "../theme-provider"
import { MagicCard } from "./magic-card"
import { useInView, animate } from "framer-motion"

function LottieView({ animationData, playing }: { animationData: object; playing: boolean }) {
  const { View, play, stop } = useLottie({ animationData, loop: true, autoplay: false, style: { width: "100%", height: "100%" } })

  React.useEffect(() => {
    if (playing) play()
    else stop()
  }, [playing, play, stop])

  return <>{View}</>
}

type GlowPosition = "left-bottom" | "left-top" | "right-bottom" | "right-top"

const glowPositionClasses: Record<GlowPosition, string> = {
  "left-bottom":  "translate-x-[-37%] translate-y-[60%]  ltr:left-0 rtl:right-0 bottom-0",
  "left-top":     "translate-x-[-37%] translate-y-[-60%] ltr:left-0 rtl:right-0 top-0",
  "right-bottom": "translate-x-[37%]  translate-y-[60%]  ltr:right-0 rtl:left-0 bottom-0",
  "right-top":    "translate-x-[37%]  translate-y-[-60%] ltr:right-0 rtl:left-0 top-0",
}

interface ActivityCardProps extends React.ComponentProps<"div"> {
  title: string
  description: string
  icon?: { src: string; alt: string }
  lottieId?: object
  glowPosition?: GlowPosition
  index?: number
  delay?: number
}

function ActivityCard({
  className,
  title,
  description,
  icon,
  lottieId,
  glowPosition = "left-bottom",
  index = 0,
  delay,
  ...props
}: ActivityCardProps) {
  const [hovered, setHovered] = React.useState(false)
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
      delay: delay ?? index * 0.2,
      onUpdate: (v) => setDisplayNum(Math.round(v)),
    })
    return () => ctrl.stop()
  }, [isInView, numericValue, index])

  return (
    <div
      ref={cardRef}
      className="relative  will-change-transform"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
     <MagicCard
        gradientColor={theme === "dark" ? "#14cf594d" : "#26D07CFF"}
        className="p-0 rounded-3xl md:rounded-[32px] "
      >
      {/* <span
        style={{
                    padding: "1px",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                }}
      className={cn("absolute top-0 right-0 translate-x-[0.5px] -translate-y-[0.5px] w-[calc(100%+1px)] h-[calc(100%+1px)] bg-[linear-gradient(154deg,#ffffff29,transparent,#ffffff29)] rounded-3xl md:rounded-[32px]", hovered && "border-gradient-animated")}></span> */}

    <div
      data-slot="activity-card"
      className={cn(
        "p-6 md:p-8 cursor-pointer overflow-hidden group bg-white dark:bg-slate-800/50 backdrop-blur-sm relative ",
        "shadow-[-2px_3px_9px_0px_rgba(230,239,235,1.00)] dark:shadow-none rounded-[32px]",
        "flex  items-stretch h-full gap-1 md:gap-4",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "w-96 h-96 opacity-50 absolute rounded-full dark:bg-[radial-gradient(#26d07c59,#26d07c00_65%)] bg-[radial-gradient(#cbf1d8,#eaf9ef00_65%)]",
          glowPositionClasses[glowPosition]
        )}
      />

      <div className="flex-col-auto w-full order-2 md:order-1 md:w-[45%]">
        <div className="z-40 relative flex flex-col justify-between h-full">
          <h3 className="text-gray-600 dark:text-slate-50 font-mono leading-normal text-center md:text-start text-sm md:text-base font-bold mb-0.5">
            {title}
          </h3>
          <p className="text-center md:text-start justify-center md:justify-start text-2xl md:text-5xl font-mono font-bold leading-none text-gray-600 dark:text-gray-100 flex items-center gap-1">
            {numericValue !== null ? displayNum : description}
          </p>
        </div>
      </div>

      <div className="flex-col-full w-full order-1 md:order-2">
        <div className="w-[80%] md:w-full max-w-[120px] ms-auto">
          <div className="aspect-square scale-[1.3] relative translate-y-2">
            {lottieId ? (
              <LottieView animationData={lottieId} playing={hovered} />
            ) : icon ? (
              <img
                src={icon.src}
                alt={icon.alt}
                className="object-contain absolute inset-0 size-full"
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
    </MagicCard>
    </div>
  )
}

export { ActivityCard }