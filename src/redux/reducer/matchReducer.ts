import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface MatchState {
  matches: [];
  qrCode: string;
  qrCodeOpen: boolean;
}

const initialState: MatchState = {
  matches: [],
  qrCode: '',
  qrCodeOpen: false,
};

const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    setMatches: (state, action: PayloadAction<[]>) => {
      state.matches = action.payload;
    },
    setQrCode: (state, action: PayloadAction<string>) => {
      state.qrCode = action.payload;
    },
    setQrCodeOpen: (state, action: PayloadAction<boolean>) => {
      state.qrCodeOpen = action.payload;
    },
  },
});

export const { setMatches, setQrCode, setQrCodeOpen } = matchSlice.actions;
export default matchSlice.reducer;
