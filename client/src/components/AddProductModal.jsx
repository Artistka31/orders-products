import React, { useState } from "react";
import { createPortal } from "react-dom";

export default function AddProductModal({ onClose, onSubmit, defaultGroup }) {
  const [closing, setClosing] = useState(false);

  const [form, setForm] = useState({
    name: "",
    status: "Свободен",
    spec: "Новый",
    type: "",
    dateFrom: "",
    dateTo: "",
    groupName: defaultGroup || "",
    userFullName: "",
    price1Value: "",
    price1Symbol: "USD",
    price2Value: "",
    price2Symbol: "UAH",
    photo: null,
  });

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setForm((prev) => ({ ...prev, photo: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setClosing(true);
    let photoUrl = "/img/monitor.png";

    if (form.photo) {
      photoUrl = await fileToBase64(form.photo);
    }
    setTimeout(() => {
      onSubmit({
        name: form.name,
        status: form.status,
        spec: form.spec,
        type: form.type,
        dateFrom: form.dateFrom || new Date().toLocaleDateString(),
        dateTo: form.dateTo || new Date().toLocaleDateString(),
        groupName: form.groupName,
        userFullName: form.userFullName,
        price: [
          {
            value: Number(form.price1Value) || 0,
            symbol: form.price1Symbol,
          },
          {
            value: Number(form.price2Value) || 0,
            symbol: form.price2Symbol,
          },
        ],
        photo: photoUrl,
      });
      onClose();
    }, 250);
  };

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 250); // time = slideDown
  };

  return createPortal(
    <div
      className={`fixed inset-0 flex items-center justify-center shadow-lg mt-16 lg:ml-48 z-50 ${
        closing ? "animate-fadeOut" : "animate-fadeIn"
      }`}
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={handleClose} // click on the background closes
      />
      <form
        onSubmit={handleSubmit}
        className={`relative w-150 mx-4 sm:mx-0 bg-white rounded-sm shadow-xl ${
          closing ? "animate-slideDown" : "animate-slideUp"
        }
      `}
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute -top-4 -right-4 w-8 h-8 flex items-center justify-center rounded-full border border-gray-100 bg-white text-gray-400 text-xs leading-0 hover:bg-(--text) hover:text-white hover:border-transparent shadow-lg z-50"
        >
          ✕
        </button>
        {/* Top part: white */}
        <div className="bg-white p-6">
          <h2 className="text-md lg:text-lg text-center font-semibold text-(--text)">
            Добавить продукт
          </h2>

          {/* Grid 2 columns */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <input
              type="text"
              name="name"
              placeholder="Название продукта"
              value={form.name}
              onChange={handleChange}
              className="w-full border-b border-gray-200 pb-2 text-xs lg:text-sm placeholder-gray-400 focus:outline-none"
            />
            <input
              type="text"
              name="groupName"
              placeholder="Название группы"
              value={form.groupName}
              onChange={handleChange}
              className="w-full border-b border-gray-200 pb-2 text-xs lg:text-sm focus:outline-none"
            />

            <input
              type="date"
              name="dateFrom"
              value={form.dateFrom}
              onChange={handleChange}
              className="w-full border-b border-gray-200 pb-2 text-xs lg:text-sm focus:outline-none"
            />

            <input
              type="date"
              name="dateTo"
              value={form.dateTo}
              onChange={handleChange}
              className="w-full border-b border-gray-200 pb-2 text-xs lg:text-sm focus:outline-none"
            />

            <select
              name="spec"
              value={form.spec}
              onChange={handleChange}
              className="w-full border-b border-gray-200 pb-2 text-xs lg:text-sm focus:outline-none bg-white"
            >
              <option value="Новый">Новый</option>
              <option value="Б/У">Б/У</option>
            </select>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="border-b border-gray-200 pb-2 text-xs lg:text-sm w-full"
            >
              <option value="">Тип</option>
              <option value="монитор">Монитор</option>
              <option value="процессор">Процессор</option>
              <option value="видеокарта">Видеокарта</option>
              <option value="ноутбук">Ноутбук</option>
              <option value="системный блок">Системный блок</option>
            </select>

            {/* price USD */}
            <div className="flex gap-2">
              <input
                type="number"
                name="price1Value"
                placeholder="Цена USD"
                value={form.price1Value}
                onChange={handleChange}
                className="w-full border-b border-gray-200 pb-2 text-xs lg:text-sm focus:outline-none"
              />
              <input
                type="text"
                name="price1Symbol"
                placeholder="Валюта"
                value={form.price1Symbol}
                onChange={handleChange}
                className="w-24 border-b border-gray-200 pb-2 text-xs lg:text-sm focus:outline-none"
              />
            </div>

            {/* price UAH */}
            <div className="flex gap-2 mt-2">
              <input
                type="number"
                name="price2Value"
                placeholder="Цена UAH"
                value={form.price2Value}
                onChange={handleChange}
                className="w-full border-b border-gray-200 pb-2 text-xs lg:text-sm focus:outline-none"
              />
              <input
                type="text"
                name="price2Symbol"
                placeholder="Валюта"
                value={form.price2Symbol}
                onChange={handleChange}
                className="w-24 border-b border-gray-200 pb-2 text-xs lg:text-sm focus:outline-none"
              />
            </div>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border-b border-gray-200 pb-2 text-xs lg:text-sm focus:outline-none bg-white"
            >
              <option value="Свободен">Свободен</option>
              <option value="В ремонте">В ремонте</option>
            </select>
            <input
              type="text"
              name="userFullName"
              placeholder="Пользователь"
              value={form.userFullName}
              onChange={handleChange}
              className="w-full border-b border-gray-200 pb-2 text-xs lg:text-sm focus:outline-none"
            />
          </div>

          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
            className="w-full text-xs lg:text-sm text-gray-500 mt-4"
          />
        </div>

        {/* Bottom part: buttons */}
        <div className="bg-(--text) p-3 lg:p-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="px-3 lg:px-6 py-1 lg:py-2 text-[9px] lg:text-xs font-semibold bg-transparent text-white rounded-full hover:bg-white hover:text-red-500 hover:shadow-lg transition"
          >
            ОТМЕНИТЬ
          </button>
          <button
            type="submit"
            className="px-3 lg:px-6 py-1 lg:py-2 text-[9px] lg:text-xs font-semibold gap-2 flex items-center bg-white text-red-500 rounded-full hover:bg-gray-100 shadow-lg transition"
          >
            ДОБАВИТЬ
          </button>
        </div>
      </form>
    </div>,

    document.body
  );
}
