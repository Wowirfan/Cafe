import React, { useEffect, useMemo, useState } from "react";
import * as menuApi from "../api/menuApi.js";
import MenuCard from "../components/MenuCard.jsx";
import MenuFilter from "../components/MenuFilter.jsx";
import SectionHeading from "../components/SectionHeading.jsx";

const Menu = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      menuApi
        .getMenuItems({ category: category === "All" ? undefined : category, search: search || undefined })
        .then((res) => setItems(res.data.items))
        .finally(() => setLoading(false));
    }, 300); // debounce search
    return () => clearTimeout(timeout);
  }, [category, search]);

  const grouped = useMemo(() => {
    if (category !== "All") return { [category]: items };
    return items.reduce((acc, item) => {
      acc[item.category] = acc[item.category] || [];
      acc[item.category].push(item);
      return acc;
    }, {});
  }, [items, category]);

  return (
    <div className="container-px mx-auto max-w-7xl pb-24 pt-16">
      <SectionHeading eyebrow="What We're Pouring" title="Our Menu" subtitle="Coffee, tea, cold drinks, desserts, snacks, and breakfast — all made fresh daily." />

      <div className="mt-12">
        <MenuFilter category={category} setCategory={setCategory} search={search} setSearch={setSearch} />
      </div>

      {loading ? (
        <div className="py-20 text-center text-stone-400">Loading menu…</div>
      ) : items.length === 0 ? (
        <div className="py-20 text-center text-stone-400">No items match your search.</div>
      ) : (
        Object.entries(grouped).map(([cat, catItems]) => (
          <div key={cat} className="mb-14">
            <h2 className="mb-6 font-display text-2xl font-semibold">{cat}</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {catItems.map((item) => (
                <MenuCard key={item._id} item={item} />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Menu;
