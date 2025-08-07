import { useState } from "react";
import Right from "@/assets/right.svg";
import NotifyOn from "@/assets/notify-on.svg";
import NotifyOff from "@/assets/notify-off.svg";
import Team2 from "@/assets/team2.svg";
import Team1 from "@/assets/team1.svg";
import { useTranslation } from "react-i18next";

export default function UpComing() {
  const { t } = useTranslation();
  const [notifyState, setNotifyState] = useState(false);
  return (
    <>
      <div className="space-y-4 rounded-lg bg-white px-3 py-4 sm:space-y-5 sm:px-5">
        <div className="flex justify-between py-2">
          <div className="font-h5">{t("sports.upcoming")}</div>
          <div className="font-body2 text-neutrals-500 flex items-center justify-center gap-2 !tracking-[-0.5px]">
            {t("button.view-all")}
            <Right className="h-5 w-5" />
          </div>
        </div>
        <div className="space-y-3 sm:space-y-5">
          <div className="flex justify-start gap-2">
            <span className="font-captionb flex items-center rounded-sm bg-[#e04141] px-2 py-0.5 !tracking-[-0.5px] text-white">
              LIVE
            </span>
            <span>AM8:00</span>
          </div>
          <div className="flex items-center justify-center gap-4 sm:justify-between sm:gap-10">
            <div className="flex items-center justify-between gap-4 px-4 sm:w-auto sm:px-0">
              <div className="flex items-center gap-2">
                <div className="hidden sm:block">
                  <Team2 />
                </div>
                <div>SYD</div>
              </div>
              <div>vs</div>
              <div className="flex items-center gap-2">
                <div className="hidden sm:block">
                  <Team1 />
                </div>
                <div>LIO</div>
              </div>
            </div>
            <div className="flex items-center justify-center w-full">
              <div
                className="font-body1 flex items-center justify-center gap-2 rounded-sm border-2 border-neutrals-300 px-3 py-2 sm:w-full max-w-[300px]"
                onClick={(e) => {
                  e.stopPropagation();
                  setNotifyState(!notifyState);
                }}
              >
                reserve
                {notifyState ? (
                  <NotifyOn className="w-[16px]" />
                ) : (
                  <NotifyOff className="w-[16px]" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
