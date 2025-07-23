import { useState } from "react";
import Match from "@/components/SportPage/MainComponents/Match/Match";
import { matchesData } from "@/data/matchesData";

export default function MatchList() {
  const [matchState, setMatchState] = useState("in-play");
  const matchArr = ["in-play", "early", "next-24-hours", "result"];
  const filterMatch = matchesData.filter(
    (item) => item.matchState === matchState
  );

  return (
    <>
      <div>
        <div className="scrollbar-hide mb-5 overflow-auto">
          <div className="space-x-3 text-start whitespace-nowrap">
            {matchArr.map((item) => {
              return (
                <button
                  key={item}
                  className={`font-body1 cursor-pointer rounded-[100px] px-5 py-2 text-nowrap transition-colors duration-300 select-none sm:px-8 sm:py-3 ${
                    matchState === item
                      ? "text-primary-500 bg-neutrals-900 text-white"
                      : "text-neutrals-500 bg-white"
                  }`}
                  onClick={() => setMatchState(item)}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
        <div className="space-y-3">
          {filterMatch.length > 0 ? (
            filterMatch.map((item) => {
              return <Match key={item.id} match={item} />;
            })
          ) : (
            <div>No events.</div>
          )}
        </div>
      </div>
    </>
  );
}
