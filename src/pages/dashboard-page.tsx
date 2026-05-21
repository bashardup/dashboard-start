import { motion, type Variants } from "framer-motion"
import { DecorImage } from "@/components/ui/decor-image"
import { useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { ActiveTickets, CompletedRequest, Icon01 } from "@/components/lottie/registry"
import { ActivityCard } from "@/components/ui/activity-card"
// import { StatCard } from "@/components/ui/stat-card"
import { UpcomingAppointments } from "@/components/ui/upcoming-appointments"
import { Walkthrough, useWalkthrough, type WalkthroughStep } from "@/components/ui/walkthrough"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { CardWidget, CardWidgetContent, CardWidgetHeader, CardWidgetIcon, CardWidgetTitle } from "@/components/ui/card-widget"
import { AnimatedBeamMultipleOutputDemo } from "@/components/ui/animated-beam-multiple-outputs"
import { Sparkles } from "lucide-react"
import { FadeIn } from "@/components/ui/fade-in"
import {
  ComplianceCard,
  RequestTrendsCard,
  TrendsLineCard,
  TrendsRadarCard,
  MonthlyStatsCard,
  PerformanceCard,
  ServiceBreakdownCard,
  RequestsByMonthCard,
  StationStatusCard,
  ServiceByStationCard,
  RequestsTableCard,
} from "@/pages/dashboard-widgets"


/* ── Activity stats ── */

// const activityStats = [
//   {
//     titleKey: "dashboard.totalRequests", value: "45",
//     data: [{ value: 28 }, { value: 35 }, { value: 30 }, { value: 38 }, { value: 42 }, { value: 45 }],
//   },
//   {
//     titleKey: "dashboard.completedRequests", value: "20",
//     data: [{ value: 10 }, { value: 14 }, { value: 12 }, { value: 16 }, { value: 18 }, { value: 20 }],
//   },
//   {
//     titleKey: "dashboard.activeRequests", value: "15",
//     data: [{ value: 8 }, { value: 11 }, { value: 9 }, { value: 13 }, { value: 12 }, { value: 15 }],
//   },
//   {
//     titleKey: "dashboard.unapprovedRequests", value: "10",
//     data: [{ value: 6 }, { value: 9 }, { value: 7 }, { value: 11 }, { value: 8 }, { value: 10 }],
//   },
// ]

const steps: WalkthroughStep[] = [
  {
    target: "[data-sidebar]",
    title: "Navigation",
    description: "Use the sidebar to navigate between sections of the dashboard.",
    icon: <div className="size-9 rounded-xl bg-primary flex items-center justify-center text-white font-mono font-bold text-sm">01</div>,
    placement: "right",
  },
  {
    target: "[data-walkthrough='stats']",
    title: "Stats Overview",
    description: "These cards show real-time stats: completed orders, active tickets, and more.",
    icon: <div className="size-9 rounded-xl bg-primary flex items-center justify-center text-white font-mono font-bold text-sm">02</div>,
    placement: "bottom",
  },
  {
    target: "[data-walkthrough='requests']",
    title: "My Requests",
    description: "Track and manage all your service requests. Filter by status or search by name.",
    icon: <div className="size-9 rounded-xl bg-primary flex items-center justify-center text-white font-mono font-bold text-sm">03</div>,
    placement: "top",
  },
  {
    target: "[data-walkthrough='appointments']",
    title: "Upcoming Appointments",
    description: "Track your scheduled appointments. Switch between Today, Tomorrow, and This Week.",
    icon: <div className="size-9 rounded-xl bg-primary flex items-center justify-center text-white font-mono font-bold text-sm">04</div>,
    placement: "top",
  },
  {
    title: "You're all set",
    description: "Explore the dashboard at your own pace. Start a service or check your requests anytime.",
    icon: <div className="size-9 rounded-xl bg-primary flex items-center justify-center text-white font-mono font-bold text-sm">✓</div>,
  },
]


const cardItems = [
  { titleKey: "cards.completedOrders", description: "124", lottieId: CompletedRequest },
  { titleKey: "cards.completedOrders", description: "124", lottieId: ActiveTickets },
  { titleKey: "cards.completedOrders", description: "45", lottieId: Icon01 },
  { titleKey: "cards.completedOrders", description: "45", lottieId: Icon01 },
]

const transition = {
  duration: 0.5,
  ease: [0, 0, 0.61, 0.97] as [number, number, number, number],
}

const statsContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { delayChildren: 0.4, staggerChildren: 0.1 },
  },
}

const statsItem: Variants = {
  hidden: { opacity: 0, y: 100 },
  show: { opacity: 1, y: 0, transition: transition },
}

export default function DashboardPage() {
  const { t } = useTranslation()
  const tour = useWalkthrough()
  const { state: sidebarState } = useSidebar()
  const sidebarCollapsed = sidebarState === "collapsed"

  return (
    <div className="flex flex-col flex-1 w-full">
      <main className="flex flex-1 flex-col gap-6 p-4 lg:p-6 lg:pt-10 ">

        <DecorImage src="" />

        {/* ── Hero ── */}
        <FadeIn from="up" delay={0} className="flex items-start justify-between gap-4 relative overflow-hidden">
          <div className="relative ">
            <h1 className="text-3xl   md:text-5xl font-bold font-mono tracking-tight text-primary dark:text-success-300 ">
              {t("dashboard.welcome", { name: "Ahmad" })}
            </h1>
            <p className="text-2xl text-muted-foreground dark:text-slate-300 mt-1">{t("dashboard.licenseInfo", "Lawyer License · Dubai Bar Association · Active")}</p>

          </div>
          <Button variant="gray" size="sm" className="gap-2 mt-1 shrink-0 relative z-10" onClick={tour.start}>
            <Sparkles className="size-4" />
            {t("dashboard.takeTour", "Take a tour")}
          </Button>
        </FadeIn>

        {/* ── Pending Actions ── */}
        <div>
          {/* <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
            {t("dashboard.pendingActions", "My Pending Actions")}
          </h2> */}
          {/* <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pendingActions.map((action) => (
              <div
                key={action.title}
                className="flex items-center gap-4 rounded-xl border bg-white dark:bg-[#15161E] p-4"
              >
                <div className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${action.bg}`}>
                  <action.icon className={`size-5 ${action.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{action.title}</p>
                  <p className="text-xs text-muted-foreground">{action.subtitle}</p>
                </div>
                <Button size="sm" variant="outlineGray" className="shrink-0 rounded-lg text-xs h-7 gap-1">
                  {action.actionLabel}
                  <ChevronRight className="size-3" />
                </Button>
              </div>
            ))}
          </div> */}
        </div>

        {/* ── Activity Stats ── */}
        {/* <div className=" text-slate-900 dark:text-slate-200 text-2xl font-bold font-mono leading-9">My Activities</div>
        <div data-walkthrough="stats" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {activityStats.map((item, index) => (
            <StatCard
              key={`stat-${index}`}
              title={t(item.titleKey, item.titleKey.split(".")[1])}
              description={item.value}
              data={item.data}
              glowPosition={(["left-bottom", "right-bottom", "left-top", "right-top"] as const)[index % 4]}
              index={index}
            />
          ))}
        </div> */}

        <motion.div variants={statsContainer} initial="hidden" animate="show" >
          <motion.div variants={statsItem} className="pt-10 text-sub-title text-2xl font-bold font-mono leading-9 mb-5">My Activities</motion.div>
          <div
            data-walkthrough="stats"
            className={cn(
              "grid gap-4 sm:grid-cols-2 mb-15",
              sidebarCollapsed ? "xl:grid-cols-4" : "2xl:grid-cols-4"
            )}
          >
            {cardItems.map((item, index) => (
              <motion.div key={`activity-${index}`} variants={statsItem}>
                <ActivityCard
                  title={t(item.titleKey)}
                  glowPosition={(["left-bottom", "right-top", "left-bottom", "right-top"] as const)[index % 4]}
                  description={item.description}
                  lottieId={item.lottieId}
                  index={index}
                  delay={0.9 + index * 0.1}
                />
              </motion.div>
            ))}
          </div>

          {/* ── Requests Overview ── */}
          <div className={cn(
            "grid grid-cols-1 gap-6 mb-6",
            sidebarCollapsed ? "md:grid-cols-2 xl:grid-cols-3" : "md:grid-cols-2"
          )}>
            <motion.div variants={statsItem}><ComplianceCard /></motion.div>
            <motion.div variants={statsItem}><RequestTrendsCard /></motion.div>
            <motion.div variants={statsItem}><TrendsLineCard /></motion.div>
            <motion.div variants={statsItem}><TrendsRadarCard /></motion.div>
            <motion.div variants={statsItem}><MonthlyStatsCard /></motion.div>
            <motion.div variants={statsItem}><PerformanceCard /></motion.div>
            <motion.div variants={statsItem}><ServiceBreakdownCard /></motion.div>
            <motion.div variants={statsItem}><RequestsByMonthCard /></motion.div>
            <motion.div variants={statsItem}><StationStatusCard /></motion.div>
            <motion.div variants={statsItem}><ServiceByStationCard /></motion.div>
            <motion.div variants={statsItem}>
              <CardWidget className="overflow-hidden p-0">
                <CardWidgetHeader>
                  <CardWidgetIcon>
                    <img src="/img/icon-channel.svg" alt="" />
                  </CardWidgetIcon>
                  <CardWidgetTitle>System Integrations</CardWidgetTitle>
                </CardWidgetHeader>
                <CardWidgetContent className="p-0">
                  <AnimatedBeamMultipleOutputDemo className="h-[320px]" />
                </CardWidgetContent>
              </CardWidget>
            </motion.div>
          </div>


          {/* ── Service Request Flow ── */}
          {/* <motion.div variants={statsItem}>
            <CardWidget>
              <CardWidgetHeader>
                <CardWidgetIcon>
                  <img src="/img/icon-channel.svg" alt="Service Request Flow" />
                </CardWidgetIcon>
                <CardWidgetTitle>Service Request Flow</CardWidgetTitle>
              </CardWidgetHeader>
              <CardWidgetContent>
                <SankeyChart data={requestFlowSankeyData} height={480} />
              </CardWidgetContent>
            </CardWidget>
          </motion.div> */}

          <motion.div className="mb-6" variants={statsItem} data-walkthrough="requests">
            <RequestsTableCard />
          </motion.div>

          <motion.div variants={statsItem} className="grid grid-cols-2 gap-6">
            <div data-walkthrough="appointments">
              <UpcomingAppointments />
            </div>
            <div data-walkthrough="appointments">
              <UpcomingAppointments />
            </div>
          </motion.div>
        </motion.div>
      </main>

      <Walkthrough steps={steps} open={tour.open} onClose={tour.close} />
    </div>
  )
}
