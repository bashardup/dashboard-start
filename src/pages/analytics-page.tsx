import { FadeIn } from "@/components/ui/fade-in"
import { useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { DecorImage } from "@/components/ui/decor-image"
import {
  TotalEmployeesCard,
  ActiveAssessmentsCard,
  InterviewCompletedCard,
  CriticalGapsCard,
  TechnicalAssessmentCard,
  CompetencyHeatmapCard,
  DepartmentReadinessCard,
  SuccessionMatrixCard,
  LeadershipPipelineCard,
  EmployeesProgressCard,
  AssessmentsProgressCard,
  InterviewsProgressCard,
  TechnicalProgressCard,
  WorkforceReadinessCard,
  OverallGapCard,
  WorkforceOverdueCard,
  PsychologicalAnalysisCard,
  InterviewAnalyticsCard,
} from "@/pages/analytics-widgets"

export default function AnalyticsPage() {
  const { state } = useSidebar()
  const collapsed = state === "collapsed"

  return (
    <div className="flex flex-col flex-1 w-full">
      <main className="flex flex-1 flex-col gap-6 p-4 lg:p-6 lg:pt-10">
        <DecorImage src="/img/decor/lawyer-decor.png" />

        <FadeIn from="up" delay={0}>
          <h1 className="text-3xl md:text-5xl font-bold font-mono tracking-tight text-primary dark:text-success-300">
            Analytics Dashboard
          </h1>
          <p className="text-xl text-muted-foreground dark:text-slate-300 mt-1">
            Workforce performance, assessments &amp; readiness overview
          </p>
        </FadeIn>

        {/* Row 1 — Top stat cards */}
        <div className={cn(
          "grid gap-4 sm:grid-cols-2",
          collapsed ? "xl:grid-cols-4" : "2xl:grid-cols-4"
        )}>
          <TotalEmployeesCard />
          <ActiveAssessmentsCard />
          <InterviewCompletedCard />
          <CriticalGapsCard />
        </div>

        {/* Row 2 — Technical Assessment + Heatmap */}
        <div className={cn("grid gap-6", collapsed ? "lg:grid-cols-2" : "xl:grid-cols-2")}>
          <TechnicalAssessmentCard />
          <CompetencyHeatmapCard />
        </div>

        {/* Row 3 — Radar + Matrix + Pipeline */}
        <div className={cn("grid gap-6", collapsed ? "lg:grid-cols-3" : "xl:grid-cols-3")}>
          <DepartmentReadinessCard />
          <SuccessionMatrixCard />
          <LeadershipPipelineCard />
        </div>

        {/* Row 4 — Progress stat cards */}
        <div className={cn(
          "grid gap-4 sm:grid-cols-2",
          collapsed ? "xl:grid-cols-4" : "2xl:grid-cols-4"
        )}>
          <EmployeesProgressCard />
          <AssessmentsProgressCard />
          <InterviewsProgressCard />
          <TechnicalProgressCard />
        </div>

        {/* Row 5 — Score cards */}
        <div className={cn("grid gap-6", collapsed ? "lg:grid-cols-3" : "xl:grid-cols-3")}>
          <WorkforceReadinessCard />
          <OverallGapCard />
          <WorkforceOverdueCard />
        </div>

        {/* Row 6 — Psychological + Interview */}
        <div className={cn("grid gap-6 mb-6", collapsed ? "lg:grid-cols-2" : "xl:grid-cols-2")}>
          <PsychologicalAnalysisCard />
          <InterviewAnalyticsCard />
        </div>
      </main>
    </div>
  )
}
