import React from "react";
import { Link } from "react-router-dom";

export default function OrderCard({ order }) {
  return (
    <Link
      to={`/orders/${order.id}`}
      className="block p-4 border rounded-lg shadow hover:bg-gray-100 transition"
    >
      <h3 className="text-xl font-semibold">{order.title}</h3>
      <p className="text-gray-600">{order.date}</p>
      <p className="text-gray-500">{order.description}</p>
      <p className="mt-2 text-sm text-blue-600">
        Products: {order.products.length}
      </p>
    </Link>
  );
}
