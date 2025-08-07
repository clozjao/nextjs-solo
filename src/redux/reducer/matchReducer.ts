import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { qrCodeType } from "@/type";

const initialState: qrCodeType = {
  qrCode: "",
  qrCodeOpen: false,
};

const matchSlice = createSlice({
  name: "match",
  initialState,
  reducers: {
    setQrCode: (state, action: PayloadAction<string>) => {
      state.qrCode = action.payload;
    },
    setQrCodeOpen: (state, action: PayloadAction<boolean>) => {
      state.qrCodeOpen = action.payload;
    },
  },
});

export const { setQrCode, setQrCodeOpen } = matchSlice.actions;
export default matchSlice.reducer;
