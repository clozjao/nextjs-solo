import Orders from "@/assets/orders.svg";
import Remove from "@/assets/remove.svg";
// import Delete from "@/assets/delete.svg?react";
import type { AppDispatch, RootState } from "@/redux/store";
import type { orderType, ordersPayloadType } from "@/type";
import { useDispatch, useSelector } from "react-redux";
import { setQrCode } from "@/redux/reducer/matchReducer";
import { useQuery } from "@tanstack/react-query";
import { apiMinBets } from "@/api/REST/minBets";
import { useEffect, useState } from "react";
import { cleanOrders } from "@/redux/reducer/orderReducer";
import { apiGenerateQrCode } from "@/api/REST/generateQrCode";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

export default function Order({
  setOpenOrder,
}: {
  setOpenOrder: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { t } = useTranslation();
  const [minBets, setMinBets] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");
  const [debouncedValue, setDebouncedValue] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector((state: RootState) => state.orderReducer.orders);
  const [payloadState, setPayloadState] = useState<ordersPayloadType | null>(
    null
  );

  const { data } = useQuery({
    queryKey: ["repoData", "minBets"],
    queryFn: () => apiMinBets().then((res) => res.data),
    staleTime: Infinity,
    retry: false,
  });

  useEffect(() => {
    if (!data) return;
    setMinBets(data.min_bet);
    setInputValue(data.min_bet.toString());
  }, [data]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 500); // 延遲 500 毫秒後才更新

    return () => {
      clearTimeout(handler); // 清除上一次的 timeout
    };
  }, [inputValue]);

  const { data: qrCodeData } = useQuery({
    queryKey: ["repoData", "qrCode", payloadState],
    queryFn: () => apiGenerateQrCode(payloadState).then((res) => res.data),
    staleTime: Infinity,
    retry: false,
    enabled: !!payloadState,
  });

  useEffect(() => {
    if (!qrCodeData) return;
    dispatch(setQrCode(qrCodeData.order_code));
  }, [qrCodeData, dispatch]);

  return (
    <div className="h-full space-y-6 bg-white p-4 xl:rounded-xl">
      <div>
        <div className="flex items-center justify-between px-3 py-4 xl:px-0">
          <div className="flex items-center gap-2">
            <Orders className="h-5 w-5" />
            <h2 className="text-base font-bold">{t(`order.order`)}</h2>
          </div>
          {/* <span className="font-body1 text-neutrals-900">Balance 0</span> */}
        </div>

        <hr className="h-[1px] border-none bg-gray-300" />
      </div>

      <div className="flex items-center justify-between font-semibold">
        <div className="font-body1b flex items-center gap-2">
          {t(`order.single`)}
          <span className="bg-neutrals-900 font-body2 inline-block rounded-[100px] px-[7px] py-[1px] text-center text-white">
            {orders.length}
          </span>
        </div>

        <div
          className="flex items-center gap-2"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(cleanOrders());
          }}
        >
          <Remove className="h-5 w-5" />
          <button className="font-caption text-neutrals-900">
            {t(`button.delete`)}
          </button>
        </div>
      </div>

      <div className="h-[calc(100%-230px)] space-y-4 overflow-auto">
        {orders.length > 0 ? (
          orders.map((item: orderType) => (
            <div
              key={item.event_id}
              className="space-y-4 rounded-lg border p-3"
            >
              <div className="flex justify-between">
                <span className="font-body1b">{item.product_name}</span>
                {/* <button className="rounded-[100px] border-1 p-1">
                <Delete className="h-3 w-3" />
              </button> */}
              </div>
              <div className="space-y-2">
                <div className="font-body2">{item.event_name}</div>
                <div className="font-caption text-neutrals-500">
                  {item.season_name}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>{t(`order.min-bet`)}</span>
                  <span>{minBets}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>{t(`order.to-win`)}</span>
                  <span>
                    {Math.round((+inputValue * item.odds - +inputValue) * 100) /
                      100}
                  </span>
                </div>
              </div>
              <input
                type="number"
                min={0}
                max={100000}
                inputMode="decimal"
                placeholder="Enter"
                value={inputValue}
                className="bg-neutrals-200 font-body2 custom-placeholder w-full rounded px-4 py-3"
                onChange={(e) => {
                  e.stopPropagation();
                  const value = e.target.value;
                  // 允許清空或符合數字格式
                  if (value === "" || /^\d*\.?\d*$/.test(value)) {
                    setInputValue(value); // 存為字串
                  }
                }}
              />

              <div className="font-body2 flex items-center justify-between">
                {item.market_name.toLowerCase()} {t(`order.total`)}
                <span className="font-h5">{item.odds}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center">
            <span>{t(`message.cart-empty1`)}</span>
            <span>{t(`message.cart-empty2`)}</span>
          </div>
        )}
      </div>
      <div className="relative">
        {/* <div className="mb-4 flex items-center gap-2 text-xs">
          <input type="checkbox" id="accept" className="peer hidden" />
          <label
            htmlFor="accept"
            className="flex h-5 w-5 items-center justify-center rounded-full border border-black peer-checked:bg-black peer-checked:after:top-[2px] peer-checked:after:block peer-checked:after:h-3 peer-checked:after:w-1.5 peer-checked:after:rotate-45 peer-checked:after:border-[2px] peer-checked:after:border-t-0 peer-checked:after:border-l-0 peer-checked:after:border-white peer-checked:after:content-['']"
          />
          <label htmlFor="accept" className="font-body2 select-none">
            Accept Any Odds Changes
          </label>
        </div> */}

        <button
          className={`font-body1 my-5 w-full rounded ${
            +inputValue >= minBets && orders.length > 0
              ? "bg-black"
              : "bg-[rgb(196,196,196)]"
          } py-2 text-white hover:opacity-90`}
          onClick={(e) => {
            e.stopPropagation();

            if (!debouncedValue || !orders.length || +debouncedValue < minBets)
              return;
            const payload = {
              payload: [
                {
                  quantity: debouncedValue,
                  selections: [
                    {
                      event_id: orders[0].event_id,
                      market_id: orders[0].market_id,
                      product_id: orders[0].product_id,
                    },
                  ],
                },
              ],
              token: process.env.NEXT_PUBLIC_DEFAULT_TOKEN,
            };
            setPayloadState(payload);
            setOpenOrder(false);
            dispatch(cleanOrders());
            Swal.fire({
              icon: "success",
              title: t(`message.success`),
              text: t(`message.success-place`),
              theme: "dark",
              timer: 1500,
              showConfirmButton: false,
            });
          }}
        >
          {t(`button.submit`)}
        </button>
        {+inputValue < minBets && (
          <div className="absolute top-0 flex w-full justify-center">
            <div className="right-0 rounded-[3px] border-2 border-[rgb(159,31,37)] bg-white px-4 text-xs text-[rgb(159,31,37)]">
              {t(`message.cart-min-bet`)} {minBets}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
