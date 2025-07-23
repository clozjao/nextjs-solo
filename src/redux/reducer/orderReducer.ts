import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface OrderState {
  orders: [];
}

const initialState: OrderState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<[]>) => {
      state.orders = action.payload;
    },
  },
});

export const { setOrders } = orderSlice.actions;
export default orderSlice.reducer;
