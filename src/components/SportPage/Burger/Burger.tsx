import { useState } from "react";
import Date from "@/assets/date.svg";
// import Order from "@/assets/order.svg";
import Language from "@/assets/language.svg";
import Rules from "@/assets/rules.svg";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import { setRulesOpen, setLangsOpen } from "@/redux/reducer/componentsReducer";
import { useTranslation } from "react-i18next";

export default function Burger({
  setOpenLeftSideBar,
}: {
  setOpenLeftSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const [active, setActive] = useState("schedule");

  const menuItems = [
    { key: "schedule", label: "Schedule", icon: <Date className="h-6 w-6" /> },
    {
      key: "language",
      label: "Language",
      icon: <Language className="h-6 w-6" />,
    },
    { key: "rules", label: "Rules", icon: <Rules className="h-6 w-6" /> },
  ];

  return (
    <nav className="h-full w-full bg-white pt-10 text-black xl:bg-transparent xl:pt-0">
      <div className="flex flex-col md:items-start">
        <div className="flex w-full items-center justify-between px-7 pb-4 xl:flex-col xl:items-start xl:justify-start xl:px-0 xl:pb-5">
          <div className="flex items-center gap-2 xl:mb-5">
            <div className="h-8 w-8 rounded-full bg-gray-400" />
            <span className="font-body1 text-black">{t("user")}</span>
          </div>
          {/* <div className="text-lg font-bold text-black xl:text-2xl">
            11,200 <span className="text-xs font-normal">EU</span>
          </div> */}
        </div>
        <hr className="h-[1px] w-full border-none bg-gray-300 xl:hidden" />
      </div>
      <div className="space-y-4 px-5 py-4 xl:px-0 xl:py-0">
        <input
          type="text"
          placeholder="Search"
          className="w-full rounded-full bg-gray-200 px-4 py-2 text-black placeholder-gray-500 xl:hidden"
        />
        <div className="space-y-2 xl:space-y-5">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={(e) => {
                e.stopPropagation();
                setActive(item.key);
                switch (item.label) {
                  case "Schedule":
                    setOpenLeftSideBar(false);
                    break;

                  case "History":
                    setOpenLeftSideBar(false);
                    break;

                  case "Language":
                    setOpenLeftSideBar(false);
                    dispatch(setLangsOpen(true));
                    break;

                  case "Rules":
                    setOpenLeftSideBar(false);
                    dispatch(setRulesOpen(true));
                    break;

                  default:
                    break;
                }
              }}
              className={`font-body1 flex w-full items-center gap-5 rounded-md px-4 py-3 transition-all ${
                active === item.key
                  ? "text-neutrals-900 bg-neutrals-100 xl:bg-white"
                  : "text-neutrals-600 hover:bg-white/60"
              }`}
            >
              {item.icon}
              <span>{t(`navigation.${item.key}`)}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
