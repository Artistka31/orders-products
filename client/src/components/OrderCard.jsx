import React from "react";
import { getProductsByOrder } from "../data/data.js";
import { useStore } from "../store/useStore";
import { formatNumber } from "../utils/formatPrice.js";

import { Link } from "react-router-dom";
import getProductWord from "./ProductWord.jsx";

export default function OrderCard({ order }) {
  const deleteOrderAPI = useStore((s) => s.deleteOrderAPI);
  if (!order) return null;

  const handleDelete = async () => {
    try {
      await deleteOrderAPI(order.id);
    } catch (err) {
      console.error("Ошибка при удалении заказа:", err);
    }
  };

  const prices = order.price ?? [];

  // Count of products
  const productCount =
    order.products?.length ?? getProductsByOrder(order.id).length ?? 0;

  return (
    <div
      className="bg-white border border-zinc-300 rounded-sm shadow p-3 
    hover:bg-gray-50 transition px-3 lg:px-6"
    >
      <div className="flex flex-col sm:flex-row w-full gap-2">
        <Link
          to={`/orders/${order.id}`}
          className="grid grid-cols-[1fr_auto] grid-rows-auto gap-x-4 gap-y-2 sm:grid-cols-[minmax(90px,430px)_auto_auto_auto] sm:gap-y-0 items-start w-full"
        >
          {/* Left part — title + count */}
          <div className="col-start-1 row-start-1 min-w-0">
            <h3 className="font-semibold text-gray-400 text-sm sm:text-md wrap-break-words">
              {order.title || "Без названия"}
            </h3>
          </div>
          {/* COUNT */}

          <div className="flex items-center gap-2 text-gray-400 col-start-2 row-start-1 justify-self-end sm:col-auto sm:row-auto sm:justify-self-start">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-300 ml-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 12 12"
                fill="none"
              >
                <circle cx="1.5" cy="2" r="1.2" fill="#6B7280" />
                <circle cx="1.5" cy="6" r="1.2" fill="#6B7280" />
                <circle cx="1.5" cy="10" r="1.2" fill="#6B7280" />
                <line
                  x1="4"
                  y1="2"
                  x2="10"
                  y2="2"
                  stroke="#6B7280"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <line
                  x1="4"
                  y1="6"
                  x2="10"
                  y2="6"
                  stroke="#6B7280"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <line
                  x1="4"
                  y1="10"
                  x2="10"
                  y2="10"
                  stroke="#6B7280"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>

            <span className="flex flex-col items-start">
              <span className="font-medium text-md text-gray-500">
                {productCount}
              </span>
              <span className="text-sm text-gray-400 -mt-1.1">
                {getProductWord(productCount)}
              </span>
            </span>
          </div>

          {/* Right part — date & price */}

          <p className="col-start-1 row-start-2 sm:col-auto sm:row-auto text-xs font-semibold text-gray-400 whitespace-nowrap lg:self-center">
            {order.date}
          </p>

          {/* PRICE */}
          <p className="flex flex-col items-end leading-tight col-start-2 row-start-2 justify-self-end sm:col-auto sm:row-auto sm:justify-self-start">
            {prices.length > 0 ? (
              prices.map((p) => (
                <span
                  key={p.symbol}
                  className="text-[9px] lg:text-xs font-semibold text-gray-400"
                >
                  {formatNumber(p.value)} {p.symbol}
                </span>
              ))
            ) : (
              <span className="text-[9px] lg:text-sm text-gray-400">—</span>
            )}
          </p>
        </Link>

        <button
          className="text-gray-400 hover:text-red-700 px-2 shrink-0"
          /* onClick={() => deleteOrder(order.id)} */
          onClick={handleDelete}
        >
          {/* Bucket */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-7 0a1 1 0 
            011-1h8a1 1 0 011 1m-10 0h10"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
