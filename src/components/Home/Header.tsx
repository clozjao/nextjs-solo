import Rule from "@/assets/rules.svg";
import HomeLang from "./HomeLang";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";
import Next from "@/assets/next.svg";

import { setRulesOpen } from "@/redux/reducer/componentsReducer";

export default function Header() {
  const rulesOpen = useSelector(
    (state: RootState) => state.componentsReducer.rulesOpen
  );
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <div className="flex h-[20%] min-h-[86px] w-full flex-col bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,255,255,0.6)_34.62%,_rgba(255,255,255,0)_100%)] sm:min-h-[110px] xl:min-h-[134px]">
        <div className="mt-4 flex justify-between px-4 sm:mt-10 sm:px-20 xl:mt-16 xl:px-15">
          <Next className="w-[120px] xl:w-[180px]" />
          <div className="flex items-center gap-6">
            <Rule
              className="cursor-pointer w-6 h-6"
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                e.stopPropagation();
                dispatch(setRulesOpen(!rulesOpen));
              }}
            />
            <HomeLang />
          </div>
        </div>
      </div>
    </>
  );
}
