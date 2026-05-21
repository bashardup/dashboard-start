import { useState } from "react"
import { CardWidget, CardWidgetContent, CardWidgetHeader, CardWidgetIcon, CardWidgetTitle } from "@/components/ui/card-widget"
import { GaugeChart } from "@/components/ui/gauge-chart"
import { MultiLineChart } from "@/components/ui/multi-line-chart"
import { GlowRadarChart } from "@/components/ui/glow-radar-chart"
import { StraightLineChart } from "@/components/ui/straight-line-chart"
import { ActivityBarChart } from "@/components/ui/activity-bar-chart"
import { ActivityComposedChart } from "@/components/ui/activity-composed-chart"
import { DataTable, DataTableToolbar, createSelectColumn, type ColumnDef } from "@/components/ui/data-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoreHorizontal } from "lucide-react"
import { type Request, stationStatusRadarData, serviceStationData, statusByMonthData, tableRows } from "@/data/dashboard-data"

const ICON = <img src="/img/icon-channel.svg" alt="" />

export function ComplianceCard({ delay = 1.4 }: { delay?: number }) {
  return (
    <CardWidget>
      <CardWidgetHeader>
        <CardWidgetIcon>{ICON}</CardWidgetIcon>
        <CardWidgetTitle>Compliance Rate</CardWidgetTitle>
      </CardWidgetHeader>
      <CardWidgetContent>
        <GaugeChart value={87} max={100} label="Compliance rate" delay={delay} />
        <div className="mt-10 text-center text-muted-foreground text-base font-medium leading-6">
          Measuring the percentage of orders completed on time (SLA) compared to total orders
        </div>
      </CardWidgetContent>
    </CardWidget>
  )
}

export function RequestTrendsCard({ delay = 1.5 }: { delay?: number }) {
  return (
    <CardWidget>
      <CardWidgetHeader>
        <CardWidgetIcon>{ICON}</CardWidgetIcon>
        <CardWidgetTitle>Request Trends</CardWidgetTitle>
      </CardWidgetHeader>
      <CardWidgetContent>
        <MultiLineChart
          data={[
            { month: "Jan", new: 12, completed: 8,  pending: 4 },
            { month: "Feb", new: 35, completed: 14, pending: 6 },
            { month: "Mar", new: 15, completed: 12, pending: 5 },
            { month: "Apr", new: 22, completed: 17, pending: 8 },
            { month: "May", new: 0,  completed: 18, pending: 6 },
            { month: "Jun", new: 28, completed: 22, pending: 9 },
          ]}
          series={[
            { key: "new",       label: "New",       color: "var(--chart-primary)" },
            { key: "completed", label: "Completed", color: "var(--chart-secondary)" },
            { key: "pending",   label: "Pending",   color: "var(--chart-tertiary)" },
          ]}
          xKey="month"
          delay={delay}
        />
      </CardWidgetContent>
    </CardWidget>
  )
}

export function TrendsLineCard({ delay = 1.7 }: { delay?: number }) {
  return (
    <CardWidget>
      <CardWidgetHeader>
        <CardWidgetIcon>{ICON}</CardWidgetIcon>
        <CardWidgetTitle>Trends</CardWidgetTitle>
      </CardWidgetHeader>
      <CardWidgetContent>
        <StraightLineChart
          data={[
            { month: "JAN", s1: 1,   s2: 1   },
            { month: "FEB", s1: 2.2, s2: 1.7 },
            { month: "MAR", s1: 6.2, s2: 2.2 },
            { month: "APR", s1: 4.5, s2: 6.1 },
            { month: "MAY", s1: 7.1, s2: 4.0 },
            { month: "JUN", s1: 6.8, s2: 5.0 },
            { month: "JUL", s1: 8.2, s2: 5.6 },
          ]}
          series={[
            { key: "s1", label: "Series 1", color: "var(--chart-primary)",   area: true },
            { key: "s2", label: "Series 2", color: "var(--chart-secondary)", dashed: true },
          ]}
          xKey="month"
          delay={delay}
        />
      </CardWidgetContent>
    </CardWidget>
  )
}

export function TrendsRadarCard({ delay = 1.6 }: { delay?: number }) {
  return (
    <CardWidget className="overflow-hidden p-0">
      <CardWidgetHeader>
        <CardWidgetIcon>{ICON}</CardWidgetIcon>
        <CardWidgetTitle>Trends</CardWidgetTitle>
      </CardWidgetHeader>
      <CardWidgetContent className="p-0 h-full">
        <GlowRadarChart
          className="w-full h-full min-h-[280px]"
          delay={delay}
          series={[
            { key: "current",  label: "Current",  color: "var(--chart-primary)" },
            { key: "previous", label: "Previous", color: "var(--chart-secondary)" },
          ]}
        />
      </CardWidgetContent>
    </CardWidget>
  )
}

export function MonthlyStatsCard() {
  return (
    <CardWidget>
      <CardWidgetHeader>
        <CardWidgetIcon>{ICON}</CardWidgetIcon>
        <CardWidgetTitle>Monthly Stats</CardWidgetTitle>
      </CardWidgetHeader>
      <CardWidgetContent>
        <ActivityBarChart
          data={[
            { month: "Jan", completed: 42, pending: 18 },
            { month: "Feb", completed: 58, pending: 24 },
            { month: "Mar", completed: 35, pending: 30 },
            { month: "Apr", completed: 67, pending: 15 },
            { month: "May", completed: 51, pending: 22 },
            { month: "Jun", completed: 74, pending: 19 },
            { month: "Jul", completed: 63, pending: 28 },
          ]}
          series={[
            { key: "completed", label: "Completed", color: "var(--chart-primary)",   secondaryColor: "var(--chart-primary-light)" },
            { key: "pending",   label: "Pending",   color: "var(--chart-secondary)", secondaryColor: "var(--chart-secondary-light)" },
          ]}
          xKey="month"
        />
      </CardWidgetContent>
    </CardWidget>
  )
}

export function PerformanceCard({ delay = 1.9 }: { delay?: number }) {
  return (
    <CardWidget>
      <CardWidgetHeader>
        <CardWidgetIcon>{ICON}</CardWidgetIcon>
        <CardWidgetTitle>Performance</CardWidgetTitle>
      </CardWidgetHeader>
      <CardWidgetContent>
        <ActivityComposedChart
          data={[
            { month: "Jan", volume: 420,  trend: 420  },
            { month: "Feb", volume: 680,  trend: 680  },
            { month: "Mar", volume: 1100, trend: 1100 },
            { month: "Apr", volume: 1280, trend: 1280 },
            { month: "May", volume: 1350, trend: 1350 },
            { month: "Jun", volume: 1280, trend: 1280 },
          ]}
          barKey="volume"
          barLabel="Volume (bars)"
          barColor="var(--chart-primary)"
          barSecondaryColor="var(--chart-primary-light)"
          lineKey="trend"
          lineLabel="Trend (line)"
          lineColor="var(--chart-secondary)"
          xKey="month"
          delay={delay}
        />
      </CardWidgetContent>
    </CardWidget>
  )
}

export function ServiceBreakdownCard() {
  return (
    <CardWidget>
      <CardWidgetHeader>
        <CardWidgetIcon>{ICON}</CardWidgetIcon>
        <CardWidgetTitle>Service Breakdown</CardWidgetTitle>
      </CardWidgetHeader>
      <CardWidgetContent>
        <ActivityBarChart
          orientation="horizontal"
          data={[
            { service: "TWIMC Certificate",  completed: 84, pending: 12 },
            { service: "Criminal Complaint", completed: 67, pending: 21 },
            { service: "Electronic Agency",  completed: 55, pending: 18 },
            { service: "Inmate Visit",       completed: 43, pending: 9  },
            { service: "Stop Searching",     completed: 38, pending: 14 },
          ]}
          series={[
            { key: "completed", label: "Completed", color: "var(--chart-primary)",   secondaryColor: "var(--chart-primary-light)" },
            { key: "pending",   label: "Pending",   color: "var(--chart-secondary)", secondaryColor: "var(--chart-secondary-light)" },
          ]}
          xKey="service"
          height={260}
        />
      </CardWidgetContent>
    </CardWidget>
  )
}

export function RequestsByMonthCard() {
  return (
    <CardWidget>
      <CardWidgetHeader>
        <CardWidgetIcon>{ICON}</CardWidgetIcon>
        <CardWidgetTitle>Requests by Month</CardWidgetTitle>
      </CardWidgetHeader>
      <CardWidgetContent>
        <ActivityBarChart
          data={statusByMonthData}
          series={[
            { key: "new",          label: "New",           color: "var(--chart-primary)",    secondaryColor: "var(--chart-primary-light)" },
            { key: "investigating", label: "Investigating", color: "var(--chart-tertiary)",   secondaryColor: "var(--chart-tertiary-light)" },
            { key: "completed",    label: "Completed",     color: "var(--chart-secondary)",  secondaryColor: "var(--chart-secondary-light)" },
            { key: "pending",      label: "Pending",       color: "var(--chart-quaternary)", secondaryColor: "var(--chart-quaternary-light)" },
          ]}
          xKey="month"
        />
      </CardWidgetContent>
    </CardWidget>
  )
}

export function StationStatusCard({ delay = 2.0 }: { delay?: number }) {
  return (
    <CardWidget className="overflow-hidden p-0">
      <CardWidgetHeader>
        <CardWidgetIcon>{ICON}</CardWidgetIcon>
        <CardWidgetTitle>Station Status Profile</CardWidgetTitle>
      </CardWidgetHeader>
      <CardWidgetContent className="p-0">
        <GlowRadarChart
          className="w-full"
          height={340}
          data={stationStatusRadarData}
          metricKey="metric"
          series={[
            { key: "alBarsha", label: "Al Barsha", color: "var(--chart-primary)" },
            { key: "dubaiHQ",  label: "Dubai HQ",  color: "var(--chart-secondary)" },
            { key: "deira",    label: "Deira",      color: "var(--chart-tertiary)" },
          ]}
          delay={delay}
        />
      </CardWidgetContent>
    </CardWidget>
  )
}

export function ServiceByStationCard({ delay = 2.1 }: { delay?: number }) {
  return (
    <CardWidget className="overflow-hidden p-0">
      <CardWidgetHeader>
        <CardWidgetIcon>{ICON}</CardWidgetIcon>
        <CardWidgetTitle>Service by Station</CardWidgetTitle>
      </CardWidgetHeader>
      <CardWidgetContent className="p-0">
        <GlowRadarChart
          className="w-full"
          height={340}
          data={serviceStationData}
          metricKey="service"
          series={[
            { key: "alBarsha", label: "Al Barsha", color: "var(--chart-primary)" },
            { key: "dubaiHQ",  label: "Dubai HQ",  color: "var(--chart-secondary)" },
            { key: "deira",    label: "Deira",      color: "var(--chart-tertiary)" },
          ]}
          delay={delay}
        />
      </CardWidgetContent>
    </CardWidget>
  )
}

/* ── Requests Table ── */

const statusVariant: Record<Request["status"], string> = {
  "New":                "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  "Under investigation":"bg-yellow-500/15 text-yellow-600 dark:text-yellow-400",
  "Completed":          "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  "Pending approval":   "bg-orange-500/15 text-orange-600 dark:text-orange-400",
}

const requestColumns: ColumnDef<Request>[] = [
  createSelectColumn<Request>(),
  { accessorKey: "requestNo", header: "Request No." },
  {
    accessorKey: "clientName",
    header: "Client's name",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="size-7 rounded-full bg-muted flex items-center justify-center text-xs font-medium shrink-0">
          {row.original.clientName[0]}
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-bold text-sm font-mono">{row.original.clientName}</span>
          <span className="text-xs text-muted-foreground">{row.original.clientEmail}</span>
        </div>
      </div>
    ),
  },
  { accessorKey: "serviceName", header: "Service Name" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusVariant[row.original.status]}`}>
        {row.original.status}
      </span>
    ),
  },
  { accessorKey: "date",        header: "Date",         enableSorting: false },
  { accessorKey: "lastUpdate",  header: "Last update",  enableSorting: false },
  { accessorKey: "requestedIn", header: "Requested in", enableSorting: false },
  {
    id: "actions",
    enableSorting: false,
    cell: ({ row: _row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex size-7 items-center justify-center rounded-md hover:bg-muted">
            <MoreHorizontal className="size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>View details</DropdownMenuItem>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

export function RequestsTableCard() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [tableFilter, setTableFilter] = useState("")

  const filteredRows = tableRows.filter(r =>
    statusFilter === "all" || r.status === statusFilter
  )

  return (
    <CardWidget>
      <CardWidgetHeader>
        <DataTableToolbar
          globalFilter={tableFilter}
          onGlobalFilterChange={setTableFilter}
          searchPlaceholder="Search requests..."
          filterSlot={
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-44 rounded-lg">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Under investigation">Under investigation</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Pending approval">Pending approval</SelectItem>
              </SelectContent>
            </Select>
          }
        />
      </CardWidgetHeader>
      <CardWidgetContent className="p-0">
        <DataTable
          columns={requestColumns}
          data={filteredRows}
          globalFilter={tableFilter}
          onGlobalFilterChange={setTableFilter}
        />
      </CardWidgetContent>
    </CardWidget>
  )
}
