import LiveW from "@/assets/live-white.svg";
import LiveB from "@/assets/live.svg";
import Right from "@/assets/right.svg";
import Team1 from "@/assets/team1.svg";
import Team2 from "@/assets/team2.svg";

export default function Live() {
  return (
    <>
      <div className="space-y-4 rounded-lg bg-white px-3 py-4 sm:space-y-5 sm:px-5">
        <div className="flex justify-between py-2">
          <div className="font-h5 flex items-center gap-2">
            Live
            <LiveB />
          </div>
          <div className="font-body2 text-neutrals-500 flex items-center justify-center gap-2 !tracking-[-0.5px]">
            view all
            <Right className="h-5 w-5" />
          </div>
        </div>
        <div className="space-y-4">
          {Array.from({ length: 1 }).map((item, index) => {
            return (
              <div key={index} className="space-y-3">
                <div className="bg-neutrals-300 relative flex h-[156px] items-center justify-center gap-6 rounded-sm sm:h-[240px]">
                  <div className="absolute top-0 left-0 flex w-[44px] items-center justify-center rounded-[2px] rounded-ss-sm bg-[#e04141] px-2 py-0.5 sm:h-[32px] sm:w-[72px]">
                    <LiveW className="h-4 w-4 sm:h-6 sm:w-6" />
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="flex h-[40px] w-[40px] flex-col items-center justify-center rounded-full bg-white sm:h-[52px] sm:w-[52px]">
                      <Team2 className="w-[22px]" />
                    </div>
                    <div className="font-body1 text-center text-white">SYD</div>
                  </div>
                  <div className="flex w-[86px] items-center justify-between sm:w-[105px]">
                    <div className="rounded-sm border-1 border-white px-2 py-1 text-white">
                      2
                    </div>
                    <div>:</div>
                    <div className="rounded-sm border-1 border-white px-2 py-1 text-white">
                      3
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="flex h-[40px] w-[40px] flex-col items-center justify-center rounded-full bg-white sm:h-[52px] sm:w-[52px]">
                      <Team1 className="w-[22px]" />
                    </div>
                    <div className="font-body1 text-center text-white">LIO</div>
                  </div>
                </div>
                <div className="font-body1 rounded-sm border-1 py-3 text-center !tracking-[-0.5px]">
                  watch live now
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
