import { useState } from "react"
import { X, Monitor, Smartphone, Info, ChevronLeft } from "lucide-react"
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
import {
  ProgressTracker,
  ProgressTrackerItem,
  ProgressTrackerContent,
} from "@/components/ui/progress-tracker"
import { useBreadcrumb, useHeaderAction } from "@/components/breadcrumb-context"
import useIsRtl from "@/hooks/useIsRtl"

type SubItem = { text: string; date: string; time: string }
type Subsection = { title: string; items: SubItem[] }
type CourtEntry = { name: string; decision: string }

const mainSteps: Array<{
  title: string
  status: "completed" | "in-progress" | "pending"
  statusLabel: string
  description: string
  subsections?: Subsection[]
  decision?: string
  courts?: CourtEntry[]
}> = [
  {
    title: "Application Submitted",
    status: "completed",
    statusLabel: "Completed",
    description: "12:34:55 • 05/12/2024",
  },
  {
    title: "Dubai Police Procedures",
    status: "completed",
    statusLabel: "Completed",
    description: "12:34:55 • 05/12/2024",
    subsections: [
      {
        title: "Verification of Complaint",
        items: [
          { text: "Waiting to visit the police station", date: "05/12/2024", time: "12:34:55" },
          { text: "The request has been sent to the Dubai Health Authority.", date: "05/12/2024", time: "12:34:55" },
          { text: "The report was received from the Dubai Health Authority.", date: "05/12/2024", time: "12:34:55" },
        ],
      },
      {
        title: "Registering a Criminal Complaint or Filing a Case",
        items: [
          { text: "A criminal complaint was filed under case number 5511/2025 at the Burdabi Police Station.", date: "05/12/2024", time: "12:34:55" },
          { text: "A report has been filed.", date: "05/12/2024", time: "12:34:55" },
        ],
      },
      {
        title: "Gathering Evidence",
        items: [
          { text: "There are deficiencies in the attachments.", date: "05/12/2024", time: "12:34:55" },
          { text: "There are deficiencies in the attachments.", date: "05/12/2024", time: "12:34:55" },
        ],
      },
    ],
  },
  {
    title: "Prosecution and Court Proceedings",
    status: "completed",
    statusLabel: "Completed",
    description: "12:34:55 • 05/12/2024",
    decision: "Acquittal",
    courts: [
      { name: "Court of First Instance", decision: "Guilty" },
      { name: "Court of Appeal", decision: "Guilty" },
      { name: "Court of Cassation", decision: "Acquittal" },
    ],
  },
]

const feeStructure = [
  { label: "Per Kilogram", value: "40", prefix: "AED" },
  { label: "Service Tax", value: "15", prefix: "%" },
  { label: "Knowledge Fees", value: "10", prefix: "AED" },
  { label: "Innovation Fees", value: "10", prefix: "AED" },
]

const appSteps = [
  "Fill up application form",
  "Pay service fees",
  "Submit request",
  "Receive transaction number via SMS & email",
  "Receive the certificate and receipt electronically",
]

export default function ServiceStatusPage() {
  const [open, setOpen] = useState(true)
  const isRtl = useIsRtl()

  useBreadcrumb(
    <div className="flex items-center gap-2">
      <Button
        variant="gray"
        size="icon-sm"
        className="rounded-4xl"
        aria-label="Back button"
      >
        <ChevronLeft className="size-4" />
      </Button>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<NavLink to="/services" />}>Services</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>File-Criminal-Complaint</BreadcrumbPage>
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
    <SidebarProvider open={open} onOpenChange={setOpen} className="min-h-[calc(100vh-60px)] bg-transparent">
      <div className="flex-1 p-6 lg:p-8 overflow-auto">
        {/* Service header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="size-16 rounded-2xl bg-primary/10 dark:bg-transparent dark:bg-linear-to-br from-green-700/30 via-gray-600/5 to-gray-600/5 flex items-center justify-center shrink-0">
            <img src="/img/icons-dual/1.svg" alt="Service" className="size-10 object-contain" />
          </div>
          <div>
            <h1 className="font-mono font-bold text-xl leading-tight">
              Report of Misappropriation of Another Person's Funds
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Reference Number: 223058002976</p>
          </div>
        </div>

        {/* Progress timeline */}
        <ProgressTracker>
          {mainSteps.map((step, i) => (
            <>
            <ProgressTrackerItem
              key={i}
              status={step.status}
              title={step.title}
              statusLabel={step.statusLabel}
              description={step.description}
            >
              {(step.subsections || step.courts) && (
                <ProgressTrackerContent>
                  {step.subsections?.map((sub, si) => (
                    <div key={si} className="mb-4 last:mb-0 border border-neutral-200 dark:border-[#1C1D2580] rounded-xl overflow-hidden">
                      <div className="py-2 px-4 bg-neutral-200 dark:bg-[#1C1D2580] ">
                        <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-300">{sub.title}</p>
                      
                      </div>
                      <ul className="flex flex-col gap-1.5 p-4">
                        {sub.items.map((item, ii) => (
                          <li key={ii} className="flex items-start justify-between gap-4">
                            <span className="flex items-start gap-1.5 text-xs text-muted-foreground">
                              <span className="mt-0.5 shrink-0 size-[6px] bg-[#99BCB4] rounded-full"></span>
                              {item.text}
                            </span>
                            <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">
                              {item.date} - {item.time}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {step.decision && (
                    <p className="text-xs font-semibold text-foreground mb-3">
                      Decision: {step.decision}
                    </p>
                  )}

                  {step.courts?.map((court, ci) => (
                    <div key={ci} className="mb-3 last:mb-0">
                      <p className="text-xs font-semibold text-foreground mb-1.5">{court.name}</p>
                      <p className="text-xs text-muted-foreground ps-3">Decision: {court.decision}</p>
                    </div>
                  ))}
                </ProgressTrackerContent>
              )}
            </ProgressTrackerItem></>
                    ))}
          
        </ProgressTracker>
      </div>

      {/* Right info panel */}
      <Sidebar
        side={isRtl ? "left" : "right"}
        variant="sidebar"
        className="border-l-0! p-4 pt-20 pointer-events-none"
        style={{ "--sidebar-width": "400px" } as React.CSSProperties}
      >
        <SidebarHeader className="flex flex-row items-center justify-between px-6 py-6 border-b border-border mb-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="size-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <img src="/img/icons-dual/1.svg" alt="" className="size-4 object-contain" />
            </div>
            <p className="font-mono font-bold text-sm leading-tight truncate">
              File-Criminal-Complaint
            </p>
          </div>
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
            This service aims to enable customers to inquire about financial case circulars and travel
            ban circulars issued against them by the relevant authority.{" "}
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
                <p className="text-xs text-muted-foreground">
                  A step-by-step guide to easily navigate the application process.
                </p>
              </div>
            </div>
            <ol className="flex flex-col gap-2">
              {appSteps.map((step, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="size-5 rounded-full bg-muted flex items-center justify-center font-mono font-bold text-[10px] shrink-0">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Service Fee Structure */}
          <div>
            <p className="font-mono font-bold text-xs mb-3">Service Fee Structure</p>
            <div className="flex flex-col gap-2">
              {feeStructure.map((row, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className="font-mono font-semibold">
                    {row.prefix === "%" ? `%${row.value}` : `${row.prefix} ${row.value}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}
