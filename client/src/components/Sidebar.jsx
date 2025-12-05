import React from "react";

const tabs = ["Приход", "Группы", "Продукты", "Пользователи", "Настройки"];

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <div className="w-48 bg-gray-200 flex flex-col p-4">
      <div className="flex flex-col items-center mb-6">
        <div className="w-16 h-16 bg-gray-400 rounded-full mb-2 flex items-center justify-center">
          👤
        </div>
        <button className="p-1 text-sm bg-gray-300 rounded">
          ⚙️ Настройки
        </button>
      </div>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`mb-2 p-2 rounded ${
            activeTab === tab ? "bg-gray-400 text-white" : "bg-white"
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
