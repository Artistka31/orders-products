import React, { useState, useRef, useMemo } from "react";
import ProductPanel from "./ProductPanel";
import { useStore } from "../store/useStore";
import { Link } from "react-router-dom";
import getProductWord from "./ProductWord.jsx";

export default function GroupCard({ group }) {
  const [open, setOpen] = useState(false);

  const [panelLeft, setPanelLeft] = useState(0);
  const [panelTop, setPanelTop] = useState(0);
  const [panelTriggerBottom, setPanelTriggerBottom] = useState(0);

  if (!group) return null;

  const products = useStore((s) => s.products ?? []);
  const myProducts = useMemo(
    () => products.filter((p) => p.groupId === group.id),
    [products, group.id]
  );
  const productCount = myProducts.length;
  const lastProduct = myProducts[myProducts.length - 1];
  const displayDate = lastProduct?.productDate ?? lastProduct?.dateFrom ?? "—";

  const cardRef = useRef(null);

  const openPanel = () => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    setPanelLeft(rect.right);
    setPanelTop(rect.top);
    setPanelTriggerBottom(rect.bottom);
    setOpen(true);
  };

  return (
    <div
      ref={cardRef}
      onClick={openPanel}
      className="w-full sm:w-[250px] md:w-full lg:w-[400px] p-3 flex items-center justify-between border border-zinc-300 bg-white cursor-pointer hover:bg-gray-50 transition rounded-sm shadow-sm"
    >
      {/* RIGHT: product count + list icon */}
      <div className="flex items-center gap-3 text-gray-500 text-sm w-full justify-between">
        {/* Left small circle list icon */}
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center gap-3">
            <Link
              to={`/orders/${group.orderId}`}
              onClick={(e) => e.stopPropagation()}
            >
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
            </Link>

            <span className="flex flex-col items-start">
              <span className="font-medium text-md text-gray-500">
                {productCount}
              </span>
              <span className="text-sm text-gray-400 -mt-1.1">
                {getProductWord(productCount)}
              </span>
            </span>
          </div>

          <span className="flex ml-3">{displayDate}</span>
        </div>

        <div className="relative flex items-center h-full group">
          <span
            className={`absolute -right-3 w-9 h-16 rounded-r-sm transition-colors ${
              open ? "bg-gray-300" : "bg-transparent"
            } group-hover:bg-gray-200`}
          ></span>

          {/* Arrow */}
          <span className="absolute top-1/2 -right-3 transform -translate-y-1/2 w-9 h-17 flex items-center justify-center">
            <svg
              className={`w-6 h-6 transition-colors ${
                open ? "text-white" : "text-transparent"
              } group-hover:text-white`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>
      </div>

      {/* SIDE PANEL */}
      {open && (
        <ProductPanel
          group={group}
          onClose={() => setOpen(false)}
          left={panelLeft}
          top={panelTop}
          triggerBottom={panelTriggerBottom}
        />
      )}
    </div>
  );
}
