import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { matchesResponse } from "@/type";

const initialState: {
  matches: matchesResponse[];
  earlyMatchesIsFetching: boolean | null;
  earlyMatchesIsLoading: boolean | null;
} = {
  matches: [],
  earlyMatchesIsFetching: null,
  earlyMatchesIsLoading: null
};

const earlyMatchSlice = createSlice({
  name: "earlyMatch",
  initialState,
  reducers: {
    setEarlyMatch: (state, action: PayloadAction<matchesResponse[]>) => {
      state.matches = action.payload;
    },
    setEarlyMatchesIsFetching: (state, action: PayloadAction<boolean>) => {
      state.earlyMatchesIsFetching = action.payload;
    },
    setEarlyMatchesIsLoading: (state, action: PayloadAction<boolean>) => {
      state.earlyMatchesIsLoading = action.payload;
    },
    cleanEarlyMatches: state => {
      state.matches = [];
    }
  }
});

export const { setEarlyMatch, cleanEarlyMatches } = earlyMatchSlice.actions;
export default earlyMatchSlice.reducer;
