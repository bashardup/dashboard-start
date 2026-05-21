import * as React from "react"
import { Check } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export type StepStatus = "completed" | "active" | "pending"

export interface StepperStep {
  title: string
  status: StepStatus
}

interface StepperProps {
  steps: StepperStep[]
  className?: string
}

function StepDot({ status, index }: { status: StepStatus; index: number }) {
  return (
    <div className="relative flex items-center justify-center">
      {/* Ripple rings — active only */}
      {status === "active" && (
        <>
          <motion.span
            className="absolute size-6 rounded-full bg-primary/50"
            animate={{ scale: [1, 1, 1.6], opacity: [0, 0.55, 0] }}
            transition={{ duration: 0.9, times: [0, 0.04, 1], repeat: Infinity, ease: "easeOut" }}
          />
          <motion.span
            className="absolute size-6 rounded-full bg-primary/30"
            animate={{ scale: [1, 1, 1.9], opacity: [0, 0.4, 0] }}
            transition={{ duration: 0.9, times: [0, 0.04, 1], repeat: Infinity, ease: "easeOut", delay: 0.35 }}
          />
        </>
      )}

      <div
        className={cn(
          "relative size-9 rounded-full flex items-center justify-center shrink-0 transition-all",
          status === "completed" && "bg-primary",
          status === "active"    && "bg-primary",
          status === "pending"   && "bg-transparent border-2 border-border"
        )}
      >
        {status === "completed" ? (
          <Check className="size-4 text-primary-foreground" strokeWidth={2.5} />
        ) : (
          <span
            className={cn(
              "font-mono font-bold text-sm leading-none",
              status === "active"  && "text-primary-foreground",
              status === "pending" && "text-muted-foreground"
            )}
          >
            {index + 1}
          </span>
        )}
      </div>
    </div>
  )
}

function StepConnector({ fromStatus }: { fromStatus: StepStatus; toStatus: StepStatus }) {
  const filled = fromStatus === "completed"
  return (
    <div className="flex-1 flex items-center overflow-hidden">
      {filled ? (
        <div className="relative w-full h-px bg-border overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      ) : (
        <div className="w-full border-t-2 border-dashed border-border" />
      )}
    </div>
  )
}

export function Stepper({ steps, className }: StepperProps) {
  return (
    <div className={cn("flex items-start gap-0", className)}>
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center gap-2">
            <StepDot status={step.status} index={i} />
            <span
              className={cn(
                "text-xs font-medium whitespace-nowrap",
                step.status === "active"    && "text-primary",
                step.status === "completed" && "text-foreground",
                step.status === "pending"   && "text-muted-foreground"
              )}
            >
              {step.title}
            </span>
          </div>

          {i < steps.length - 1 && (
            <div className="flex-1 pt-[18px] px-2">
              <StepConnector fromStatus={step.status} toStatus={steps[i + 1].status} />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
