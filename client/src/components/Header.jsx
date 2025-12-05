/* import React from "react";
import { useStore } from "../store/useStore";

export default function Header() {
  const activeTabs = useStore((s) => s.activeTabs);

  return (
    <header className="p-4 bg-gray-800 text-white flex justify-between">
      <h1 className="text-xl font-bold">Orders & Products</h1>
      <div>Active tabs: {activeTabs}</div>
    </header>
  );
}
 */
import React, { useState, useEffect } from "react";

export default function Header() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="flex justify-between items-center h-20 px-6 bg-white shadow-md">
      {/* Левый блок: логотип и название */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-green-400 flex items-center justify-center rounded-full text-white text-lg font-bold">
          🛡️
        </div>
        <span className="font-bold text-xl text-gray-800">INVENTORY</span>
      </div>

      {/* Правый блок: дата и время */}
      <div className="text-gray-700 font-medium">
        {currentTime.toLocaleString()}
      </div>
    </header>
  );
}
