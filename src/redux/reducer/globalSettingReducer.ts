import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Rule, globalComponents } from "@/type";

const initialState: globalComponents = {
  language: "en",
  langDisplay: "English",
  rules: [],
};

const globalSetting = createSlice({
  name: "components",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setLangDisplay: (state, action: PayloadAction<string>) => {
      state.langDisplay = action.payload;
    },
    setRules: (state, action: PayloadAction<Rule[]>) => {
      state.rules = action.payload;
    },
  },
});

export const { setLanguage, setLangDisplay, setRules } = globalSetting.actions;
export default globalSetting.reducer;
