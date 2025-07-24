import Orders from "@/assets/orders.svg";
import Remove from "@/assets/remove.svg";
import Delete from "@/assets/delete.svg";
import type { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

import { setQrCode } from "@/redux/reducer/matchReducer";

export default function Order({
  setOpenOrder,
}: {
  setOpenOrder: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector((state: RootState) => state.orderReducer.orders);

  return (
    <div className="h-full space-y-6 bg-white p-4 xl:rounded-xl">
      <div>
        <div className="flex items-center justify-between px-3 py-4 xl:px-0">
          <div className="flex items-center gap-2">
            <Orders className="h-5 w-5" />
            <h2 className="text-base font-bold">Order</h2>
          </div>
          <span className="font-body1 text-neutrals-900">Balance 0</span>
        </div>

        <hr className="h-[1px] border-none bg-gray-300" />
      </div>

      <div className="flex items-center justify-between font-semibold">
        <div className="font-body1b flex items-center gap-2">
          SINGLE
          <span className="bg-neutrals-900 font-body2 inline-block rounded-[100px] px-[7px] py-[1px] text-center text-white">
            {orders.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Remove className="h-5 w-5" />
          <button className="font-caption text-neutrals-900">Remove all</button>
        </div>
      </div>

      <div className="h-[calc(100%-220px)] space-y-4 overflow-y-auto">
        {orders.map((item: any) => (
          <div key={item.id} className="space-y-4 rounded-lg border p-3">
            <div className="flex justify-between">
              <span className="font-body1b">{`${item.oddsType} ${item.odds}`}</span>
              <button className="rounded-[100px] border-1 p-1">
                <Delete className="h-3 w-3" />
              </button>
            </div>
            <div className="space-y-2">
              <div className="font-body2">{item.matchName}</div>
              <div className="font-caption text-neutrals-500">
                Premier League
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Min Bet</span>
                <span>0</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>To win</span>
                <span>0</span>
              </div>
            </div>
            <input
              type="text"
              placeholder="Enter"
              className="bg-neutrals-200 font-body2 custom-placeholder w-full rounded px-4 py-3"
            />

            <div className="font-body2 flex items-center justify-between">
              Over/Under Total <span className="font-h5">1.9(EU)</span>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className="flex items-center gap-2 text-xs">
          <input type="checkbox" id="accept" className="peer hidden" />
          <label
            htmlFor="accept"
            className="flex h-5 w-5 items-center justify-center rounded-full border border-black peer-checked:bg-black peer-checked:after:top-[2px] peer-checked:after:block peer-checked:after:h-3 peer-checked:after:w-1.5 peer-checked:after:rotate-45 peer-checked:after:border-[2px] peer-checked:after:border-t-0 peer-checked:after:border-l-0 peer-checked:after:border-white peer-checked:after:content-['']"
          />
          <label htmlFor="accept" className="font-body2 select-none">
            Accept Any Odds Changes
          </label>
        </div>

        <button
          className="font-body1 my-4 w-full rounded bg-black py-2 text-white hover:opacity-90"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setQrCode("qrCodeTest"));
            setOpenOrder(false);
          }}
        >
          Place Bet
        </button>
      </div>
    </div>
  );
}
