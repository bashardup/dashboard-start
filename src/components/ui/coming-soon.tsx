import { Link, useLocation } from "react-router-dom"
import { ArrowLeft, Construction } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CardWidget, CardWidgetContent } from "@/components/ui/card-widget"

interface ComingSoonProps {
  title?: string
  description?: string
}

function deriveTitleFromPath(pathname: string): string {
  const last = pathname.split("/").filter(Boolean).pop() ?? "Page"
  return last
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

export function ComingSoon({ title, description }: ComingSoonProps) {
  const location = useLocation()
  const resolvedTitle = title ?? deriveTitleFromPath(location.pathname)
  const resolvedDescription =
    description ??
    "Documentation for this component is on the roadmap. The primitive may already exist in the codebase — check `src/components/ui/` while we build the docs page."

  return (
    <div className="flex flex-col flex-1 w-full">
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div>
          <h1 className="text-[40px] font-bold font-mono tracking-tight text-secondary-600 dark:text-success-300 text-4xl">
            {resolvedTitle}
          </h1>
          <p className="text-sm md:text-2xl text-gray-500">Documentation coming soon</p>
        </div>

        <CardWidget>
          <CardWidgetContent>
            <div className="flex flex-col items-start gap-4 py-8">
              <div className="flex items-center gap-3 text-gray-500">
                <Construction className="size-5" />
                <span className="text-sm font-medium uppercase tracking-wider">
                  Work in progress
                </span>
              </div>
              <p className="max-w-2xl text-base text-gray-700 dark:text-gray-300">
                {resolvedDescription}
              </p>
              <p className="text-xs text-gray-500">
                Current path: <code className="font-mono">{location.pathname}</code>
              </p>
              <Button asChild variant="outlineGray" size="md">
                <Link to="/">
                  <ArrowLeft className="size-4" />
                  Back to dashboard
                </Link>
              </Button>
            </div>
          </CardWidgetContent>
        </CardWidget>
      </main>
    </div>
  )
}

export default ComingSoon
