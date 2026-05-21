import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useBreadcrumbSlot } from "@/components/breadcrumb-context"
import { UserDropdown } from "@/components/ui/user-dropdown"
import { LangDropdown } from "@/components/ui/lang-dropdown"
import { useSidebar } from "@/components/ui/sidebar"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

function HeaderBreadcrumb() {
  const { breadcrumb } = useBreadcrumbSlot()
  return <>{breadcrumb}</>
}

function HeaderAction() {
  const { headerAction } = useBreadcrumbSlot()
  return <>{headerAction}</>
}

export function Header() {
  const { state, toggleSidebar } = useSidebar()
  const collapsed = state === "collapsed"

  return (
    <header className="fixed z-10 top-0 right-0 w-full flex h-14 items-center gap-4 border-b dark:border-white/5 px-4 lg:h-[60px] lg:px-6 backdrop-blur-sm z-10 bg-white/0 dark:bg-transparent">
      <Button
        variant="gray"
        size="icon-sm"
        className="xl:hidden shrink-0"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <Menu className="size-5" />
      </Button>
      <div
        className="hidden md:block shrink-0 transition-[width] duration-200 ease-linear"
        style={{ width: collapsed ? "var(--sidebar-width-icon)" : "var(--sidebar-width)" }}
      />
      <div className="w-full flex-1">
        <HeaderBreadcrumb />
      </div>
      <HeaderAction />
      <LangDropdown />
      <ThemeToggle />
      <UserDropdown />
    </header>
  )
}
