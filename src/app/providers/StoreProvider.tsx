"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { memo } from "react";

function StoreProvider({ children }) {
  const storeRef = useRef(store);

  return <Provider store={storeRef.current}>{children}</Provider>;
}

export default memo(StoreProvider);
