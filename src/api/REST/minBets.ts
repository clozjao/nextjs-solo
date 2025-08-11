import axiosBase from "./axiosBase";

export const apiMinBets = () =>
  axiosBase().get(
    `https://pdapi.astrophant.online/api/qrcode/v1/bet/get-min-bet/?pos_pid=Betex`
  );
