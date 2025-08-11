import { useState } from "react";
import Match from "@/components/SportPage/MainComponents/Match/Match";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  apiOverallMatchesSportPage,
  apiOverallMatchesEarlyLeague,
} from "@/api/REST/overallMatches";
import { eventTypeList } from "@/data/eventTypeId";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";
import { cleanEarlyMatches } from "@/redux/reducer/earlyMatchReducer";
import type {
  matchesResponse,
  c_productObj,
  matchPayload,
  earlyLeaguePayload,
} from "@/type";
import EarlyLeagueList from "@/components/SportPage/MainComponents/Match/EarlyLeagueList";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";

type SportType = keyof typeof eventTypeList;

export default function MatchList() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [matchState, setMatchState] = useState("inplay");
  const [payload, setPayload] = useState<matchPayload>({});
  const [earlyPayload, setEarlyPayload] = useState<earlyLeaguePayload>({});
  const [filteredData, setFilteredData] = useState([]);
  // earlyLeagueList 為overall-matches 第一次請求 取得有early賽事的聯賽 及賽事場數
  const [earlyLeagueList, setEarlyLeagueList] = useState([]);
  const [count, setCount] = useState(20);
  const [totalCount, setTotalCount] = useState(0);
  const language = useSelector(
    (state: RootState) => state.globalSettingReducer.language
  );

  const matchArr = [
    { payloadKey: "inplay", displayName: "in-play" },
    { payloadKey: "today", displayName: "next-24-hours" },
    { payloadKey: "early", displayName: "early" },
  ];

  const { sport } = useParams<{ sport: string }>();
  const safeSport: SportType = (
    sport && sport in eventTypeList ? sport : "soccer"
  ) as SportType;
  useEffect(() => {
    // 切換路由時重置filteredData
    setFilteredData([]);
  }, [safeSport]);

  useEffect(() => {
    if (!safeSport) return;
    if (matchState === "early") {
      const resultPayload = {
        event_type_id: eventTypeList[safeSport],
        lang: language,
      };
      setEarlyPayload(resultPayload);
    } else {
      const resultPayload = {
        event_type_id: eventTypeList[safeSport],
        start_time_type: matchState,
        lang: language,
        count,
      };
      setPayload(resultPayload);
    }
  }, [matchState, safeSport, language, count]);

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ["repoData", "overallMatchesV3", payload],
    queryFn: () => apiOverallMatchesSportPage(payload).then((res) => res.data),
    staleTime: Infinity,
    retry: false,
    enabled: !!payload?.event_type_id,
  });

  const {
    data: earlyLeagueData,
    isFetching: isFetchingEarly,
    isLoading: isLoadingEarly,
  } = useQuery({
    queryKey: ["repoData", "earlyLeague", earlyPayload],
    queryFn: () =>
      apiOverallMatchesEarlyLeague(earlyPayload).then((res) => res.data),
    staleTime: Infinity,
    retry: false,
    enabled: !!earlyPayload?.event_type_id,
  });

  useEffect(() => {
    if (!data || isFetching || isLoading) return;
    // today & in-play
    setFilteredData(data.matches);
    setTotalCount(data.count);
  }, [data, isFetching, isLoading]);

  useEffect(() => {
    if (!earlyLeagueData || isFetchingEarly || isLoadingEarly) return;
    setEarlyLeagueList(earlyLeagueData.match_node);
  }, [earlyLeagueData, isFetchingEarly, isLoadingEarly]);

  return (
    <>
      <div>
        <div className="scrollbar-hide mb-5 overflow-auto">
          <div className="space-x-3 text-start whitespace-nowrap">
            {matchArr.map((item) => {
              return (
                <button
                  key={item.payloadKey}
                  className={`font-body1 cursor-pointer rounded-[100px] px-5 py-2 text-nowrap transition-colors duration-300 select-none sm:px-8 sm:py-3 ${
                    matchState === item.payloadKey
                      ? "text-primary-500 bg-neutrals-900 text-white"
                      : "text-neutrals-500 bg-white"
                  }`}
                  onClick={() => {
                    setMatchState(item.payloadKey);
                    dispatch(cleanEarlyMatches());
                  }}
                >
                  {t(`sports.${item.displayName}`)}
                </button>
              );
            })}
          </div>
        </div>
        <div className="relative space-y-3" id="scrollDiv">
          {matchState === "early" ? (
            <EarlyLeagueList
              earlyLeagueList={earlyLeagueList}
              isFetching={isFetchingEarly}
              isLoading={isLoadingEarly}
              safeSport={safeSport}
            />
          ) : filteredData.length > 0 && totalCount > 0 ? (
            <InfiniteScroll
              dataLength={filteredData.length}
              next={() => {
                setCount(count + 20);
              }}
              hasMore={totalCount > filteredData.length}
              className="space-y-3"
              scrollThreshold={0.6}
              scrollableTarget={"scrollDiv"}
              loader={
                <div className="flex h-80 items-center justify-center">
                  <div className="loader"></div>
                </div>
              }
            >
              {filteredData.map((item: matchesResponse) => {
                const resultProduct =
                  safeSport === "soccer"
                    ? item.c_product.find((item: c_productObj) =>
                        item.market_id.startsWith("1_")
                      )
                    : item.c_product.find((item: c_productObj) =>
                        item.market_name.includes("Winner")
                      );

                const resultObj = {
                  event_id: item.event_id,
                  event_name: item.event_name,
                  season_name: item.season_name,
                  teamA: item.team_a?.name,
                  teamB: item.team_b?.name,
                  product_info: resultProduct || {
                    market_id: "",
                    market_name: "",
                    product: [],
                  },
                };
                return <Match key={item.event_id} match={resultObj} />;
              })}
            </InfiniteScroll>
          ) : isFetching || isLoading ? (
            <div className="flex h-80 items-center justify-center">
              <div className="loader"></div>
            </div>
          ) : (
            <div className="flex h-80 items-center justify-center">
              {t(`sports.no-events`)}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
