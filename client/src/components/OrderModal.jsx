import React, { useState } from "react";
import { useStore } from "../store/useStore";

export default function OrderModal({ onClose }) {
  const addOrderAPI = useStore((s) => s.addOrderAPI);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const [closing, setClosing] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};

    if (!title.trim()) errs.title = "Название прихода обязательно";
    if (!date) errs.date = "Дата обязательна";

    return errs;
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    try {
      await addOrderAPI({
        title: title.trim(),
        date,
      });

      setClosing(true);
      setTimeout(onClose, 400);
    } catch (err) {
      console.error(err);
      setErrors({ api: "Ошибка создания прихода" });
    }
  };

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 400);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center lg:ml-48 z-50closing ? "animate-fadeOut" : "animate-fadeIn"
      }`}
    >
      <div className="absolute inset-0 bg-black/40" onClick={handleClose} />
      {/* Modal form */}
      <form
        onSubmit={handleCreate}
        className={`relative w-150 mx-4 sm:mx-0 bg-white rounded-sm shadow-lg ${
          closing ? "animate-slideDown" : "animate-slideUp"
        }
      `}
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute -top-4 -right-4 w-8 h-8 flex items-center justify-center
            rounded-full border border-gray-100 bg-white text-gray-400
            text-xs leading-0 hover:bg-(--text) hover:text-white hover:border-transparent shadow-lg z-50"
        >
          ✕
        </button>

        {/* Top part: white */}
        <div className="bg-white p-6">
          <h2 className="text-md lg:text-lg text-center font-semibold text-(--text)">
            Новый приход
          </h2>

          {/* Grid 2 columns */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Название прихода"
                className="w-full border-b border-gray-200 pb-2 text-xs lg:text-sm placeholder-gray-400 focus:outline-none"
              />
              {errors.title && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.title}
                </span>
              )}
            </div>

            <div>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border-b border-gray-200 pb-2 text-xs lg:text-sm focus:outline-none"
              />
              {errors.date && (
                <span className="text-red-500 text-xs mt-1">{errors.date}</span>
              )}
            </div>
          </div>
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
            СОЗДАТЬ
          </button>
        </div>
      </form>
    </div>
  );
}
