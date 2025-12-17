import React from "react";
import { useStore } from "../store/useStore";
import ConfirmModal from "./ConfirmModal";
import { useState } from "react";

export default function ProductRow({ product }) {
  const deleteProductAPI = useStore((s) => s.deleteProductAPI);
  const updateProductStatusAPI = useStore((s) => s.updateProductStatusAPI);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    deleteProductAPI(product.id);
    setIsModalOpen(false);
  };

  return (
    <>
      <tr className="hidden lg:table-row border-t border-b border-gray-300 hover:bg-gray-50">
        {/* STATUS DOT */}
        <td className="px-8 py-2 align-middle w-6">
          <span
            className={`w-2 h-2 inline-block rounded-full ${
              product.status === "Свободен" ? "bg-lime-300" : "bg-gray-600"
            }`}
          />
        </td>

        {/* ICON */}
        <td className="pr-5 py-2 align-middle w-15">
          <img
            src={product.photo || "/img/monitor.png"}
            alt={product.name}
            className="w-10 h-10 object-cover rounded"
          />
        </td>

        {/* NAME */}
        <td className="px-2 py-2 text-sm font-semibold text-gray-700 wrap-break-words">
          {product.name}
        </td>

        {/* STATUS */}
        <td
          className={`px-2 py-2 text-sm font-semibold w-30 align-middle outline-none border-none whitespace-nowrap ${
            product.status === "Свободен" ? "text-lime-300" : "text-gray-600"
          }`}
        >
          <select
            className="appearance-none font-semibold text-sm border-none outline-0"
            value={product.status}
            onChange={(e) => updateProductStatusAPI(product.id, e.target.value)}
          >
            <option>Свободен</option>
            <option>В ремонте</option>
          </select>
        </td>

        {/* DELETE */}
        <td className="pr-10 pl-2 py-2 text-right align-middle w-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-gray-400 hover:text-red-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
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
        </td>
      </tr>

      {/* MOBILE + TABLET */}
      <div className="block lg:hidden">
        <div className="bg-white border-t border-gray-300 p-3">
          {/* TOP */}
          <div className="flex items-center gap-4 mb-2">
            {/* STATUS DOT */}
            <span
              className={`w-2 h-2 rounded-full ${
                product.status === "Свободен" ? "bg-lime-300" : "bg-gray-600"
              }`}
            />

            {/* ICON */}
            <img
              src={product.photo || "/img/monitor.png"}
              alt={product.name}
              className="w-10 h-10 object-cover rounded"
            />

            {/* NAME */}
            <h3 className="font-semibold text-sm text-gray-700 flex-1 wrap-break-words">
              {product.name}
            </h3>

            {/* DELETE */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-gray-400 hover:text-red-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6"
                />
              </svg>
            </button>
          </div>

          {/* STATUS */}
          <div className="flex items-center justify-end text-sm">
            <select
              className={`appearance-none font-semibold bg-transparent ${
                product.status === "Свободен"
                  ? "text-lime-300"
                  : "text-gray-600"
              }`}
              value={product.status}
              onChange={(e) =>
                updateProductStatusAPI(product.id, e.target.value)
              }
            >
              <option>Свободен</option>
              <option>В ремонте</option>
            </select>
          </div>
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
