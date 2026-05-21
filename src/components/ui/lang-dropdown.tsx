import { useTranslation } from "react-i18next"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function LangDropdown() {
  const { i18n, t } = useTranslation()

  const handleChange = (value: string) => {
    i18n.changeLanguage(value)
    localStorage.setItem("app-language", value)
  }

  return (
    <Select value={i18n.language === "ar" ? "ar" : "en"} onValueChange={handleChange}>
      <SelectTrigger className="w-28 dark:text-sage-100 border-0 h-10 rounded-full dark:bg-sage-800/30 px-4">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="en">{t("common.english")}</SelectItem>
          <SelectItem value="ar">{t("common.arabic")}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
