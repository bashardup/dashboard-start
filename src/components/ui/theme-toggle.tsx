import { Check, Monitor, Moon, Sun } from "lucide-react"
import { useTranslation } from "react-i18next"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export interface ThemeToggleProps {
  /** Passed to <DropdownMenuContent>. Defaults to "end". */
  align?: "start" | "center" | "end"
  /** Extra classes on the trigger button. */
  className?: string
}

export function ThemeToggle({ align = "end", className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const { t } = useTranslation()

  // useTheme only exposes the stored choice ("light" | "dark" | "system");
  // when "system" is active, infer the resolved icon from prefers-color-scheme
  // so the trigger reflects what the user actually sees.
  const resolved =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme

  const options = [
    { value: "light" as const, label: t("components.themeToggle.light"), icon: Sun },
    { value: "dark" as const, label: t("components.themeToggle.dark"), icon: Moon },
    { value: "system" as const, label: t("components.themeToggle.system"), icon: Monitor },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outlineGray"
          size="icon-sm"
          className={cn("relative", className)}
          aria-label={t("components.themeToggle.label")}
        >
          <Sun
            className={cn(
              "size-4 transition-all duration-200",
              resolved === "dark" ? "scale-0 -rotate-90" : "scale-100 rotate-0"
            )}
          />
          <Moon
            className={cn(
              "absolute size-4 transition-all duration-200",
              resolved === "dark" ? "scale-100 rotate-0" : "scale-0 rotate-90"
            )}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="min-w-[10rem]">
        {options.map(({ value, label, icon: Icon }) => (
          <DropdownMenuItem
            key={value}
            onSelect={() => setTheme(value)}
            className="gap-2"
          >
            <Icon className="size-4 text-muted-foreground" />
            <span className="flex-1">{label}</span>
            {theme === value && <Check className="size-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ThemeToggle
