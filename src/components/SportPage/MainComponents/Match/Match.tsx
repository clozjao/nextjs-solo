interface Match {
  id: string;
  matchName: string;
  matchState: string;
  inPlayState: string;
  odds: string[];
  oddsType: string[];
}

export default function Match({ match }: { match: Match }) {
  return (
    <>
      <div className="rounded-lg bg-white px-3 py-4">
        <div className="font-body1b mb-4">{match.matchName}</div>
        <div className="overflow-hidden rounded-lg">
          <div className="flex">
            <div className="bg-neutrals-300 h-[142px] flex-1 sm:h-[226px]"></div>
            <div className="bg-neutrals-500 h-[142px] flex-1 sm:h-[226px]"></div>
          </div>
          <div className="flex divide-x divide-x-1 divide-[#b1b1b1] rounded-b-lg border-x-1 border-b-1 border-[#b1b1b1] mt-4">
            {match.odds.map((item, index) => {
              return (
                <div
                  key={index}
                  className="font-body2b space-x flex-1 cursor-pointer space-x-2 px-5 py-2 text-center select-none"
                >
                  <span className="text-[#b1b1b1]">
                    {match.oddsType[index]}
                  </span>
                  <span>{item}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
