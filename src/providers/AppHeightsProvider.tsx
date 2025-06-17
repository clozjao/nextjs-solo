"use client";

import { useAppHeights } from "@/hooks/useAppHeight";

export default function AppHeightsProvider({ children }) {
  useAppHeights();
  return children;
}
