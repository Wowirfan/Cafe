import React from "react";
import { motion } from "framer-motion";

const MenuCard = ({ item }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5 }}
    className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-100 transition-shadow hover:shadow-lg dark:bg-stone-900 dark:ring-stone-800"
  >
    <div className="relative h-48 overflow-hidden">
      <img
        src={item.image?.url || "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop"}
        alt={item.name}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      {!item.isAvailable && (
        <span className="absolute right-3 top-3 rounded-full bg-stone-900/80 px-3 py-1 text-xs text-white">
          Sold out
        </span>
      )}
    </div>
    <div className="p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-semibold">{item.name}</h3>
        <span className="whitespace-nowrap font-display text-lg font-semibold text-primary">
          ${Number(item.price).toFixed(2)}
        </span>
      </div>
      {item.description && (
        <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">{item.description}</p>
      )}
      <span className="mt-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
        {item.category}
      </span>
    </div>
  </motion.div>
);

export default MenuCard;
