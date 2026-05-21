import { Info } from "lucide-react"
import { Icon01 } from "@/components/lottie/registry"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CardWidget, CardWidgetContent, CardWidgetHeader, CardWidgetIcon, CardWidgetTitle } from "@/components/ui/card-widget"
import { EmptyStateHero } from "@/components/ui/empty-state-hero"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

interface Appointment {
  title: string
  date: string
  status: string
}

const appointments: Record<string, Appointment[]> = {
  today: [
    { title: "Court session", date: "Today · 09 Sep 2025", status: "Tomorrow" },
    { title: "Court session", date: "Today · 09 Sep 2025", status: "Tomorrow" },
    { title: "Inquiry appointment", date: "Today · 09 Sep 2025", status: "Tomorrow" },
    { title: "Inquiry appointment", date: "Today · 09 Sep 2025", status: "Tomorrow" },
  ],
  tomorrow: [],
  thisweek: [],
}

function AppointmentRow({ appointment }: { appointment: Appointment }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-border/50 last:border-0">
      <div className=" min-w-0">
        <p className="font-mono font-bold text-sm leading-tight">{appointment.title}</p>
      </div>
      <div className="flex-1 flex justify-center w-full text-center">
        <p className="text-xs text-muted-foreground mt-0.5">{appointment.date}</p>

      <Badge variant="destructive" className="shrink-0 h-auto px-2.5 py-1 text-xs font-medium rounded-md">
        {appointment.status}
      </Badge>
      </div>
      <Button variant="gray" size="sm" className="shrink-0 gap-1.5  rounded-[32px]">
        <Info className="size-3.5" />
        Details
      </Button>
    </div>
  )
}

export function UpcomingAppointments() {
  return (
    <CardWidget>
      <CardWidgetHeader>
        <CardWidgetIcon>
              <img src="/img/icon-channel.svg" alt="Upcoming Appointments" />
        </CardWidgetIcon>
        <CardWidgetTitle>Upcoming Appointments</CardWidgetTitle>
      </CardWidgetHeader>
      <CardWidgetContent>
        <Tabs defaultValue="today">
          <TabsList variant="default" className="mb-4 mx-auto">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
            <TabsTrigger value="thisweek">This week</TabsTrigger>
          </TabsList>

          <TabsContent value="today">
            <div className="flex flex-col">
              {appointments.today.map((appt, i) => (
                <AppointmentRow key={i} appointment={appt} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tomorrow">
            <EmptyStateHero variant="small" title="No appointments" description="Nothing scheduled for tomorrow" isLottie lottieData={Icon01} />
          </TabsContent>

          <TabsContent value="thisweek">
            <EmptyStateHero variant="small" title="No appointments" description="Nothing scheduled this week" isLottie lottieData={Icon01} />
          </TabsContent>
        </Tabs>
      </CardWidgetContent>
    </CardWidget>
  )
}
