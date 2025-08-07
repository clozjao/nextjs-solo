import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";
import { setRulesOpen } from "@/redux/reducer/componentsReducer";
import Delete from "@/assets/delete.svg";
import { useEffect, useState, useRef } from "react";
import Down from "@/assets/down.svg";
import parse from "html-react-parser";
import { useTranslation } from "react-i18next";

export default function BettingRules() {
  const { t } = useTranslation();
  const [animateShow, setAnimateShow] = useState(false);
  const [openRuleIndex, setOpenRuleIndex] = useState<number | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const ruleRef = useRef<(HTMLDivElement | null)[]>([]);
  const rulesOpen = useSelector(
    (state: RootState) => state.componentsReducer.rulesOpen
  );
  const rules = useSelector(
    (state: RootState) => state.globalSettingReducer.rules
  );

  useEffect(() => {
    if (rulesOpen) {
      setAnimateShow(true);
    }
  }, [rulesOpen]);

  useEffect(() => {
    if (animateShow) return;
    setTimeout(() => {
      dispatch(setRulesOpen(false));
    }, 300);
  }, [animateShow, dispatch]);

  return (
    <>
      {rulesOpen ? (
        <>
          <div
            className={`absolute top-0 left-0 z-20 transition-opacity duration-300 ${
              animateShow
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0"
            } h-full w-full bg-white p-6`}
          >
            <div className="font-body1b mb-5 flex w-full items-center justify-between">
              {t("function.betting-rules")}
              <Delete
                className="h-6 w-6"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  setAnimateShow(false);
                }}
              />
            </div>
            <div className="divide-neutrals-200 divide-y">
              {rules.length > 0 ? (
                <>
                  {rules.map((item, index) => {
                    return (
                      <div
                        className=""
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenRuleIndex(index);
                          if (openRuleIndex === index) {
                            setOpenRuleIndex(null);
                          }
                        }}
                      >
                        <div className="flex items-center justify-between py-5">
                          {item.title}
                          <Down
                            className={`transition-transform duration-300 w-6 h-6 ${
                              openRuleIndex !== index ? "" : "rotate-180"
                            }`}
                          />
                        </div>
                        <div
                          ref={(el) => {
                            ruleRef.current[index] = el;
                          }}
                          className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                          style={{
                            maxHeight:
                              openRuleIndex === index
                                ? ruleRef.current[index]?.scrollHeight + "px"
                                : "0px",
                          }}
                        >
                          <div className="py-2">{parse(item.content)}</div>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
