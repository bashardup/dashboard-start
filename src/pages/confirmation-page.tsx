import { useState } from "react"
import { ChevronLeft, Copy, Download, Share2, Check } from "lucide-react"
import { NavLink } from "react-router-dom"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Stepper } from "@/components/ui/stepper"
import {
  ProgressTracker,
  ProgressTrackerItem,
  ProgressTrackerContent,
} from "@/components/ui/progress-tracker"
import { useBreadcrumb } from "@/components/breadcrumb-context"

const wizardSteps = [
  { title: "Pay", status: "completed" as const },
  { title: "Confirm", status: "active" as const },
]

const paymentDetails = [
  { label: "Receipt number", value: "4487182024" },
  { label: "DSG number", value: "550000660234228" },
  { label: "Payment method", value: "Credit card" },
  { label: "Total", value: "AED 29,386" },
]

const timelineSteps = [
  {
    title: "Payment complete",
    status: "completed" as const,
    statusLabel: "Completed",
    description: "12:34:55 • 05/12/2024",
    hasDetails: true,
  },
  {
    title: "In progress",
    status: "in-progress" as const,
    statusLabel: "In progress",
    description: "12:34:55 • 05/12/2024",
  },
  {
    title: "Decision",
    status: "pending" as const,
  },
]

export default function ConfirmationPage() {
  const [copied, setCopied] = useState(false)

  const referenceNumber = "224020369750"

  useBreadcrumb(
    <div className="flex items-center gap-2">
      <Button
        variant="gray"
        size="icon-sm"
        className="rounded-4xl"
        aria-label="Back"
      >
        <ChevronLeft className="size-4" />
      </Button>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<NavLink to="/" />}>Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Confirm</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )

  function handleCopy() {
    navigator.clipboard.writeText(referenceNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col flex-1 w-full">
      <main className="flex flex-1 flex-col items-center gap-8 p-4 lg:gap-6 lg:p-8">

        {/* Wizard stepper */}
        <div className="w-full max-w-xs pt-2">
          <Stepper steps={wizardSteps} />
        </div>

        {/* Thank you block */}
        <div className="flex flex-col items-center text-center gap-4 mt-4">
          <h1 className="text-3xl font-mono font-bold">Thank you Sami</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your restriction has been lifted.<br />
            You can now travel freely.
          </p>

          {/* Reference number */}
          <div className="flex flex-col items-center gap-1 mt-2">
            <span className="text-xs text-muted-foreground">Violation reference number</span>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-lg">{referenceNumber}</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
              >
                {copied
                  ? <Check className="size-3.5" />
                  : <Copy className="size-3.5" />
                }
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="w-full max-w-2xl">
          <ProgressTracker>
            {timelineSteps.map((step, i) => (
              <ProgressTrackerItem
                key={i}
                status={step.status}
                title={step.title}
                statusLabel={step.statusLabel}
                description={step.description}
              >
                {step.hasDetails && (
                  <ProgressTrackerContent>
                    {/* Payment details grid */}
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-4 text-xs">
                      {paymentDetails.map((row) => (
                        <div key={row.label} className="contents">
                          <span className="text-muted-foreground">{row.label}</span>
                          <span className="text-right font-mono font-medium">{row.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="tonal" className="gap-1.5">
                        <Download className="size-3.5" />
                        Download
                      </Button>
                      <Button size="sm" variant="gray" className="gap-1.5">
                        <Share2 className="size-3.5" />
                        Share
                      </Button>
                    </div>
                  </ProgressTrackerContent>
                )}
              </ProgressTrackerItem>
            ))}
          </ProgressTracker>
        </div>

      </main>
    </div>
  )
}
