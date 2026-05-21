import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import en from "@/locales/en.json"
import ar from "@/locales/ar.json"

const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
}

const savedLanguage = localStorage.getItem("app-language")
const defaultLanguage = savedLanguage === "ar" ? "ar" : "en"

const applyDocumentDirection = (language: string) => {
  const isArabic = language === "ar"
  document.documentElement.dir = isArabic ? "rtl" : "ltr"
  document.documentElement.lang = isArabic ? "ar" : "en"
}

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
})

applyDocumentDirection(defaultLanguage)
i18n.on("languageChanged", applyDocumentDirection)

export default i18n
