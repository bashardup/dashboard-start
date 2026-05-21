import { ChevronDown, ChevronLeft, Download, Mail, MessageCircle, Printer, Shield, Upload } from "lucide-react"
import { useTranslation } from "react-i18next"
import { NavLink } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar"
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
  CardWidgetContent,
  CardWidgetHeader,
  CardWidgetIcon,
  CardWidgetTitle,
} from "@/components/ui/card-widget"
import { useBreadcrumb } from "@/components/breadcrumb-context"
import useIsRtl from "@/hooks/useIsRtl"
import { cn } from "@/lib/utils"

/* ── Static data ── */

const documents = [
  { nameKey: "requestDetail.doc.cheque",    time: "09:30AM 28.11.2025", statusKey: "requestDetail.status.accepted",    statusColor: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" },
  { nameKey: "requestDetail.doc.bankStmt",  time: "10:15AM 28.11.2025", statusKey: "requestDetail.status.underReview", statusColor: "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400" },
  { nameKey: "requestDetail.doc.idCopy",    time: "11:00AM 28.11.2025", statusKey: "requestDetail.status.sent",        statusColor: "bg-blue-500/15 text-blue-600 dark:text-blue-400" },
  { nameKey: "requestDetail.doc.affidavit", time: "01:45PM 28.11.2025", statusKey: "requestDetail.status.rejected",    statusColor: "bg-red-500/15 text-red-600 dark:text-red-400" },
]

/* ── Helpers ── */

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-medium leading-snug">{value}</span>
    </div>
  )
}

function CardIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="size-10 rounded-2xl bg-primary/10 dark:bg-transparent dark:bg-linear-to-br from-green-700/30 via-gray-600/5 to-gray-600/5 flex items-center justify-center shrink-0 text-primary dark:text-emerald-400">
      {children}
    </div>
  )
}

/* ── Page ── */

export default function RequestDetailPage() {
  const { t } = useTranslation()
  const isRtl = useIsRtl()

  const actionLog = [
    { titleKey: "requestDetail.log.submitted",  dateKey: "requestDetail.log.submittedDate",  descKey: "requestDetail.log.submittedDesc",  done: true },
    { titleKey: "requestDetail.log.idVerified",  dateKey: "requestDetail.log.idVerifiedDate",  descKey: "requestDetail.log.idVerifiedDesc",  done: true },
    { titleKey: "requestDetail.log.inProgress",  dateKey: "requestDetail.log.inProgressDate",  descKey: "requestDetail.log.inProgressDesc",  done: true },
    { titleKey: "requestDetail.log.prosecution", dateKey: "",                                   descKey: "requestDetail.log.prosecutionDesc", done: false },
  ]

  useBreadcrumb(
    <div className="flex items-center gap-2">
      <Button variant="gray" size="icon-sm" className="rounded-4xl" aria-label="Back" asChild>
        <NavLink to="/services">
          <ChevronLeft className={cn("size-4", isRtl && "rotate-180")} />
        </NavLink>
      </Button>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<NavLink to="/" />}>{t("requestDetail.breadcrumb.home")}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink render={<NavLink to="/services" />}>{t("requestDetail.breadcrumb.requests")}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbPage>{t("requestDetail.breadcrumb.details")}</BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="flex flex-col flex-1 w-full">
      <main className="flex flex-1 flex-col gap-6 p-4 lg:p-6">

        {/* ── Page header ── */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="size-16 rounded-2xl bg-primary/10 dark:bg-transparent dark:bg-linear-to-br from-green-700/30 via-gray-600/5 to-gray-600/5 flex items-center justify-center shrink-0">
              <img src="/img/icons-dual/1.svg" alt="" className="size-9 object-contain" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-mono tracking-tight">
                {t("requestDetail.title")}: REQ-2025-8921
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {t("requestDetail.submissionDate")}: 31 Dec 2026
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="tonal" size="md" className="gap-2 rounded-[32px]">
              <Printer className="size-4" />
              {t("requestDetail.print")}
            </Button>
            <Button variant="tonal" size="md" className="gap-2 rounded-[32px]">
              <Upload className="size-4" />
              {t("requestDetail.export")}
            </Button>
          </div>
        </div>

        {/* ── Body: sidebar + main ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6 items-start">

         

          {/* ── Main content ── */}
          <div className="flex flex-col gap-6">

            {/* Client info card */}
            <CardWidget>
              <CardWidgetContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                  <InfoRow
                    label={t("requestDetail.clientName")}
                    value={<span className="font-mono font-bold">{t("requestDetail.clientNameValue")}</span>}
                  />
                  <InfoRow
                    label={t("requestDetail.clientStatus")}
                    value={
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-orange-500/15 text-orange-600 dark:text-orange-400">
                        {t("requestDetail.status.suspended")}
                      </span>
                    }
                  />
                  <InfoRow label={t("requestDetail.emiratesId")} value="784-1220-193949" />
                  <InfoRow label={t("requestDetail.mobile")}     value="0504003929" />
                  <InfoRow label={t("requestDetail.email")}      value="ahmad@gmail.com" />
                </div>
              </CardWidgetContent>
            </CardWidget>

            {/* Request info card */}
            <CardWidget>
              <CardWidgetHeader>
                <CardWidgetIcon>
                  <CardIcon><img src="/img/icons-dual/1.svg" alt="" className="size-5 object-contain" /></CardIcon>
                </CardWidgetIcon>
                <CardWidgetTitle>{t("requestDetail.requestInfo")}</CardWidgetTitle>
                <span className="ms-auto inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-500/15 text-blue-600 dark:text-blue-400">
                  {t("requestDetail.status.inProgress")}
                </span>
              </CardWidgetHeader>
              <CardWidgetContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                  <InfoRow label={t("requestDetail.referenceNo")} value="REQ-2025-8921" />
                  <InfoRow label={t("requestDetail.serviceType")} value={t("requestDetail.serviceTypeValue")} />
                  <InfoRow label={t("requestDetail.agencyIssueDate")} value="27 Nov 2025" />
                  <InfoRow label={t("requestDetail.agencyExpiry")}    value="27 Nov 2026" />
                  <InfoRow
                    label={t("requestDetail.agencyType")}
                    value={
                      <span className="inline-flex items-center gap-1.5">
                        {t("requestDetail.agencyTypeValue")}
                        <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                          {t("requestDetail.status.active")}
                        </span>
                      </span>
                    }
                  />
                  <InfoRow
                    label={t("requestDetail.responsibleLawyers")}
                    value={
                      <AvatarGroup className="mt-1">
                        <Avatar size="sm"><AvatarFallback>أ</AvatarFallback></Avatar>
                        <Avatar size="sm"><AvatarFallback>م</AvatarFallback></Avatar>
                        <Avatar size="sm"><AvatarFallback>س</AvatarFallback></Avatar>
                      </AvatarGroup>
                    }
                  />
                </div>
              </CardWidgetContent>
            </CardWidget>

            {/* Documents card */}
            <CardWidget>
              <CardWidgetHeader>
                <CardWidgetIcon>
                  <CardIcon><img src="/img/icons-dual/8.svg" alt="" className="size-5 object-contain" /></CardIcon>
                </CardWidgetIcon>
                <CardWidgetTitle>{t("requestDetail.documents")}</CardWidgetTitle>
              </CardWidgetHeader>
              <CardWidgetContent className="p-0">

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-2 px-6 md:px-8 py-4 border-b border-border">
                  <input
                    placeholder={t("requestDetail.filterDocName")}
                    className="h-9 flex-1 min-w-[160px] rounded-lg border border-border bg-transparent px-3 text-sm outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground dark:bg-zinc-800/50"
                  />
                  <div className="relative">
                    <select className="h-9 appearance-none rounded-lg border border-border bg-transparent pe-8 ps-3 text-sm outline-none focus:ring-2 focus:ring-ring text-muted-foreground dark:bg-zinc-800/50 cursor-pointer">
                      <option value="">{t("requestDetail.filterStatus")}</option>
                      <option>{t("requestDetail.status.accepted")}</option>
                      <option>{t("requestDetail.status.underReview")}</option>
                      <option>{t("requestDetail.status.sent")}</option>
                      <option>{t("requestDetail.status.rejected")}</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute end-2 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                  </div>
                  <div className="relative">
                    <select className="h-9 appearance-none rounded-lg border border-border bg-transparent pe-8 ps-3 text-sm outline-none focus:ring-2 focus:ring-ring text-muted-foreground dark:bg-zinc-800/50 cursor-pointer">
                      <option>{t("requestDetail.filterDate")}</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute end-2 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                  </div>
                  <Button variant="outlineGray" size="md" className="gap-1.5 text-muted-foreground">
                    {t("requestDetail.clearFilter")}
                  </Button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/30 dark:bg-zinc-800/40">
                        {[
                          t("requestDetail.col.docName"),
                          t("requestDetail.col.number"),
                          t("requestDetail.col.status"),
                          t("requestDetail.col.actions"),
                        ].map((col) => (
                          <th key={col} className="h-10 px-4 first:px-6 first:md:px-8 text-start text-xs font-medium text-muted-foreground">
                            <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                              {col} <ChevronDown className="size-3" />
                            </button>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {documents.map((doc, i) => (
                        <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 dark:hover:bg-zinc-800/30 transition-colors">
                          <td className="px-6 md:px-8 py-3 font-medium">{t(doc.nameKey)}</td>
                          <td className="px-4 py-3 text-muted-foreground text-xs tabular-nums">{doc.time}</td>
                          <td className="px-4 py-3">
                            <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", doc.statusColor)}>
                              {t(doc.statusKey)}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <button className="size-7 flex items-center justify-center rounded-md hover:bg-muted dark:hover:bg-zinc-700 transition-colors text-muted-foreground hover:text-foreground">
                                <Mail className="size-3.5" />
                              </button>
                              <button className="size-7 flex items-center justify-center rounded-md hover:bg-muted dark:hover:bg-zinc-700 transition-colors text-muted-foreground hover:text-foreground">
                                <Download className="size-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between gap-2 px-6 md:px-8 py-4 border-t border-border flex-wrap">
                  <span className="text-xs text-muted-foreground">50 {t("requestDetail.results")}</span>
                  <div className="flex items-center gap-1">
                    <button className="size-8 flex items-center justify-center rounded-md hover:bg-muted dark:hover:bg-zinc-800 text-muted-foreground text-sm">
                      {isRtl ? "→" : "←"}
                    </button>
                    {[6, 2, 1].map((p) => (
                      <button
                        key={p}
                        className={cn(
                          "size-8 flex items-center justify-center rounded-md text-xs font-medium transition-colors",
                          p === 6
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted dark:hover:bg-zinc-800 text-muted-foreground"
                        )}
                      >
                        {p}
                      </button>
                    ))}
                    <span className="px-1 text-muted-foreground text-xs">...</span>
                    <button className="size-8 flex items-center justify-center rounded-md hover:bg-muted dark:hover:bg-zinc-800 text-muted-foreground text-sm">
                      {isRtl ? "←" : "→"}
                    </button>
                  </div>
                </div>

              </CardWidgetContent>
            </CardWidget>

          </div>


          <div className="flex flex-col gap-6">

            {/* Investigator card */}
            <CardWidget>
              <CardWidgetContent className="relative flex flex-col items-center text-center gap-4">
                <div className="absolute top-4 inset-s-4">
                  <div className="flex items-center justify-center size-8 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20">
                    <Shield className="size-4 text-emerald-500" />
                  </div>
                </div>

                <div className="w-full flex flex-col items-center gap-3 pt-8">
                  <Avatar className="size-20 ring-4 ring-primary/10 dark:ring-primary/20">
                    <AvatarFallback className="text-2xl font-bold bg-primary/10 dark:bg-primary/20 text-primary dark:text-emerald-400">
                      خ
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="text-xs text-muted-foreground">{t("requestDetail.investigatorRank")}</p>
                    <p className="font-mono font-bold text-base leading-tight mt-0.5">
                      {t("requestDetail.investigatorName")}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {t("requestDetail.investigatorStation")}
                    </p>
                  </div>

                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide border-t border-border w-full pt-3">
                    {t("requestDetail.investigatorLabel")}
                  </div>
                </div>

                <Button variant="gray" size="md" className="w-full gap-2">
                  <MessageCircle className="size-4" />
                  {t("requestDetail.liveChat")}
                </Button>
              </CardWidgetContent>
            </CardWidget>

            {/* Action log card */}
            <CardWidget>
              <CardWidgetHeader>
                <CardWidgetIcon>
                  <CardIcon><img src="/img/icons-dual/5.svg" alt="" className="size-5 object-contain" /></CardIcon>
                </CardWidgetIcon>
                <CardWidgetTitle>{t("requestDetail.actionLog")}</CardWidgetTitle>
              </CardWidgetHeader>
              <CardWidgetContent>
                <ol className="relative flex flex-col">
                  {actionLog.map((item, i) => (
                    <li key={i} className="flex gap-3 pb-6 last:pb-0 relative">
                      {i < actionLog.length - 1 && (
                        <div className="absolute start-[11px] top-6 bottom-0 w-px bg-border" />
                      )}
                      <div className={cn(
                        "relative z-10 mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                        item.done
                          ? "bg-emerald-500 text-white"
                          : "border-2 border-muted-foreground/30 text-muted-foreground bg-background dark:bg-zinc-900"
                      )}>
                        {item.done ? "✓" : i + 1}
                      </div>
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <p className="text-sm font-semibold leading-tight">{t(item.titleKey)}</p>
                        {item.dateKey && (
                          <p className="text-xs text-muted-foreground">{t(item.dateKey)}</p>
                        )}
                        <p className="text-xs text-muted-foreground leading-relaxed">{t(item.descKey)}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </CardWidgetContent>
            </CardWidget>

          </div>
        </div>
      </main>
    </div>
  )
}
