import React, { useState, useEffect } from "react";
import { useStore } from "../store/useStore";
import { useSocketStore } from "../store/useSocketStore";

export default function TopMenu() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const activeTabs = useSocketStore((s) => s.activeTabs);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const searchQuery = useStore((s) => s.searchQuery);
  const setSearchQuery = useStore((s) => s.setSearchQuery);

  return (
    <>
      <header className="flex justify-between items-center h-16 px-4 sm:px-6 bg-white shadow-md fixed top-0 left-0 right-0 z-60">
        {/* Left part */}
        <div className="flex items-center flex-1">
          {/* Logo + title */}
          <div className="flex items-center space-x-3 sm:ml-20 md:ml-5 lg:ml-40">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              className="w-7 h-7 sm:w-8 sm:h-8 text-(--text)"
            >
              <path
                fill="currentColor"
                d="M32 2 L2 16 v24 c0 20 30 28 30 28s30-8 30-28V16L32 2z"
              />
              <circle cx="32" cy="30" r="6" fill="#fff" />
              <rect x="28" y="36" width="8" height="12" fill="#fff" />
            </svg>

            <span className="font-bold text-xs sm:text-sm text-(--text)">
              INVENTORY
            </span>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Поиск"
            className="hidden sm:block sm:w-64 md:w-80 lg:w-96 px-3 rounded-md ml-4 sm:ml-10 md:ml-12 lg:ml-40 mr-5 text-gray-950 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Right part */}
        <div className="flex flex-col items-start font-medium min-w-fit sm:mr-10 md:mr-10 lg:mr-32">
          {/* Day of Week / Today */}
          <div className="flex flex-row gap-3 text-xs sm:text-sm text-gray-500">
            {(() => {
              const now = new Date();
              const isToday =
                currentTime.getFullYear() === now.getFullYear() &&
                currentTime.getMonth() === now.getMonth() &&
                currentTime.getDate() === now.getDate();

              return isToday
                ? "Today"
                : currentTime.toLocaleDateString("ru-RU", { weekday: "long" });
            })()}
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-(--text)"></span>
              <span>{activeTabs}</span>
            </div>
          </div>

          {/* Date + time */}
          <div className="flex items-center space-x-4 text-[10px] sm:text-xs text-gray-500 mt-1">
            {/* Date */}
            <span>
              {currentTime
                .toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
                .replace(",", "")}
            </span>

            {/* Clock */}
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full border-2 border-(--text) relative flex items-center justify-center">
                <div className="absolute w-px h-1.5 bg-(--text) top-2 left-3 -translate-x-1.5 -translate-y-1.5 origin-bottom"></div>
                <div className="absolute w-px h-1.5 bg-(--text) top-2 left-3 -translate-x-3 -translate-y-1.5 origin-bottom rotate-90"></div>
              </div>

              <span>
                {currentTime.toLocaleString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
