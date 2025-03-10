const langs = ["ja", "zh-CN", "zh-TW", "pt", "fr", "ar-DZ", "ar-SA", "ar-MA", "zh-HK"]
export const currentSupportedLanguages = ["en", ...langs.sort()]
export const dayjsLocaleImportMap = {
  en: ["en", () => import("dayjs/locale/en")],
  ["zh-CN"]: ["zh-cn", () => import("dayjs/locale/zh-cn")],
  ["ja"]: ["ja", () => import("dayjs/locale/ja")],
  ["it"]: ["it", () => import("dayjs/locale/it")],
  ["ar-DZ"]: ["ar-dz", () => import("dayjs/locale/ar-dz")],
  ["ar-SA"]: ["ar-sa", () => import("dayjs/locale/ar-sa")],
  ["ar-MA"]: ["ar-ma", () => import("dayjs/locale/ar-ma")],
  ["es"]: ["es", () => import("dayjs/locale/es")],
  ["fr"]: ["fr", () => import("dayjs/locale/fr")],
  ["pt"]: ["pt", () => import("dayjs/locale/pt")],
  ["zh-TW"]: ["zh-tw", () => import("dayjs/locale/zh-tw")],
  ["zh-HK"]: ["zh-hk", () => import("dayjs/locale/zh-hk")],
}
export const ns = ["app", "common", "lang", "settings", "shortcuts", "errors"] as const
export const defaultNS = "app" as const
