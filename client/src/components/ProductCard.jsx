import React from "react";

export default function ProductCard({ product }) {
  const price = product.price.find((p) => p.isDefault === 1);

  return (
    <div className="p-4 border rounded shadow bg-white">
      <h3 className="font-bold">{product.title}</h3>
      <p className="text-sm">{product.type}</p>
      <p className="text-gray-600">
        {price.value} {price.symbol}
      </p>
      <p className="text-xs text-gray-500">SN: {product.serialNumber}</p>
    </div>
  );
}
