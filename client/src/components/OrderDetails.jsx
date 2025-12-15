import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../store/useStore";
import ProductsList from "./ProductsList";

export default function OrderDetails() {
  const { id } = useParams();
  const orders = useStore((s) => s.orders);
  const order = orders.find((o) => o.id === Number(id));

  const [typeFilter, setTypeFilter] = useState("");
  const [specFilter, setSpecFilter] = useState("");

  if (!order) return <p className="ml-14">Приход не найден</p>;

  const productTypes = [
    ...new Set(
      order.products
        .map((p) => (p.type || "").trim().toLowerCase())
        .filter(Boolean)
    ),
  ];

  const productSpecs = [
    ...new Set(
      order.products
        .map((p) => (p.spec || "").trim().toLowerCase())
        .filter(Boolean)
    ),
  ];

  // Filtration
  const filteredProducts = useMemo(() => {
    return order.products.filter((p) => {
      const typeOk = typeFilter
        ? (p.type || "").toLowerCase() === typeFilter.toLowerCase()
        : true;

      const specOk = specFilter
        ? (p.spec || "").toLowerCase() === specFilter.toLowerCase()
        : true;

      return typeOk && specOk;
    });
  }, [order.products, typeFilter, specFilter]);

  return (
    <div className="w-full mt-20 lg:mt-28">
      {/* Top panel + filters */}
      <div className="px-14 mb-6 lg:mb-14 flex flex-col md:flex-row md:items-center gap-6">
        {/* Title */}
        <h2 className="text-center text-neutral-800 font-medium text-xl">
          Продукты / {filteredProducts.length}
        </h2>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          {/* Tipe */}
          <label className="flex flex-col lg:flex-row items-start lg:items-center text-xs text-gray-500 gap-2">
            <span className="text-neutral-400 font-medium">Тип:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-white border border-gray-300 font-medium text-gray-700 rounded px-3 py-1 text-xs w-full lg:min-w-[230px]"
            >
              <option value="">Все</option>
              {productTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>

          {/* Specification */}
          <label className="flex flex-col lg:flex-row items-start lg:items-center text-xs text-gray-500 gap-2">
            <span className="text-neutral-400 font-medium">Спецификация:</span>
            <select
              value={specFilter}
              onChange={(e) => setSpecFilter(e.target.value)}
              className="bg-white border border-gray-300 font-medium text-gray-700 rounded px-3 py-1 text-xs w-full lg:min-w-[230px]"
            >
              <option value="">Все</option>
              {productSpecs.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <ProductsList products={filteredProducts} />
    </div>
  );
}
