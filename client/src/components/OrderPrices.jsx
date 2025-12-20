import React from "react";

export default function calculateOrderPrices(products = []) {
  const map = {};

  products.forEach((p) => {
    if (!Array.isArray(p.price)) return;

    p.price.forEach((item) => {
      if (!item) return;

      const value = Number(item.value);
      const symbol = item.symbol;

      if (!symbol || isNaN(value)) return;

      map[symbol] = (map[symbol] || 0) + value;
    });
  });

  return Object.entries(map).map(([symbol, value]) => ({
    symbol,
    value,
  }));
}
