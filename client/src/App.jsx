import React, { useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "animate.css";
import "./App.css";
import Home from "./pages/Home.jsx";
import Header from "./components/Header.jsx";
import Incoming from "./pages/Incoming";
import Groups from "./pages/Groups";
import Products from "./pages/Products";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import OrderDetails from "./components/OrderDetails.jsx";
import GroupOrder from "./components/GroupOrder.jsx";

export default function App() {
  const location = useLocation();

  const pageRefs = useRef({}); // stores ref for each route

  if (!pageRefs.current[location.pathname]) {
    pageRefs.current[location.pathname] = React.createRef();
  }
  return (
    <>
      <Header />
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
                <Route path="incoming" element={<Incoming />} />
                <Route path="incoming/:id" element={<OrderDetails />} />
                <Route path="groups" element={<Groups />} />
                <Route path="groups/:id" element={<GroupOrder />} />
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
