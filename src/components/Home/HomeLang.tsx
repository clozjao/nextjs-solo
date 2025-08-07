import { useEffect, useState } from "react";
import Language from "@/assets/language.svg";
import Down from "@/assets/down.svg";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import LangFn from "@/components/LangFn";

export default function LangUi() {
  const [openLang, setOpenLang] = useState(false);
  const language = useSelector(
    (state: RootState) => state.globalSettingReducer.language
  );
  const langDisplay = useSelector(
    (state: RootState) => state.globalSettingReducer.langDisplay
  );

  useEffect(() => {
    // console.log(language);
  }, [language]);

  return (
    <>
      <div className="group relative">
        <div
          className="bg-base-white flex w-[160px] cursor-pointer items-center justify-between gap-2 rounded-[100px] p-2 select-none h-10"
          onClick={(e) => {
            e.stopPropagation();
            setOpenLang(!openLang);
          }}
        >
          <Language className="h-6 w-6" />
          <div className="font-body1 text-nowrap">{langDisplay}</div>
          <Down
            className={`h-6 w-6 transition-transform ${
              openLang ? "rotate-180" : ""
            }`}
          />
        </div>
        <div
          className={`divide-neutrals-200 absolute top-12 left-2 flex flex-col gap-2 divide-y rounded-[20px] bg-white p-5 transition-opacity duration-300 ease-in-out ${
            openLang
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        >
          <LangFn setOpenLang={setOpenLang} />
        </div>
      </div>
    </>
  );
}
