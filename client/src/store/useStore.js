import { create } from "zustand";
/* import { persist } from "zustand/middleware"; */
/* import { prepareOrders } from "./prepareData"; */
import { api } from "../api/api";

// Create groups based on orders
function generateGroupsFromOrders(orders) {
  return orders.map((order) => ({
    id: order.id, // group id = order id
    orderId: order.id,
    title: order.title,
    orderDate: order.date,
  }));
}

export const useStore = create(
  /*  persist( */
  (set, get) => ({
    // STATE
    orders: [], // global array for Orders page
    products: [], // global array for ProductPanel
    groups: [],

    // ORDERS
    // Add new order

    addOrder: (data = {}) =>
      set((state) => {
        const current = state.orders;
        const newId = current.length + 1;

        const newOrder = {
          id: Date.now(),
          title: data.title || `Приход ${newId}`,
          date: data.date || new Date().toISOString().slice(0, 10),
          products: [],
        };

        const updatedOrders = [...current, newOrder];

        return {
          orders: updatedOrders,
          groups: generateGroupsFromOrders(updatedOrders),
        };
      }),

    // Delete order by id
    deleteOrder: (id) =>
      set(() => {
        const updatedOrders = get().orders.filter((o) => o.id !== id);
        return {
          orders: updatedOrders,
          groups: generateGroupsFromOrders(updatedOrders),
        };
      }),

    // Update order
    updateOrder: (id, data) =>
      set(() => {
        const updatedOrders = get().orders.map((o) =>
          o.id === id ? { ...o, ...data } : o
        );
        return {
          orders: updatedOrders,
          groups: generateGroupsFromOrders(updatedOrders),
        };
      }),

    setOrders: (orders = []) =>
      set(() => ({
        orders,
        groups: generateGroupsFromOrders(orders),
        products: orders.flatMap((o) => o.products || []),
      })),

    // PRODUCTS
    addProductToGroupAndOrder: (orderId, groupId, data) => {
      const newProduct = {
        id: crypto.randomUUID(),
        orderId,
        groupId,
        name: data.name ?? "Без названия",
        status: data.status ?? "Свободен",
        type: data.type ?? "",
        spec: data.spec ?? "Новый",
        condition: data.spec ?? "Новый",
        dateFrom: data.dateFrom ?? new Date().toLocaleDateString(),
        dateTo: data.dateTo ?? new Date().toLocaleDateString(),
        price: data.price ?? null,
        userFullName: data.userFullName ?? "—",
        photo: data.photo ?? null,
        orderName: data.title ?? `Приход ${orderId}`,
        orderDate: data.date ?? new Date().toISOString().slice(0, 10),
        groupName: data.groupName ?? "—",
      };

      return set((state) => ({
        orders: state.orders.map((o) =>
          o.id === orderId ? { ...o, products: [...o.products, newProduct] } : o
        ),
        products: [...state.products, newProduct],
      }));
    },

    deleteProduct: (productId) =>
      set((state) => ({
        orders: state.orders.map((o) => ({
          ...o,
          products: o.products.filter((p) => p.id !== productId),
        })),
        products: state.products.filter((p) => p.id !== productId),
      })),

    updateProductStatus: (productId, status) =>
      set((state) => ({
        orders: state.orders.map((o) => ({
          ...o,
          products: o.products.map((p) =>
            p.id === productId ? { ...p, status } : p
          ),
        })),
        products: state.products.map((p) =>
          p.id === productId ? { ...p, status } : p
        ),
      })),

    updateProductField: (productId, field, value) =>
      set((state) => ({
        orders: state.orders.map((o) => ({
          ...o,
          products: o.products.map((p) =>
            p.id === productId ? { ...p, [field]: value } : p
          ),
        })),
        products: state.products.map((p) =>
          p.id === productId ? { ...p, [field]: value } : p
        ),
      })),

    getProductsByGroup: (groupId) =>
      get().products.filter((p) => p.groupId === groupId),

    searchQuery: "",
    setSearchQuery: (q) => set({ searchQuery: q }),

    loadOrders: async () => {
      const { data } = await api.get("/orders");
      set({
        orders: data,
        groups: generateGroupsFromOrders(data),
        products: data.flatMap((o) => o.products),
      });
    },

    addOrderAPI: async (payload) => {
      const { data } = await api.post("/orders", payload);
      set((state) => {
        const updated = [...state.orders, data];
        return {
          orders: updated,
          groups: generateGroupsFromOrders(updated),
        };
      });
    },

    deleteOrderAPI: async (id) => {
      await api.delete(`/orders/${id}`);

      set((state) => {
        const updatedOrders = state.orders.filter((o) => o.id !== id);

        return {
          orders: updatedOrders,
          groups: generateGroupsFromOrders(updatedOrders),
          products: state.products.filter((p) => p.orderId !== id),
        };
      });
    },

    addProductAPI: async (orderId, payload) => {
      const { data } = await api.post(`/orders/${orderId}/products`, payload);

      set((state) => ({
        orders: state.orders.map((o) =>
          o.id === orderId ? { ...o, products: [...o.products, data] } : o
        ),
        products: [...state.products, data],
      }));
    },

    // DELETE product via API
    deleteProductAPI: async (productId) => {
      await api.delete(`/products/${productId}`);

      set((state) => ({
        orders: state.orders.map((o) => ({
          ...o,
          products: o.products.filter((p) => p.id !== productId),
        })),
        products: state.products.filter((p) => p.id !== productId),
      }));
    },

    // UPDATE product field via API
    updateProductFieldAPI: async (productId, field, value) => {
      const { data } = await api.put(`/products/${productId}`, {
        field,
        value,
      });

      set((state) => ({
        orders: state.orders.map((o) => ({
          ...o,
          products: o.products.map((p) =>
            p.id === productId ? { ...p, [field]: data[field] } : p
          ),
        })),
        products: state.products.map((p) =>
          p.id === productId ? { ...p, [field]: data[field] } : p
        ),
      }));
    },
    updateProductStatusAPI: async (productId, status) => {
      const { data } = await api.put(`/products/${productId}`, {
        field: "status",
        value: status,
      });

      set((state) => ({
        orders: state.orders.map((o) => ({
          ...o,
          products: o.products.map((p) =>
            p.id === productId ? { ...p, status: data.status } : p
          ),
        })),
        products: state.products.map((p) =>
          p.id === productId ? { ...p, status: data.status } : p
        ),
      }));
    },
  }),
  { name: "warehouse-store" }
);
/* ); */
