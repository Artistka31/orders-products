import {
  orders as initialOrders,
  products as initialProducts,
} from "../data/data";

// Transform initial products by grouping them inside each order
export function prepareOrders() {
  return initialOrders.map((order) => ({
    ...order,
    products: initialProducts
      .filter((p) => p.order === order.id)
      .map((p) => ({
        id: p.id,
        orderId: order.id,
        name: p.title,
        status: "Свободен", // default
        dateFrom: null,
        dateTo: null,
        price: p.price.find((pr) => pr.isDefault === 1) || p.price[0],
        groupName: p.type,
        userFullName: "—",
        orderName: order.title,
        orderDate: order.date,
      })),
  }));
}
