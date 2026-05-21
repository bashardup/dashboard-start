import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface DecorImageProps {
  src: string
  alt?: string
  className?: string
}

export function DecorImage({ src, alt = "", className }: DecorImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <div
      aria-hidden="true"
      className={cn(
        "aspect-435/548 opacity-50 w-full max-w-[25vw] pointer-events-none fixed ltr:-right-20 rtl:-left-20 top-0 flex items-center rotate-20",
        className
      )}
    >
      <span
        className="absolute block w-[233%] h-full rounded-[10rem] -top-[20%] -left-[74%] opacity-20"
        style={{ background: "radial-gradient(ellipse at center, #13E295 5%, var(--background) 65%)" }}
      />
      {src && (
        <motion.div
          ref={ref}
          className="w-full h-full"
          initial={{
            scale: 1.12,
          maskImage: "linear-gradient(to bottom, black 24%, rgba(0,0,0,0) 73%)",
          maskSize: "100% 200%",
          maskPosition: "0% 100%",
        }}
        animate={inView ? { scale: 1, maskPosition: "0% 0%" } : {}}
        transition={{ duration: 4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full"
          style={{ maskImage: "linear-gradient(black 24%, transparent 73%)" }}
        />
      </motion.div>
      )}
    </div>
  )
}
