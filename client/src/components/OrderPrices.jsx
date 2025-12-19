import React from "react";

export default function calculateOrderPrices(products = []) {
  const map = {};

  products.forEach((p) => {
    if (!p.price) return;

    p.price.forEach(({ value, symbol }) => {
      map[symbol] = (map[symbol] || 0) + Number(value || 0);
    });
  });

  return Object.entries(map).map(([symbol, value]) => ({
    symbol,
    value,
  }));
}
