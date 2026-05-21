import {
  BarChart2,
  CheckSquare,
  ChevronDown,
  FileText,
  LayoutDashboard,
  LayoutGrid,
  MoveHorizontal,
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem,
  SidebarHeader, SidebarTrigger, useSidebar,
} from "@/components/ui/sidebar"
// import { ProfileSwitcher } from "@/components/ui/profile-switcher"
import useIsRtl from "@/hooks/useIsRtl"

/* ── Types ── */

type SubItem = { titleKey: string; url: string; icon: LucideIcon }
type SectionItem = { titleKey: string; url?: string; icon: LucideIcon; children?: SubItem[] }
type Section = { titleKey: string; items: SectionItem[] }

/* ── Data ── */

// const profileOptions = [
//   { value: "dubai-hq", label: "Dubai Police HQ", description: "Active station", icon: "/img/Dubai-Police-Default-Icon.svg" },
//   { value: "al-barsha", label: "Al Barsha Station", description: "Secondary station", icon: "/img/logo-sm.svg" },
//   { value: "al-barsha1", label: "Al Barsha Station", description: "Secondary station", icon: "/img/logo-sm.svg" },
// ]

const sections: Section[] = [
  {
    titleKey: "sidebar.patterns",
    items: [
      {
        titleKey: "sidebar.dashboardsGroup",
        url: "/",
        icon: LayoutDashboard,
        children: [
          { titleKey: "sidebar.dashboard", url: "/", icon: LayoutDashboard },
          { titleKey: "sidebar.analyticsPage", url: "/analytics", icon: BarChart2 },
          { titleKey: "sidebar.resizableDashboard", url: "/dashboards/resizable", icon: MoveHorizontal },
        ],
      },
      {
        titleKey: "sidebar.services",
        url: "/services",
        icon: LayoutGrid,
        children: [
          { titleKey: "sidebar.inquiryDetail", url: "/services/inquiry", icon: FileText },
          { titleKey: "sidebar.inquiryForm", url: "/services/inquiry/form", icon: FileText },
          { titleKey: "sidebar.serviceStatus", url: "/services/status", icon: FileText },
          { titleKey: "sidebar.confirmation", url: "/services/confirmation", icon: CheckSquare },
          { titleKey: "sidebar.transactionEnquiry", url: "/services/transaction-enquiry", icon: FileText },
          { titleKey: "sidebar.requestDetail", url: "/services/request-detail", icon: FileText },
        ],
      },
    ],
  },
]

/* ── Section accordion (group-level collapse) ── */

function SectionAccordion({ section, defaultOpen }: { section: Section; defaultOpen: boolean }) {
  const { t } = useTranslation()
  const location = useLocation()
  const { state } = useSidebar()
  const [open, setOpen] = useState(defaultOpen)

  // In icon-collapsed sidebar mode the label is hidden and items render as
  // icon-only stubs — always show content there so navigation stays usable.
  const isIconMode = state === "collapsed"
  const showContent = isIconMode || open

  return (
    <SidebarGroup>
      <SidebarGroupLabel asChild>
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          className="flex w-full items-center justify-between cursor-pointer hover:text-sidebar-foreground"
        >
          <span>{t(section.titleKey)}</span>
          <ChevronDown
            className="size-3.5 shrink-0 transition-transform duration-200"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </button>
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <AnimatePresence initial={false}>
          {showContent && (
            <motion.div
              key="section"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <SidebarMenu>
                {section.items.map((item) =>
                  item.children ? (
                    <AccordionMenuItem
                      key={item.titleKey}
                      item={item}
                      defaultOpen={item.children.some(c => location.pathname === c.url)}
                    />
                  ) : (
                    <SidebarMenuItem key={item.titleKey}>
                      <SidebarMenuButton
                        isActive={location.pathname === item.url}
                        asChild
                      >
                        <NavLink to={item.url!}>
                          <item.icon size={20} />
                          <span>{t(item.titleKey)}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                )}
              </SidebarMenu>
            </motion.div>
          )}
        </AnimatePresence>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

/* ── Accordion menu item ── */

function AccordionMenuItem({ item, defaultOpen }: { item: SectionItem; defaultOpen: boolean }) {
  const location = useLocation()
  const { t } = useTranslation()
  const [open, setOpen] = useState(defaultOpen)
  const isChildActive = item.children?.some(c => location.pathname === c.url) ?? false

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={isChildActive}
        onClick={() => setOpen(o => !o)}
        className="cursor-pointer"
      >
        <item.icon size={20} />
        <span>{t(item.titleKey)}</span>
        <ChevronDown
          className="size-3.5 shrink-0 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </SidebarMenuButton>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="sub"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <SidebarMenuSub>
              {item.children!.map(child => (
                <SidebarMenuSubItem key={child.titleKey}>
                  <SidebarMenuSubButton
                    asChild
                    isActive={location.pathname === child.url}
                  >
                    <NavLink to={child.url}>
                      <child.icon />
                      <span>{t(child.titleKey)}</span>
                    </NavLink>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </motion.div>
        )}
      </AnimatePresence>
    </SidebarMenuItem>
  )
}

/* ── AppSidebar ── */

export function AppSidebar() {
  const isRtl = useIsRtl()

  return (
    <Sidebar side={isRtl ? "right" : "left"} collapsible="icon" variant="floating" className="overflow-hidden">
      <SidebarHeader className="flex group-data-[collapsible=icon]:flex-col flex-row items-center justify-between border-b border-sidebar-border">
        <div className="flex items-center">
          <NavLink to="/" className="flex items-center">
            <img
              src="/img/dp-logo-color.svg"
              alt="Dubai Police"
              className="aspect-[16/5] h-12 w-auto object-contain group-data-[collapsible=icon]:hidden"
            />
            <img
              src="/img/Dubai-Police-Default-Icon.svg"
              alt="Dubai Police"
              className="aspect-square h-8 w-auto object-contain hidden group-data-[collapsible=icon]:block"
            />
          </NavLink>
        </div>
        <SidebarTrigger className="bg-transparent text-slate-700 dark:text-slate-500" />
      </SidebarHeader>

      <SidebarContent>
        {sections.map((section, idx) => (
          <SectionAccordion
            key={section.titleKey}
            section={section}
            defaultOpen={idx === 0}
          />
        ))}
      </SidebarContent>

      {/* <SidebarFooter className="p-3 group-data-[collapsible=icon]:p-2">
        <ProfileSwitcher
          options={profileOptions}
          className="group-data-[collapsible=icon]:hidden"
        />
      </SidebarFooter> */}
    </Sidebar>
  )
}
