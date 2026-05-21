import { useState } from "react"
import { MessageSquare, X, Monitor, Smartphone, Info, ChevronLeft } from "lucide-react"
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
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { ProgressTracker, ProgressTrackerItem, ProgressTrackerHeader } from "@/components/ui/progress-tracker"
import type { StepStatus } from "@/components/ui/progress-tracker"
import { useBreadcrumb, useHeaderAction } from "@/components/breadcrumb-context"
import useIsRtl from "@/hooks/useIsRtl"
const steps: { title: string; status: StepStatus; statusLabel?: string; description?: string }[] = [
  { title: "Submitted", status: "completed", statusLabel: "Completed", description: "12:34:55 • 05/12/2024" },
  { title: "Under review", status: "in-progress", statusLabel: "Payment required", description: "12:34:55 • 05/12/2024" },
  { title: "Payment", status: "pending" },
  { title: "Decision", status: "pending" },
]

export default function InquiryDetailPage() {
  const [open, setOpen] = useState(true)
  const isRtl = useIsRtl()
  useBreadcrumb(
    <div className="flex items-center gap-2">
      <div>
        <Button
          variant="gray"
          size="icon-sm"

          className="rounded-4xl"
          aria-label="Back button"
        >
          <ChevronLeft className="size-4" />
        </Button>
      </div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<NavLink to="/services" />}>Services</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink render={<NavLink to="/services" />}>Inquiry</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>New Inquire</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )

  useHeaderAction(
    <Button
      variant="gray"
      size="icon-sm"
      onClick={() => setOpen((o) => !o)}
      className="rounded-4xl"
      aria-label="Toggle info panel"
    >
      <Info className="size-4" />
    </Button>
  )

  return (
    <>
      <SidebarProvider open={open} onOpenChange={setOpen} className="min-h-[calc(100vh-60px)] bg-transparent">
        <div className="flex-1 p-6 lg:p-8 overflow-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="size-16 rounded-2xl bg-primary/10 dark:bg-transparent dark:bg-linear-to-br from-green-700/30 via-gray-600/5 to-gray-600/5 flex items-center justify-center shrink-0">
              <img src="/img/icons-dual/1.svg" alt="Inquiry" className="size-10 object-contain" />
            </div>
            <div>
              <h1 className="font-mono font-bold text-xl leading-tight">
                TWIMC Certificate for Lost Documents
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Reference Number: L-A4317014
              </p>
            </div>
          </div>

          <div className="relative">
            <ProgressTracker>
              {steps.map((step, i) => (
                <ProgressTrackerItem
                  key={i}
                  status={step.status}
                  title={step.title}
                  statusLabel={step.statusLabel}
                  description={step.description}
                >
                  {step.status === "in-progress" && (
                    <ProgressTrackerHeader>
                      <Button size="sm" variant="outlineGray" className="gap-1.5 rounded-[32px]">
                        <MessageSquare className="size-3.5" />
                        Inquire
                      </Button>
                    </ProgressTrackerHeader>
                  )}
                  
                {/* <ProgressTrackerContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This service allows the Business Sector to request the disposal of expired explosives,
                    ammunition, and fireworks in an official and safe manner.{" "}
                    <button className="text-primary font-medium hover:underline">more</button>
                  </p>
                </ProgressTrackerContent> */}
                </ProgressTrackerItem>
              ))}
            </ProgressTracker>
          </div>
        </div>

        <Sidebar side={isRtl ? "left" : "right"} variant="sidebar" className="border-l-0! p-4 pt-20 pointer-events-none"
          style={{ '--sidebar-width': "400px" } as React.CSSProperties}
        >
          <SidebarHeader className="flex flex-row items-center justify-between px-6 py-6 border-b border-border mb-2">
            <p className="font-mono font-bold text-sm leading-tight truncate">
              Inquiry about the status of the reque...
            </p>
            <Button variant="gray" size="icon-sm" className="shrink-0" onClick={() => setOpen(false)}>
              <X className="size-4" />
            </Button>
          </SidebarHeader>

          <SidebarContent className="flex flex-col gap-6 overflow-auto p-6">
            {/* Fees + Duration */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Fees</p>
                <p className="font-mono font-bold text-sm">
                  Required <Info className="inline size-3 text-muted-foreground" />
                </p>
                <p className="text-xs text-muted-foreground">AED</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Duration</p>
                <p className="font-mono font-bold text-sm">
                  2 <Info className="inline size-3 text-muted-foreground" />
                </p>
                <p className="text-xs text-muted-foreground">Working Days</p>
              </div>
            </div>

            {/* Description */}
            <div className="text-sm text-muted-foreground leading-relaxed">
              This service allows the Business Sector to request the disposal of expired explosives,
              ammunition, and fireworks in an official and safe manner.{" "}
              <button className="text-primary font-medium hover:underline">more</button>
            </div>

            {/* Info tip */}
            <div className="text-sm text-muted-foreground leading-relaxed">
              To access the service card later, click the{" "}
              <Info className="inline size-3.5" /> Informations button at the top of the page.
              <br />
              <button className="text-primary font-medium hover:underline mt-1 block">Dismiss</button>
            </div>

            {/* Video thumbnail */}
            <div className="rounded-2xl overflow-hidden bg-muted aspect-video">
              <img
                src="https://placehold.co/600x340/1a1a1a/ffffff?text=▶"
                alt="Service video"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Available on */}
            <div>
              <p className="text-xs text-muted-foreground mb-3">Available on</p>
              <div className="flex items-center gap-4">
                <Smartphone className="size-5 text-muted-foreground" />
                <Monitor className="size-5 text-muted-foreground" />
                <span className="text-xs font-bold text-muted-foreground">SPS</span>
                <span className="text-xs font-bold text-muted-foreground border border-border rounded px-1">001</span>
                <span className="text-xs font-bold text-muted-foreground">DXI</span>
              </div>
            </div>

            {/* Steps of the application */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="size-8 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center shrink-0">
                  <img src="/img/icons-dual/1.svg" alt="" className="size-4 object-contain" />
                </div>
                <div>
                  <p className="font-mono font-bold text-xs">Steps of the Application</p>
                  <p className="text-xs text-muted-foreground">A step-by-step guide to easily navigate the application process.</p>
                </div>
              </div>
              <ol className="flex flex-col gap-2">
                {["Fill up application form", "Pay service fees"].map((step, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="size-5 rounded-full bg-muted flex items-center justify-center font-mono font-bold text-[10px] shrink-0">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </>
  )
}
