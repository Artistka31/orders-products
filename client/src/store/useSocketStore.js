import { create } from "zustand";

export const useSocketStore = create((set) => ({
  activeTabs: 0,
  setActiveTabs: (count) => set({ activeTabs: count }),
}));
