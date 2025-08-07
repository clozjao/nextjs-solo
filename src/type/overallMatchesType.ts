export interface matchPayload {
  event_type_id?: string;
  start_time_type?: string;
  lang?: string;
  count?: number;
}

export interface earlyLeaguePayload {
  event_type_id?: string;
  lang?: string;
}

export interface earlyMatchPayload {
  lang?: string;
  league_id?: string;
}

export interface matchesResponse {
  event_id: string;
  event_name: string;
  season_name: string;
  team_a: {
    name: string;
  };
  team_b: {
    name: string;
  };
  c_product: c_productObj[];
}

export interface c_productObj {
  market_name: string;
  market_id: string;
  product: OneXTwoProduct[];
}

interface OneXTwoProduct {
  product_id: string;
  product_name: string;
  status: string;
  sub_product_name: string;
  o: number;
}

export interface earlyLeague {
  type: string;
  node_msg: {
    id: string;
    name: string;
    path: string;
  };
  match_pointer: Array<number>;
}

export interface Match {
  event_id: string;
  event_name: string;
  season_name: string;
  teamA: string;
  teamB: string;
  product_info: c_productObj;
}
