import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";

export default function Home() {
  const location = useLocation();

  const labels = {
    "/incoming": "Приход",
    "/groups": "Группы",
    "/products": "Продукты",
    "/users": "Пользователи",
    "/settings": "Настройки",
  };

  const activeTab = labels[location.pathname] || "";

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex flex-1">
        <Sidebar activeTab={activeTab} />
        <div className="flex-1 p-4 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
