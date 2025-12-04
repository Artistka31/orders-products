import { create } from "zustand";

export const useStore = create((set) => ({
  orders: [],
  products: [],
  activeTabs: 0,
  setOrders: (orders) => set({ orders }),
  setProducts: (products) => set({ products }),
  setActiveTabs: (count) => set({ activeTabs: count }),
}));
