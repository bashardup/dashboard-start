import { useState } from "react"
import { useNavigate } from "react-router-dom"
import lottieIcon01 from "@/components/lottie/Icon_01.json"
import { Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { EmptyStateHero } from "@/components/ui/empty-state-hero"

/* ─── Data ──────────────────────────────────────────────────────────────── */

type Audience = "Individuals" | "Business" | "Visitors" | "Students"

interface Service {
  id: number
  title: string
  description: string
  icon: string
  audiences: Audience[]
  featured?: boolean
}

const services: Service[] = [
  { id: 1,  title: "Submit an Inquiry",            description: "This service enables users to submit their inquiries about various police-related matters.",  icon: "/img/icons-dual/1.svg",  audiences: ["Individuals", "Business"], featured: true },
  { id: 2,  title: "Police Clearance Certificate", description: "This service aims to enable individuals to obtain a clearance certificate from Dubai Police.", icon: "/img/icons-dual/2.svg",  audiences: ["Individuals", "Visitors"], featured: true },
  { id: 3,  title: "HQ Entry Permit",              description: "This service enables users wishing to visit the Dubai Police Headquarters to request a permit.", icon: "/img/icons-dual/3.svg",  audiences: ["Business", "Visitors"],    featured: true },
  { id: 4,  title: "Fines Inquiry and Payment",    description: "A service to inquire about traffic violations, including fines, and process online payments.",   icon: "/img/icons-dual/4.svg",  audiences: ["Individuals", "Business"], featured: true },
  { id: 5,  title: "Inquiries and Follow-up",      description: "Comprehensive service for applications status, reports, and general police inquiries.",          icon: "/img/icons-dual/5.svg",  audiences: ["Individuals", "Business"] },
  { id: 6,  title: "Report Criminal Complaint",    description: "A service to file various crime reports and related complaints with Dubai Police.",             icon: "/img/icons-dual/6.svg",  audiences: ["Individuals", "Business"] },
  { id: 7,  title: "Lost & Found",                 description: "This service enables users to report lost property or hand over found items to authorities.",    icon: "/img/icons-dual/7.svg",  audiences: ["Individuals"] },
  { id: 8,  title: "Request a Certificate",        description: "A service to obtain various official certificates issued by Dubai Police.",                     icon: "/img/icons-dual/8.svg",  audiences: ["Individuals"] },
  { id: 9,  title: "Request a Permit",             description: "A service to obtain various official permits issued by Dubai Police for events and activities.", icon: "/img/icons-dual/9.svg",  audiences: ["Individuals", "Business"] },
  { id: 10, title: "Pay Traffic Fines",            description: "Manage and pay traffic violations on your vehicle or license quickly and securely online.",     icon: "/img/icons-dual/11.svg", audiences: ["Individuals", "Business"] },
  { id: 11, title: "Report a Vehicle or Driver",   description: "Report obstructing vehicles and misuse of traffic rules through the Dubai Police portal.",      icon: "/img/icons-dual/45.svg", audiences: ["Individuals"] },
  { id: 12, title: "Faris",                        description: "A centralised digital platform enabling rapid, coordinated response to major incidents.",        icon: "/img/icons-dual/1.svg",  audiences: ["Business", "Students"] },
  { id: 13, title: "Smart Attendance",             description: "Manage and track attendance records digitally through the Dubai Police smart system.",           icon: "/img/icons-dual/2.svg",  audiences: ["Business", "Students"] },
  { id: 14, title: "Tourist Police",               description: "Dedicated support services for tourists and visitors across Dubai's key locations.",             icon: "/img/icons-dual/3.svg",  audiences: ["Visitors"] },
  { id: 15, title: "Student Services",             description: "Educational and awareness programs offered by Dubai Police for students.",                       icon: "/img/icons-dual/4.svg",  audiences: ["Students"] },
  { id: 16, title: "Emergency Services",           description: "Access emergency contact services and safety guidelines provided by Dubai Police.",              icon: "/img/icons-dual/5.svg",  audiences: ["Individuals", "Visitors", "Business"] },
]

const ALL_FILTERS = ["All", "Individuals", "Business", "Visitors", "Students"] as const
type Filter = typeof ALL_FILTERS[number]

const audienceCounts: Record<Filter, number> = {
  All: services.length,
  Individuals: services.filter(s => s.audiences.includes("Individuals")).length,
  Business:    services.filter(s => s.audiences.includes("Business")).length,
  Visitors:    services.filter(s => s.audiences.includes("Visitors")).length,
  Students:    services.filter(s => s.audiences.includes("Students")).length,
}


function ServiceCard({ service }: { service: Service }) {
  const navigate = useNavigate()
  return (
    
    <Card className=" dark:bg-[linear-gradient(150deg,#26d07c42_-30%,transparent_40%)]">
      <CardContent className="">
        <div className="size-16 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
          <img src={service.icon} alt={service.title} className="size-9 object-contain" />
        </div>
        <CardTitle className="font-mono font-bold text-[14px] md:text-[17px]  mb-1  leading-snug">{service.title}</CardTitle>
        <CardDescription className="text-xs line-clamp-2">{service.description}</CardDescription>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {service.audiences.map(a => (
            <Badge key={a} variant="outline" className="text-[10px] font-normal rounded-full border-border">
              {a}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className=" border-0 bg-transparent">
        <Button
          variant="tonal"
          className="w-full"
          onClick={() => navigate("/services/inquiry")}
        >
          View Service
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function ServicesListingPage() {
  const [query, setQuery]   = useState("")
  const [filter, setFilter] = useState<Filter>("All")

  const filtered = services.filter(s => {
    const matchesFilter = filter === "All" || s.audiences.includes(filter as Audience)
    const matchesQuery  = !query || s.title.toLowerCase().includes(query.toLowerCase()) || s.description.toLowerCase().includes(query.toLowerCase())
    return matchesFilter && matchesQuery
  })

  return (
    <div className="flex flex-col flex-1 w-full">
      <main className="flex flex-1 flex-col gap-8 p-4 lg:p-6">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h1 className="text-3xl font-bold font-mono text-emerald-900 dark:text-emerald-300">Marhaba</h1>
          <div className="flex items-center gap-3 flex-wrap">
            
          </div>
        </div>
{/* 
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-foreground">Most Used Services</h2>
            <div className="flex gap-1">
              <button onClick={() => scroll("left")}  className="size-7 rounded-full border border-border bg-white dark:bg-zinc-900 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <ChevronLeft className="size-4" />
              </button>
              <button onClick={() => scroll("right")} className="size-7 rounded-full border border-border bg-white dark:bg-zinc-900 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
          <div ref={scrollRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 ">
            {featuredServices.map(s =><div> <FeaturedCard key={s.id} service={s} /></div>)}
          </div>
        </div> */}

        {/* ── Filters + Search ── */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <InputGroup className="w-full sm:w-56 shrink-0 h-9 rounded-xl bg-white dark:bg-zinc-900">
            <InputGroupAddon align="inline-start">
              <InputGroupText>
                <Search className="size-3.5" />
              </InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="text-xs"
            />
          </InputGroup>
          <div className="flex flex-wrap gap-2 ms-auto">
            {ALL_FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "inline-flex items-center gap-1.5 h-9 px-4 rounded-full text-xs font-medium border transition-colors",
                  filter === f
                    ? "bg-emerald-700 text-white border-emerald-700"
                    : "bg-white dark:bg-zinc-900 text-foreground border-border hover:border-emerald-600"
                )}
              >
                {filter === f && <span className="text-[10px]">✓</span>}
                {f} <span className="opacity-60">({audienceCounts[f]})</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Services grid ── */}
        {filtered.length > 0 ? (
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map(s => <div key={s.id} className="hover:-translate-y-1 transition-transform duration-200"><ServiceCard service={s} /></div>)}
          </div>
        ) : (
          <EmptyStateHero
            title="No services found"
            description="Try a different search term or filter"
            isLottie
            lottieData={lottieIcon01}
          />
        )}
      </main>
    </div>
  )
}
