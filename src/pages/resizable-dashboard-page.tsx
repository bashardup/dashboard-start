import { NavLink } from "react-router-dom"
import {
  ArrowUpRight,
  ChevronLeft,
  Sparkles,
} from "lucide-react"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
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
  CardWidget,
  CardWidgetAction,
  CardWidgetContent,
  CardWidgetHeader,
  CardWidgetIcon,
  CardWidgetTitle,
} from "@/components/ui/card-widget"
import { ActivityBarChart } from "@/components/ui/activity-bar-chart"
import { MultiLineChart } from "@/components/ui/multi-line-chart"
import { StraightLineChart } from "@/components/ui/straight-line-chart"
import { GlowRadarChart } from "@/components/ui/glow-radar-chart"
import { useBreadcrumb } from "@/components/breadcrumb-context"

/* ── Data ── */

const totalSaleData = [
  { month: "Feb 01", value: 24 },
  { month: "Feb 08", value: 32 },
  { month: "Feb 15", value: 28 },
  { month: "Feb 22", value: 64 },
  { month: "Feb 29", value: 30 },
  { month: "Mar 07", value: 36 },
  { month: "Mar 14", value: 42 },
]

const audienceRadarData = [
  { metric: "0-18",  segment: 35 },
  { metric: "19-24", segment: 62 },
  { metric: "25-30", segment: 48 },
  { metric: "31-40", segment: 71 },
  { metric: "41-50", segment: 40 },
  { metric: "50+",   segment: 22 },
]

const revenueTrendData = [
  { month: "JAN", current: 1.4, previous: 1.1 },
  { month: "FEB", current: 2.1, previous: 1.8 },
  { month: "MAR", current: 2.6, previous: 2.0 },
  { month: "APR", current: 3.2, previous: 2.4 },
  { month: "MAY", current: 4.1, previous: 3.0 },
  { month: "JUN", current: 4.8, previous: 3.6 },
  { month: "15 Jun", current: 5.4, previous: 3.9 },
]

const performanceData = [
  { week: "W1", growth: 12, churn: 4 },
  { week: "W2", growth: 18, churn: 6 },
  { week: "W3", growth: 14, churn: 5 },
  { week: "W4", growth: 22, churn: 7 },
  { week: "W5", growth: 28, churn: 6 },
  { week: "W6", growth: 32, churn: 8 },
]

/* ── Subcomponents ── */

function AiAssistantCard() {
  return (
    <CardWidget className="h-full">
      <CardWidgetHeader>
        <CardWidgetIcon>
          <Sparkles className="size-6 text-primary-600" />
        </CardWidgetIcon>
        <CardWidgetTitle>AI Assistant</CardWidgetTitle>
      </CardWidgetHeader>

      <CardWidgetContent className="flex flex-col gap-6">
        <div className="relative w-full aspect-square max-w-[280px] mx-auto">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,var(--chart-primary-light)_0%,transparent_60%)] opacity-40" />
          <div className="absolute inset-4 rounded-full border border-primary/30" />
          <div className="absolute inset-8 rounded-full border border-primary/20" />
          <div className="absolute inset-12 rounded-full bg-[radial-gradient(circle_at_30%_30%,var(--chart-primary)_0%,transparent_70%)] opacity-80" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Button size="sm" className="rounded-full">Try Now</Button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-foreground leading-relaxed">
            Analyze product sales over last year.
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Compare revenue, quality, sales and brand across stations and service types.
          </p>
        </div>
      </CardWidgetContent>
    </CardWidget>
  )
}

function TotalSaleCard() {
  return (
    <CardWidget className="h-full">
      <CardWidgetHeader>
        <CardWidgetIcon>
          <ArrowUpRight className="size-5 text-primary-600" />
        </CardWidgetIcon>
        <CardWidgetTitle>Total sale</CardWidgetTitle>
        <CardWidgetAction>
          <Button variant="text" size="icon-sm" aria-label="Expand">
            <ArrowUpRight className="size-4" />
          </Button>
        </CardWidgetAction>
      </CardWidgetHeader>
      <CardWidgetContent className="flex flex-col gap-3">
        <div className="flex items-baseline gap-2">
          <span className="font-mono font-bold text-3xl text-sub-title">90,744</span>
          <span className="text-xs text-success-600">+8.2%</span>
        </div>
        <ActivityBarChart
          data={totalSaleData}
          xKey="month"
          height={300}
          series={[
            { key: "value", label: "Sale", color: "var(--chart-primary)", secondaryColor: "var(--chart-primary-light)" },
          ]}
        />
      </CardWidgetContent>
    </CardWidget>
  )
}

function AudienceRadarCard() {
  return (
    <CardWidget className="h-full overflow-hidden p-0">
      <CardWidgetHeader>
        <CardWidgetTitle>Audience</CardWidgetTitle>
      </CardWidgetHeader>
      <CardWidgetContent className="p-0">
        <GlowRadarChart
          className="w-full"
          height={180}
          data={audienceRadarData}
          metricKey="metric"
          series={[
            { key: "segment", label: "Segments", color: "var(--chart-primary)" },
          ]}
        />
      </CardWidgetContent>
    </CardWidget>
  )
}

function CreditRateCard() {
  return (
    <CardWidget className="h-full">
      <CardWidgetHeader>
        <CardWidgetTitle>Credit rate</CardWidgetTitle>
      </CardWidgetHeader>
      <CardWidgetContent className="flex flex-col items-center gap-2 py-2">
        <div className="font-mono font-bold text-3xl text-sub-title">803</div>
        <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-[linear-gradient(135deg,var(--chart-primary-light),var(--chart-primary))]"
            style={{ width: "80%" }}
          />
        </div>
        <div className="flex justify-between w-full text-[10px] text-muted-foreground font-mono">
          <span>300</span>
          <span>850</span>
        </div>
      </CardWidgetContent>
    </CardWidget>
  )
}

function RevenueTrendCard() {
  return (
    <CardWidget className="h-full">
      <CardWidgetHeader>
        <CardWidgetIcon>
          <ArrowUpRight className="size-5 text-primary-600" />
        </CardWidgetIcon>
        <CardWidgetTitle>Revenue trend</CardWidgetTitle>
        <CardWidgetAction>
          <span className="text-xs text-muted-foreground">Summary statistics</span>
          <Button variant="text" size="icon-sm" aria-label="Expand">
            <ArrowUpRight className="size-4" />
          </Button>
        </CardWidgetAction>
      </CardWidgetHeader>

      <CardWidgetContent className="flex flex-col gap-3">
        <div className="flex flex-wrap items-baseline gap-4 text-xs">
          <span><span className="font-mono font-bold text-sub-title">1.2</span> <span className="text-muted-foreground">Min</span></span>
          <span><span className="font-mono font-bold text-sub-title">5.33</span> <span className="text-muted-foreground">Max</span></span>
          <span><span className="font-mono font-bold text-sub-title">2.43</span> <span className="text-muted-foreground">Average</span></span>
          <span className="ms-auto"><span className="font-mono font-bold text-sub-title">1</span> <span className="text-muted-foreground">Day</span></span>
          <span><span className="font-mono font-bold text-sub-title">1</span> <span className="text-muted-foreground">Week</span></span>
        </div>
        <StraightLineChart
          data={revenueTrendData}
          xKey="month"
          height={200}
          series={[
            { key: "current",  label: "2025", color: "var(--chart-primary)",   area: true },
            { key: "previous", label: "2024", color: "var(--chart-secondary)", dashed: true },
          ]}
        />
      </CardWidgetContent>
    </CardWidget>
  )
}

function PerformanceCard() {
  return (
    <CardWidget className="h-full">
      <CardWidgetHeader>
        <CardWidgetTitle>Performance</CardWidgetTitle>
      </CardWidgetHeader>
      <CardWidgetContent>
        <MultiLineChart
          data={performanceData}
          xKey="week"
          height={160}
          series={[
            { key: "growth", label: "Growth", color: "var(--chart-primary)"   },
            { key: "churn",  label: "Churn",  color: "var(--chart-secondary)" },
          ]}
        />
      </CardWidgetContent>
    </CardWidget>
  )
}

/* ── Page ── */

export default function ResizableDashboardPage() {
  useBreadcrumb(
    <div className="flex items-center gap-2">
      <Button variant="gray" size="icon-sm" className="rounded-4xl" aria-label="Back">
        <ChevronLeft className="size-4" />
      </Button>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<NavLink to="/" />}>Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Resizable Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )

  return (
    <div className="flex flex-col flex-1 w-full">
      <main className="flex flex-1 flex-col gap-6 p-4 lg:p-6 lg:pt-10 min-h-[calc(100vh-80px)]">
        <div className="flex items-start justify-between gap-4 relative overflow-hidden">
          <div className="relative">
            <h1 className="text-3xl md:text-5xl font-bold font-mono tracking-tight text-primary dark:text-success-300">
              Resizable Dashboard
            </h1>
            <p className="text-2xl text-muted-foreground dark:text-slate-300 mt-1">
              Drag panel handles to resize each region.
            </p>
          </div>
        </div>

        <ResizablePanelGroup
          direction="horizontal"
          autoSaveId="resizable-dashboard-v2"
          className="flex-1 rounded-2xl overflow-hidden"
        >
          {/* ── Left: analytics grid ── */}
          <ResizablePanel defaultSize={72} minSize={50} className="pe-2">
            <ResizablePanelGroup direction="vertical" className="h-full gap-2">
              {/* Top row */}
              <ResizablePanel defaultSize={50} minSize={30}>
                <ResizablePanelGroup direction="horizontal" className="h-full gap-2">
                  <ResizablePanel defaultSize={66} minSize={40}>
                    <TotalSaleCard />
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel defaultSize={34} minSize={20}>
                    <ResizablePanelGroup direction="vertical" className="h-full gap-2">
                      <ResizablePanel defaultSize={55} minSize={25}>
                        <AudienceRadarCard />
                      </ResizablePanel>
                      <ResizableHandle withHandle />
                      <ResizablePanel defaultSize={45} minSize={20}>
                        <CreditRateCard />
                      </ResizablePanel>
                    </ResizablePanelGroup>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>

              <ResizableHandle withHandle />

              {/* Bottom row */}
              <ResizablePanel defaultSize={50} minSize={25}>
                <ResizablePanelGroup direction="horizontal" className="h-full gap-2">
                  <ResizablePanel defaultSize={66} minSize={40}>
                    <RevenueTrendCard />
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel defaultSize={34} minSize={20}>
                    <PerformanceCard />
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* ── Right: AI Assistant — full-height ── */}
          <ResizablePanel defaultSize={28} minSize={22} maxSize={40} className="ps-2">
            <AiAssistantCard />
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  )
}
