import React from "react";
import { FiSearch } from "react-icons/fi";

const CATEGORIES = ["All", "Coffee", "Tea", "Cold Drinks", "Desserts", "Snacks", "Breakfast"];

const MenuFilter = ({ category, setCategory, search, setSearch }) => (
  <div className="mb-10 flex flex-col gap-5">
    <div className="relative mx-auto w-full max-w-md">
      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search the menu…"
        className="w-full rounded-full border border-stone-300 bg-white py-3 pl-11 pr-4 text-sm outline-none transition-shadow focus:ring-2 focus:ring-primary/40 dark:border-stone-700 dark:bg-stone-900"
      />
    </div>
    <div className="flex flex-wrap justify-center gap-2">
      {CATEGORIES.map((c) => (
        <button
          key={c}
          onClick={() => setCategory(c)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            category === c
              ? "bg-primary text-white"
              : "bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700"
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  </div>
);

export default MenuFilter;
