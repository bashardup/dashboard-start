import { SidebarProvider } from "@/components/ui/sidebar"
import React from "react"
import { AppSidebar } from "./app-sidebar"
import { ThemeProvider } from "./theme-provider"
import { BreadcrumbProvider } from "./breadcrumb-context"
import { Header } from "./ui/header"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" >
      <BreadcrumbProvider>
        
        <SidebarProvider className="bg-secondary-10 dark:bg-slate-900 ">
         <Header />
          <span
            className="fixed  top-0 left-0 w-full h-full dark:bg-linear-[160deg]  dark:from-[rgba(1,108,87,0.19)] dark:to-transparent to-35%">
          </span>
          <AppSidebar />
          <main className="w-full relative pt-[60px]">
            <div className="container mx-auto">
              {children}
            </div>
            <div className="mt-16 relative">
              {/* Full-bleed border-top spanning layout's <main> (viewport minus sidebar gap). */}
              <hr className="absolute inset-x-0 top-0 m-0 border-t border-border" />
              <footer className="mx-auto max-w-6xl px-4 lg:px-8 pt-6 pb-8 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500 dark:text-slate-500">
                <span>Dubai Police Design System 2.0</span>
                <span>© 2026 Dubai Police Design System 2.0. All rights reserved.</span>
              </footer>
            </div>
          </main>
        </SidebarProvider>
      </BreadcrumbProvider>
    </ThemeProvider>
  )
}
