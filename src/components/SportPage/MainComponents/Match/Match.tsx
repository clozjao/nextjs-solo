import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";
import type { Match, orderType } from "@/type";
import { setOrders } from "@/redux/reducer/orderReducer";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import Next from "@/assets/next.svg";

export default function Match({ match }: { match: Match }) {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector((state: RootState) => state.orderReducer.orders);
  return (
    <>
      <div className="rounded-lg bg-white px-3 py-4">
        <div className="font-body1b mb-4 break-words whitespace-normal">
          {match.season_name}
        </div>
        <div className="font-body1 mb-4 break-words whitespace-normal">
          {match.event_name}
        </div>
        <div className="overflow-hidden">
          <div className="flex divide-x-1 divide-[#b1b1b1] rounded-t-lg border-1 border-[#b1b1b1]">
            <div className="flex h-[142px] flex-1 items-center justify-center sm:h-[226px]">
              <Next className="w-[200px]" />
            </div>
            <div className="flex h-[142px] flex-1 items-center justify-center sm:h-[226px]">
              <Next className="w-[200px]" />
            </div>
          </div>
          <div className="flex divide-x-1 divide-[#b1b1b1] rounded-b-lg border-x-1 border-b-1 border-[#b1b1b1]">
            {match.product_info.product.length > 0 ? (
              match.product_info.product.map((item, index, arr) => {
                return (
                  <div
                    key={index}
                    className="font-body2b flex flex-1 cursor-pointer items-center justify-center gap-2 px-5 py-2 text-center select-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      // 設定訂單資訊
                      const orderInfo = {
                        event_id: match.event_id,
                        event_name: match.event_name,
                        market_id: match.product_info.market_id,
                        market_name: match.product_info.market_name,
                        product_name: item.product_name,
                        season_name: match.season_name,
                        product_id: item.product_id,
                        odds: item.o,
                      };
                      // 確認購物車有無相同比賽
                      const isExist = orders.some(
                        (order: orderType) =>
                          order.event_name === match.event_name &&
                          order.event_id === match.event_id
                      );
                      const newOrders = isExist
                        ? orders.map((order: orderType) => {
                            if (
                              order.event_id === match.event_id &&
                              order.event_name === match.event_name
                            ) {
                              return orderInfo;
                            }
                            return order;
                          })
                        : [orderInfo];

                      dispatch(setOrders(newOrders));
                      if (orders.length === 0) {
                        Swal.fire({
                          title: t(`message.success`),
                          text: t(`message.success-cart`),
                          icon: "success",
                          theme: "dark",
                          showConfirmButton: false,
                          timer: 1500,
                        });
                      } else {
                        Swal.fire({
                          title: t(`message.warning`),
                          text: t(`message.warning-cart`),
                          icon: "warning",
                          theme: "dark",
                          showConfirmButton: false,
                          timer: 1500,
                        });
                      }
                    }}
                  >
                    <span className="text-[#b1b1b1]">
                      {arr.length > 2
                        ? item.sub_product_name
                          ? item.sub_product_name
                          : index === 0
                          ? t(`sports.home`)
                          : index === 1
                          ? t(`sports.draw`)
                          : t(`sports.away`)
                        : item.sub_product_name
                        ? item.sub_product_name
                        : index === 0
                        ? t(`sports.home`)
                        : t(`sports.away`)}
                    </span>
                    <span>{item.o}</span>
                  </div>
                );
              })
            ) : (
              <div className="font-body2b space-x flex-1 cursor-pointer space-x-2 px-5 py-2 text-center select-none">
                {t(`sports.no-bets`)}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
