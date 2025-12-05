import React from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../store/useStore";
import ProductsList from "./ProductsList";
import "animate.css";

export default function OrderDetails() {
  const { id } = useParams();
  const orders = useStore((s) => s.orders);

  const order = orders.find((o) => o.id === Number(id));

  if (!order) return <div>Not found</div>;

  return (
    <div className="p-6 animate__animated animate__fadeIn">
      <h2 className="text-2xl font-bold mb-2">{order.title}</h2>
      <p className="text-gray-600 mb-4">{order.date}</p>

      <ProductsList products={order.products} />
    </div>
  );
}
