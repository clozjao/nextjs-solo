"use client";
import { useEffect } from "react";
import i18n from "@/i18n";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function I18nProvider({ children }) {
  const language = useSelector(
    (state: RootState) => state.globalSettingReducer.language
  );

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return <>{children}</>;
}
