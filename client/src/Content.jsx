import React from "react";

export default function Content({ activeTab }) {
  return (
    <main className="flex-1 p-6 mt-2">
      <h2 className="text-xl font-bold mb-4">Активный таб: {activeTab}</h2>
      <div className="bg-white p-4 border rounded">
        Здесь будет содержимое {activeTab}
      </div>
    </main>
  );
}
