import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface components {
  rulesOpen: boolean;
  langsOpen: boolean;
}

const initialState: components = {
  rulesOpen: false,
  langsOpen: false,
};

const matchSlice = createSlice({
  name: 'components',
  initialState,
  reducers: {
    setRulesOpen: (state, action: PayloadAction<boolean>) => {
      state.rulesOpen = action.payload;
    },
    
    setLangsOpen: (state, action: PayloadAction<boolean>) => {
      state.langsOpen = action.payload;
    },
  },
});

export const { setRulesOpen, setLangsOpen } = matchSlice.actions;
export default matchSlice.reducer;
