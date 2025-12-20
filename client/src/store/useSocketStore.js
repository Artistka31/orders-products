import { create } from "zustand";

export const useSocketStore = create((set) => ({
  activeTabs: null,
  setActiveTabs: (count) => set({ activeTabs: count }),
}));
