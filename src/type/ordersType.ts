export interface orderType {
  event_id: string;
  event_name: string;
  market_id: string;
  market_name: string;
  product_id: string;
  product_name: string;
  season_name: string;
  odds: number;
}

export interface ordersPayloadType {
  payload: Array<{
    quantity: string;
    selections: Array<{
      event_id: string;
      market_id: string;
      product_id: string;
    }>;
  }>;

  token: string;
}
