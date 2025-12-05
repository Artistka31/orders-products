import React from "react";
import ProductCard from "./ProductCard";

export default function ProductsList({ products }) {
  return (
    <div className="grid gap-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
