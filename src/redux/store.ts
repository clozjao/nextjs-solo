import { configureStore } from '@reduxjs/toolkit'
import matchReducer from '@/redux/reducer/matchReducer'
import componentsReducer from '@/redux/reducer/componentsReducer';
import globalSettingReducer from '@/redux/reducer/globalSettingReducer';

export const store = configureStore({
  reducer: {
    matchReducer,
    componentsReducer,
    globalSettingReducer,
  },
})

// 自動導出 RootState 與 AppDispatch 類型
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
