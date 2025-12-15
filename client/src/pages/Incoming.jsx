import React, { useState, useRef } from "react";
import { useStore } from "../store/useStore";
import OrderCard from "../components/OrderCard.jsx";
import OrderModal from "../components/OrderModal.jsx";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../animations/slide.css";

export default function Incoming() {
  const orders = useStore((s) => s.orders);

  const [modalOpen, setModalOpen] = useState(false);

  const searchQuery = useStore((s) => s.searchQuery);

  const filteredOrders = orders.filter((o) =>
    o.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const nodeRefs = useRef([]);
  nodeRefs.current = filteredOrders.map(
    (_, i) => nodeRefs.current[i] || React.createRef()
  );
  return (
    <div className="w-full px-4 sm:px-10 md:px-14 mt-20 sm:mt-28">
      <div className="mb-8 mt-2 flex items-center gap-2 justify-center sm:justify-start">
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center justify-center w-6 h-6 rounded-full border border-green-300 bg-(--text) text-white text-sm leading-none"
        >
          <span className="-mt-0.5">+</span>
        </button>

        <h2 className="text-neutral-800 font-medium text-lg sm:text-xl leading-none">
          Приходы / {orders.length}
        </h2>
      </div>

      <TransitionGroup component="div" className="flex flex-col gap-3">
        {filteredOrders.map((order, i) => (
          <CSSTransition
            key={order.id}
            timeout={600 + i * 150} // timeout + position
            classNames="slide"
            appear
            nodeRef={nodeRefs.current[i]}
          >
            <div
              ref={nodeRefs.current[i]}
              className="slide-item"
              style={{ "--delay": `${i * 150}ms` }}
            >
              <OrderCard order={order} />
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>

      {/* MODAL */}
      {modalOpen && <OrderModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
