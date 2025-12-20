import React, { useState, useRef, useEffect } from "react";
import { useStore } from "../store/useStore.js";
import socket from "../api/websocket.js";
import OrderCard from "../components/OrderCard.jsx";
import OrderModal from "../components/OrderModal.jsx";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../animations/slide.css";
import { Helmet } from "react-helmet-async";

export default function Orders() {
  const orders = useStore((s) => s.orders);

  const loadOrders = useStore((s) => s.loadOrders);
  const searchQuery = useStore((s) => s.searchQuery);

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  useEffect(() => {
    const handleOrdersUpdate = (updatedOrders) => {
      useStore.getState().setOrders(updatedOrders);
    };

    socket.on("ordersUpdated", handleOrdersUpdate);

    return () => {
      socket.off("ordersUpdated", handleOrdersUpdate);
    };
  }, []);

  const filteredOrders = orders.filter((o) =>
    o.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const nodeRefs = useRef([]);
  nodeRefs.current = filteredOrders.map(
    (_, i) => nodeRefs.current[i] || React.createRef()
  );
  return (
    <>
      <Helmet>
        {/* Title и description */}
        <title>{`Наш продукт - ваше лучшее вложение! (${
          orders?.length || 0
        })`}</title>
        <meta
          name="description"
          content={`Новые и б/у мониторы, системники, ноутбуки и комплектующие уже в приходе! (${
            orders?.length || 0
          })`}
        />
        {/* Keywords */}
        <meta
          name="keywords"
          content="приходы заказов, мониторы, системники, ноутбуки, б/у техника, комплектующие, купить технику"
        />
        {/* Open Graph */}
        <meta
          property="og:title"
          content={`Наш продукт - ваше лучшее вложение! (${
            orders?.length || 0
          })`}
        />
        <meta
          property="og:description"
          content={`Новые и б/у мониторы, системники, ноутбуки и комплектующие уже в приходе! (${
            orders?.length || 0
          })`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/preview.png" />{" "}
        <meta property="og:url" content={window.location.href} />
        <script type="application/ld+json">
          {`
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Мониторы, системники, ноутбуки",
      "description": "Новые и б/у мониторы, системники и ноутбуки уже в приходе",
      "url": "${window.location.href}"
    }
    `}
        </script>
      </Helmet>

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
    </>
  );
}
