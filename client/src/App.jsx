import React from "react";
import { Routes, Route } from "react-router-dom";
import "animate.css";

import Home from "./Page/Home.jsx";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}
