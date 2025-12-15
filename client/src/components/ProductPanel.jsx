import React from "react";
import ProductRow from "./ProductRow";
import { useState, useEffect } from "react";
import { useStore } from "../store/useStore";
import { useMemo } from "react";
import AddProductModal from "./AddProductModal";

export default function ProductPanel({
  group,
  onClose,
  left,
  top,
  triggerBottom,
}) {
  const [closing, setClosing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const groups = useStore((s) => s.groups);

  const products = useStore(
    (s) => s.products,
    (oldArr, newArr) => oldArr.length === newArr.length
  );
  const filteredProducts = useMemo(
    () => products.filter((p) => p.groupId === group.id),
    [products, group.id]
  );

  const handleClose = () => {
    setClosing(true); // run the animation
    setTimeout(() => onClose(), 500); // after 0.5s completely close
  };

  const addProductToGroupAndOrder = useStore(
    (s) => s.addProductToGroupAndOrder
  );

  const handleAddProduct = (data) => {
    addProductToGroupAndOrder(group.id, group.id, data);
    setShowModal(false);
  };

  const [isCompact, setIsCompact] = useState(window.innerWidth < 1024);

  const GAP = 6;
  const panelTopMobile = triggerBottom + GAP * 2;

  const panelStyle = isCompact
    ? {
        left: "1rem",
        top: `${panelTopMobile}px`,
        right: "1rem",
        bottom: "1rem",
        width: "auto",
      }
    : {
        left: `${left}px`,
        top: `${top}px`,
        width: `calc(100vw - ${left}px - 6em)`,
      };

  useEffect(() => {
    const onResize = () => setIsCompact(window.innerWidth < 1024);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div
      className={`fixed lg:ml-3 h-fit bg-white border-l border-gray-300 shadow-2xl z-50
    ${isCompact ? "rounded-sm border" : "border-l border-gray-300"}
    ${closing ? "animate-explode" : "animate-slideLeft"}
  `}
      style={panelStyle}
    >
      <div className="mx-4 mt-4 sm:mx-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-md font-medium">{group.title}</h2>

          <div className="relative">
            {/* The close button is absolute relative to the panel */}
            <button
              onClick={handleClose}
              className="absolute -top-11 -right-8lg:-top-11 lg:-right-12 w-8 h-8 flex items-center justify-center rounded-full border border-gray-100 bg-white text-gray-400 text-xs hover:bg-(--text) hover:text-white hover:border-transparent shadow-lg transition"
            >
              ✕
            </button>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 mb-4"
        >
          <span className="flex items-center justify-center w-4.5 h-4.5 rounded-full bg-(--text) text-white text-sm leading-none">
            <span className="-mt-0.5">+</span>
          </span>

          <span className="text-(--text) font-medium text-xs">
            Добавить продукт
          </span>
        </button>
      </div>

      <div className="h-[calc(100%)] overflow-y-auto">
        <table className="w-full border-collapse table-fixed">
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td className="px-4 sm:px-14 py-3 text-gray-500 text-sm">
                  Нет продуктов
                </td>
              </tr>
            ) : (
              filteredProducts.map((p) => <ProductRow key={p.id} product={p} />)
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <AddProductModal
          onClose={() => setShowModal(false)}
          onSubmit={handleAddProduct}
          groups={groups}
          defaultGroup={group.name}
        />
      )}
    </div>
  );
}
