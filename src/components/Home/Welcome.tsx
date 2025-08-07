import Vercel from "@/assets/vercel.svg";
import { useTranslation } from "react-i18next";

export default function Welcome() {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-8 h-[60%]">
        <div className="font-h3">{t("hello")}</div>
        <Vercel className="w-[100px] xl:w-[150px]" />
      </div>
    </>
  );
}
