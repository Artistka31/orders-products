import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createPortal } from "react-dom";

const tabs = [
  { label: "Приход", path: "/orders" },
  { label: "Группы", path: "/groups" },
  { label: "Продукты", path: "/products" },
  { label: "Пользователи", path: "/users" },
  { label: "Настройки", path: "/settings" },
];

export default function NavigationMenu({ activeTab }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  function BurgerButton() {
    return createPortal(
      <button
        className="sm:hidden fixed top-2 left-36 p-2 rounded-md bg-white shadow-md"
        style={{ zIndex: 9999 }}
        onClick={() => setSidebarOpen((s) => !s)}
      >
        {sidebarOpen ? (
          <span className="text-2xl">✖</span>
        ) : (
          <span className="text-2xl">☰</span>
        )}
      </button>,
      document.body
    );
  }

  return (
    <>
      {/*   Burger Button — Mobil Only */}
      <BurgerButton />
      <div
        className={`
    fixed top-0 left-0 h-full w-48 bg-white shadow-lg p-4
    z-40 flex flex-col
    transform transition-transform duration-300

    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}

    sm:static sm:translate-x-0 sm:w-48 sm:h-auto sm:flex
  `}
      >
        <div className="flex mt-24 flex-col">
          {/* Avatar + settings */}
          <div className="flex flex-col items-center mb-8 relative">
            {/* Foto*/}
            <div className="relative">
              <img
                src="/img/avatar.jpg"
                alt="User Avatar"
                className="w-24 h-24 object-cover rounded-full"
              />

              {/* Settings icon */}
              <Link to={`/settings`}>
                <button className="absolute bottom-1 right-1 bg-white shadow rounded-full w-7 h-7 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition text-xs">
                  ⚙️
                </button>
              </Link>
            </div>
          </div>

          {tabs.map((t) => (
            <button
              key={t.path}
              onClick={() => navigate(t.path)}
              className={`
              group relative mb-2 p-2 transition-colors
              ${activeTab === t.label ? "text-gray-400" : "text-gray-800"}
            `}
            >
              <span className="relative inline-block">
                {t.label}

                {activeTab === t.label && (
                  <span className="absolute left-0 bottom-0 h-0.5 w-full bg-(--text)"></span>
                )}

                <span className="absolute left-0 bottom-0 h-0.5 w-full bg-(--text) opacity-0 transition-opacity duration-200 group-hover:opacity-100"></span>
              </span>
            </button>
          ))}

          {/* Search in mobile sidebar */}
          <div className="sm:hidden mb-4 mt-10 w-full">
            <input
              type="text"
              placeholder="Поиск"
              className="w-full px-3 py-1 rounded-md text-gray-950 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-200"
            />
          </div>
        </div>
      </div>
    </>
  );
}
