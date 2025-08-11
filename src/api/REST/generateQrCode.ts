import axiosBase from "./axiosBase";

type payloadType = {
  payload: Array<{
    quantity: string;
    selections: Array<{
      event_id: string;
      market_id: string;
      product_id: string;
    }>;
  }>;

  token: string;
};

export const apiGenerateQrCode = (payload: payloadType | null) =>
  axiosBase().post(
    `https://pdapi.astrophant.online/api/qrcode/v1/bet/generate-qr-code/?pos_pid=Betex`,
    payload
  );
