import React from "react";
import { createPortal } from "react-dom";
import { useState } from "react";

export default function ConfirmModal({ isOpen, onClose, onConfirm, product }) {
  if (!isOpen) return null;

  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 400); // time = slideDown
  };
  const handleConfirm = () => {
    setClosing(true);

    setTimeout(async () => {
      try {
        await onConfirm(); // API
        onClose();
      } catch (e) {
        console.error(e);
        setClosing(false);
      }
    }, 400);
  };

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center lg:ml-48 z-50">
      <div
        onClick={handleClose}
        className={`absolute inset-0 bg-black/40
          ${closing ? "animate-fadeOut" : "animate-fadeIn"}
        `}
      />

      {/* Panel */}
      <div
        className={`relative w-full sm:w-150  mx-4 sm:mx-0 rounded-sm shadow-xl z-10 bg-white animate-slideUp sm:animate-fadeIn  ${
          closing ? "animate-slideDown" : "animate-slideUp sm:animate-fadeIn"
        }
        `}
      >
        {/* Close button on top  */}
        <button
          onClick={handleClose}
          className="
        absolute -top-4 -right-4
        w-8 h-8 flex items-center justify-center
        rounded-full border border-gray-100
        bg-white text-gray-400 text-xs
        hover:bg-(--text) hover:text-white
        transition z-20
      "
        >
          ✕
        </button>
        {/* Top part: white */}
        <div className="bg-white flex flex-col py-4 text-center">
          <h3 className=" px-2 lg:px-4 text-sm sm:text-lg flex flex-start lg:ml-4 font-semibold text-gray-700">
            Вы уверены, что хотите удалить этот приход?
          </h3>

          <div className="mt-5 border-t border-gray-200 flex items-center justify-start px-3 lg:px-8 gap-3 lg:gap-9">
            <span
              className={`w-1.5 h-1.5 lg:w-2 lg:h-2 inline-block rounded-full ${
                product.status === "Свободен" ? "bg-lime-300" : "bg-gray-600"
              }`}
            />
            <img
              src={product.photo || "/img/monitor.png"}
              alt={product.name}
              className="w-7 lg:w-10 h-7 lg:h-10 object-cover rounded"
            />
            <span className="text-xs lg:text-md font-semibold text-gray-500">
              {product.name}
            </span>
          </div>
        </div>

        {/* Bottom part: green */}
        <div className="bg-(--text) p-3 lg:p-5 flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="px-3 lg:px-6 py-1 lg:py-2 text-[9px] lg:text-xs font-semibold bg-transporent text-white rounded-full hover:bg-white hover:text-red-500 hover:shadow-lg transition"
          >
            ОТМЕНИТЬ
          </button>
          <button
            onClick={handleConfirm}
            className="px-3 lg:px-6 py-1 lg:py-2 text-[9px] lg:text-xs font-semibold gap-1 lg:gap-2 flex items-center bg-white text-red-500 rounded-full hover:bg-gray-100 shadow-lg transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 lg-w-4 h-3 lg-h-4"
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
            УДАЛИТЬ
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
