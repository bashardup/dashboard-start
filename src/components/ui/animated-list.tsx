import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export interface AnimatedListProps {
  className?: string
  children: React.ReactNode
  delay?: number
}

export function AnimatedList({ className, children, delay = 1000 }: AnimatedListProps) {
  const [index, setIndex] = useState(0)
  const childrenArray = Array.isArray(children) ? children : [children]

  useEffect(() => {
    if (index >= childrenArray.length - 1) return
    const timeout = setTimeout(() => setIndex(i => i + 1), delay)
    return () => clearTimeout(timeout)
  }, [index, childrenArray.length, delay])

  const itemsToShow = childrenArray.slice(0, index + 1).reverse()

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <AnimatePresence>
        {itemsToShow.map(item => (
          <AnimatedListItem key={(item as React.ReactElement).key}>
            {item}
          </AnimatedListItem>
        ))}
      </AnimatePresence>
    </div>
  )
}

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      layout
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 28 }}
      className="w-full"
    >
      {children}
    </motion.div>
  )
}
