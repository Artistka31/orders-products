import React, { useRef } from "react";
import ProductCard from "./ProductCard";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export default function ProductsList({ products }) {
  if (!products || products.length === 0) {
    return <p className="text-gray-500 mt-28 ml-14">Нет продуктов</p>;
  }

  const nodeRefs = useRef(products.map(() => React.createRef()));

  return (
    <TransitionGroup component="div" className="grid gap-3">
      {products.map((product, i) => (
        <CSSTransition
          key={product.id}
          timeout={400 + i * 100} // animation time + index delay
          classNames="slide"
          appear
          nodeRef={nodeRefs.current[i]}
        >
          <div
            ref={nodeRefs.current[i]}
            className="slide-item"
            style={{ "--delay": `${i * 100}ms` }}
          >
            <ProductCard product={product} />
          </div>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}
