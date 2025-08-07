import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// 直接 import 所有翻譯檔案（JSON 檔案保持不變）
import zh from "@/locales/zh/translation.json";
import en from "@/locales/en/translation.json";
import pt from "@/locales/pt/translation.json";
import es from "@/locales/es/translation.json";

// 定義語言類型
type SupportedLanguage = "zh" | "en" | "pt" | "es";

// 定義翻譯資源（添加類型註解）
const resources = {
  zh: {
    translation: zh,
  },
  en: {
    translation: en,
  },
  pt: {
    translation: pt,
  },
  es: {
    translation: es,
  },
} as const;

i18n
  .use(initReactI18next)
  // 初始化 i18next
  .init({
    resources,

    lng: "en",

    fallbackLng: "en" as SupportedLanguage,

    ns: ["translation"],

    defaultNS: "translation",

    interpolation: {
      escapeValue: false, // React 已經安全處理
    },

    // 支援的語言
    supportedLngs: ["zh", "en", "pt", "es"] as SupportedLanguage[],

    // React 特定設定
    react: {
      useSuspense: false, // 避免 Suspense 相關問題
    },
  });

export default i18n;
export type { SupportedLanguage };
