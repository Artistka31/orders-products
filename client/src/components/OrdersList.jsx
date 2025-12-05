import React from "react";
import { useEffect } from "react";
import { useStore } from "../store/useStore";
import { orders, products } from "../data/data";
import OrderCard from "./OrderCard";
import "animate.css";

export default function OrdersList() {
  const setOrders = useStore((s) => s.setOrders);
  const setProducts = useStore((s) => s.setProducts);

  useEffect(() => {
    setOrders(orders);
    setProducts(products);
  }, []);

  const list = useStore((s) => s.orders);

  return (
    <div className="p-6 animate__animated animate__fadeIn">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>

      <div className="grid gap-4">
        {list.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
