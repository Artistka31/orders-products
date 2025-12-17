import React from "react";
import { useState } from "react";
import { useStore } from "../store/useStore";
import ConfirmModal from "./ConfirmModal";
import { formatNumber } from "../utils/formatPrice.js";

export default function ProductCard({ product }) {
  const deleteProductAPI = useStore((s) => s.deleteProductAPI);
  const updateProductFieldAPI = useStore((s) => s.updateProductFieldAPI);

  const orders = useStore((s) => s.orders);

  const order = orders.find((o) => o.id === product.orderId);
  const orderName = order?.title || "—";

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    await deleteProductAPI(product.id);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="px-4 sm:px-14">
        <div className="bg-white border border-zinc-300 rounded-sm shadow p-3 hover:bg-gray-50 transition flex flex-col sm:flex-row items-start sm:items-center gap-6 overflow-x-auto">
          {/* ICON */}
          <div className="flex items-center gap-6 shrink-0 ml-2 lg:ml-4">
            {/* STATUS DOT */}
            <span
              className={`w-2 h-2 rounded-full ${
                product.status === "Свободен" ? "bg-(--text)" : "bg-gray-600"
              }`}
            ></span>

            {/* PHOTO */}
            <div className="w-8 h-8 flex items-center justify-center">
              <img
                src={product.photo || "/img/monitor.png"}
                alt={product.name}
                className="w-10 h-10 object-cover rounded"
              />
            </div>
          </div>

          {/* PRODUCT NAME */}
          <h3 className="min-w-[150px] sm:min-w-[350px] font-semibold text-gray-700 text-sm sm:text-md wrap- className={`appearance-none min-w-[130px] sm:min-w-[150px] font-semibold text-sm border-none outline-nonebreak-words flex-1">
            {product.name}
          </h3>

          <select
            className={`appearance-none min-w-[130px] font-semibold text-sm border-none outline-0 text-left lg:text-center ${
              product.status === "Свободен" ? "text-(--text)" : "text-gray-600"
            }`}
            value={product.status}
            onChange={async (e) => {
              const newStatus = e.target.value;

              await updateProductFieldAPI(product.id, "status", newStatus);

              if (newStatus === "Свободен") {
                await updateProductFieldAPI(product.id, "condition", "Новый");
                await updateProductFieldAPI(product.id, "spec", "Новый");
              } else {
                await updateProductFieldAPI(product.id, "condition", "Б/У");
                await updateProductFieldAPI(product.id, "spec", "Б/У");
              }
            }}
          >
            <option>Свободен</option>
            <option>В ремонте</option>
          </select>

          {/* DATE FROM-TO */}
          <div className="flex flex-col w-32 sm:w-40 shrink-0 text-xs sm:text-sm text-gray-500">
            <div className="flex items-center justify-start lg:justify-center w-full">
              <span className="shrink-0 w-4 text-left mr-1">с</span>
              <span className="truncate">{product.dateFrom || "—"}</span>
            </div>
            <div className="flex items-center justify-start lg:justify-center w-full">
              <span className="shrink-0 w-4 text-left mr-1">по</span>
              <span className="truncate">{product.dateTo || "—"}</span>
            </div>
          </div>

          <select
            className="appearance-none min-w-[130px] sm:min-w-[150px] font-semibold text-sm border-none outline-0 text-gray-500 text-left lg:text-center"
            value={product.condition || "новый"}
            onChange={(e) => {
              updateProductFieldAPI(product.id, "condition", "Новый");
              updateProductFieldAPI(product.id, "spec", "Новый");
            }}
          >
            <option>новый</option>
            <option>Б/У</option>
          </select>

          <p className="w-20 sm:w-24 flex flex-col items-start text-gray-400 text-xs font-medium leading-tight shrink-0">
            {Array.isArray(product.price) && product.price.length > 0
              ? product.price.map((p) => (
                  <span key={p.symbol}>
                    {formatNumber(p.value)} {p.symbol}
                  </span>
                ))
              : "—"}
          </p>

          {/* GROUP NAME */}
          <p className="min-w-[120px] sm:min-w-[220px] text-gray-600 text-sm wrap-break-worlds">
            {product.groupName ? product.groupName : "—"}
          </p>

          {/*  USER FullName */}
          <p className="min-w-[120px] sm:min-w-[220px] text-left lg:text-center text-gray-600 text-sm wrap-break-worlds">
            {product.userFullName || "—"}
          </p>

          {/* ORDER NAME */}
          <p className="min-w-[120px] sm:min-w-[220px] text-gray-600 text-sm wrap-break-worlds">
            {orderName || "—"}
          </p>

          {/* ORDER DATE */}
          <p className="min-w-[100px] text-gray-400 text-xs sm:text-sm shrink-0 text-left lg:text-center">
            {product.orderDate || "—"}
          </p>

          {/* DELETE BUTTON */}
          <button
            className="text-gray-400 hover:text-red-700 shrink-0 px-2 mr-0 lg:mr-4 mt-2 sm:mt-0 self-end sm:self-center"
            onClick={() => setIsModalOpen(true)}
          >
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
      {/* Modal */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        product={product}
      />
    </>
  );
}
