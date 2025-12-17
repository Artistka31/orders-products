import React, { useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "animate.css";
import "./App.css";
import Home from "./pages/Home.jsx";
import TopMenu from "./components/TopMenu.jsx";
import Orders from "./pages/Orders.jsx";
import Groups from "./pages/Groups";
import Products from "./pages/Products";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import OrderDetails from "./components/OrderDetails.jsx";

export default function App() {
  const location = useLocation();

  const pageRefs = useRef({}); // stores ref for each route

  if (!pageRefs.current[location.pathname]) {
    pageRefs.current[location.pathname] = React.createRef();
  }
  return (
    <>
      <TopMenu />
      <TransitionGroup component={null}>
        <CSSTransition
          key={location.pathname}
          classNames="route-slide"
          timeout={{ enter: 350, exit: 350 }}
          unmountOnExit
          nodeRef={pageRefs.current[location.pathname]}
        >
          <div
            ref={pageRefs.current[location.pathname]}
            className="relative h-full"
          >
            <Routes location={location}>
              <Route path="/" element={<Home />}>
                <Route path="orders" element={<Orders />} />
                <Route path="orders/:id" element={<OrderDetails />} />
                <Route path="groups" element={<Groups />} />
                <Route path="products" element={<Products />} />
                <Route path="users" element={<Users />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Routes>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
}
