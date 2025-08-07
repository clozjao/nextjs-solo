import Right from "@/assets/right.svg";
import { teams } from "@/data/teams";
import { useTranslation } from "react-i18next";

export default function Team() {
  const { t } = useTranslation();
  return (
    <>
      <div className="space-y-4 rounded-lg bg-white px-3 py-4 sm:space-y-5 sm:px-5">
        <div className="flex justify-between py-2">
          <div className="font-h5">{t("sports.team")}</div>
          <div className="font-body2 text-neutrals-500 flex items-center justify-center gap-2 !tracking-[-0.5px]">
            {t("button.view-all")}
            <Right className="h-5 w-5" />
          </div>
        </div>
        <div className="scrollbar-hide flex overflow-x-auto overflow-y-hidden">
          <div className="flex gap-4 duration-400">
            {teams.map((item) => {
              return (
                <div key={item.id} className="flex flex-col items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                  <div className="font-body1">{item.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
