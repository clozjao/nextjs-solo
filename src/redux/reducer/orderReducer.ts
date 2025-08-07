import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { orderType } from "@/type";

const initialState: { orders: orderType[] } = {
  orders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<orderType[]>) => {
      state.orders = action.payload;
    },
    cleanOrders: (state) => {
      state.orders = [];
    },
  },
});

export const { setOrders, cleanOrders } = orderSlice.actions;
export default orderSlice.reducer;
