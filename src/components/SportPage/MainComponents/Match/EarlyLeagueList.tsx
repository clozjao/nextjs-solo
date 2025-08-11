import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { apiOverallMatchesEarlyMatch } from "@/api/REST/overallMatches";
import { useQuery } from "@tanstack/react-query";
import Left from "@/assets/left.svg";
import Match from "./Match";
import type { RootState } from "@/redux/store";
import type {
  earlyLeague,
  earlyMatchPayload,
  matchesResponse,
  c_productObj,
} from "@/type";
import { useTranslation } from "react-i18next";

export default function EarlyLeagueList({
  earlyLeagueList,
  isFetching,
  isLoading,
  safeSport,
}: {
  earlyLeagueList: earlyLeague[];
  isFetching: boolean;
  isLoading: boolean;
  safeSport: string;
}) {
  const { t } = useTranslation();
  // earlyMatches 為overall-matches 第二次以聯賽id請求 查看該聯賽底下的所有比賽細節
  const language = useSelector(
    (state: RootState) => state.globalSettingReducer.language
  );

  const [selectedLeagueId, setSelectedLeagueId] = useState("");
  const [payload, setPayload] = useState<earlyMatchPayload>({});

  useEffect(() => {
    if (!selectedLeagueId) return;
    const resultPayload = {
      lang: language,
      league_id: selectedLeagueId,
    };
    setPayload(resultPayload);
  }, [language, selectedLeagueId]);

  const {
    data: earlyMatchData,
    isFetching: earlyMatchIsFetching,
    isLoading: earlyMatchIsLoading,
  } = useQuery({
    queryKey: ["repoData", "earlyMatch", payload],
    queryFn: () => apiOverallMatchesEarlyMatch(payload).then((res) => res.data),
    staleTime: Infinity,
    retry: false,
    enabled: !!payload.league_id && !!selectedLeagueId,
  });

  return (
    <>
      {selectedLeagueId ? (
        !earlyMatchData || earlyMatchIsFetching || earlyMatchIsLoading ? (
          <div className="flex h-80 items-center justify-center">
            <div className="loader"></div>
          </div>
        ) : (
          <>
            <div className="flex flex-col rounded-lg bg-white">
              <div
                className="flex items-center gap-1 p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedLeagueId("");
                }}
              >
                <Left />
                <div>{t(`sports.early`)}</div>
              </div>
            </div>
            {earlyMatchData.matches.map((earlyMatch: matchesResponse) => {
              const resultProduct =
                safeSport === "soccer"
                  ? earlyMatch.c_product.find((item: c_productObj) =>
                      item.market_id.startsWith("1_")
                    )
                  : earlyMatch.c_product.find((item: c_productObj) =>
                      item.market_name.includes("Winner")
                    );

              const resultObj = {
                event_id: earlyMatch.event_id,
                event_name: earlyMatch.event_name,
                season_name: earlyMatch.season_name,
                teamA: earlyMatch.team_a?.name,
                teamB: earlyMatch.team_b?.name,
                product_info: resultProduct || {
                  market_id: "",
                  market_name: "",
                  product: [],
                },
              };
              return <Match key={earlyMatch.event_id} match={resultObj} />;
            })}
          </>
        )
      ) : isFetching || isLoading ? (
        <div className="flex h-80 items-center justify-center">
          <div className="loader"></div>
        </div>
      ) : earlyLeagueList.length > 0 ? (
        earlyLeagueList.map((item, index) => {
          return (
            <div
              key={index}
              className="font-body1b flex justify-between rounded-[3px] bg-white px-3 py-2"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedLeagueId(item.node_msg.id);
              }}
            >
              <div>{item.node_msg.name}</div>
              <div className="w-[25px] rounded-[3px] bg-[#c4c4c4] text-center">
                {item.match_pointer.length}
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex h-80 items-center justify-center">
          {t(`sports.no-events`)}
        </div>
      )}
    </>
  );
}
