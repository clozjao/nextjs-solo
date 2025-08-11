import axiosBase from "./axiosBase";
import type {
  matchPayload,
  earlyMatchPayload,
  earlyLeaguePayload,
} from "@/type";

// 足球 籃球 網球 棒球 排球 rugby
export const apiOverallMatchesSportPage = (params: matchPayload) => {
  return axiosBase().get(
    `vsb/overall-matches/v3/?event_type_id=${params?.event_type_id}&start_time_type=${params?.start_time_type}&count=${params?.count}&language=${params?.lang}`
  );
};

export const apiOverallMatchesEarlyLeague = (params: earlyLeaguePayload) =>
  axiosBase().get(
    `vsb/overall-matches/v3/?event_type_id=${params?.event_type_id}&sort_type=early&language=${params?.lang}`
  );

export const apiOverallMatchesEarlyMatch = (params: earlyMatchPayload) =>
  axiosBase().get(
    `vsb/overall-matches/v3/?language=${params?.lang}&event_kind=match&league_id=${params?.league_id}&sort_type=early`
  );
