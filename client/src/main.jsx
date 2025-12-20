import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import "./api/websocket.js";
import { HelmetProvider } from "react-helmet-async";

// 🔴 TEMP DEBUG — REMOVE AFTER FIX
window.addEventListener("error", (e) => {
  document.body.innerHTML = `
    <pre style="
      color:red;
      background:#000;
      padding:16px;
      white-space:pre-wrap;
    ">
JS ERROR:
${e.message}

${e.error?.stack || ""}
    </pre>
  `;
});

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <Router>
      <App />
    </Router>
  </HelmetProvider>
);
