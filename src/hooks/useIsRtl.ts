import { useTranslation } from "react-i18next"

export default function useIsRtl(): boolean {
    const { i18n } = useTranslation()
    const rtlLanguages: string[] = ["ar"];

    return rtlLanguages.includes(i18n.language);
}