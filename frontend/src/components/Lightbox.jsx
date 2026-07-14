import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

/**
 * Lightweight custom lightbox (no extra runtime dependency needed) —
 * click a thumbnail to open, arrow keys / buttons to navigate, Esc to close.
 */
const Lightbox = ({ images }) => {
  const [index, setIndex] = useState(null);
  const open = index !== null;

  const close = () => setIndex(null);
  const next = (e) => {
    e?.stopPropagation();
    setIndex((i) => (i + 1) % images.length);
  };
  const prev = (e) => {
    e?.stopPropagation();
    setIndex((i) => (i - 1 + images.length) % images.length);
  };

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((img, i) => (
          <motion.button
            key={img._id}
            onClick={() => setIndex(i)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
            className="group relative aspect-square overflow-hidden rounded-xl"
          >
            <img
              src={img.image.url}
              alt={img.title || "Gallery image"}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </motion.button>
        ))}
      </div>

      {open && (
        <div
          onClick={close}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 animate-fade-in"
        >
          <button aria-label="Close" onClick={close} className="absolute right-5 top-5 text-white/80 hover:text-white">
            <FiX size={28} />
          </button>
          <button aria-label="Previous image" onClick={prev} className="absolute left-3 text-white/70 hover:text-white sm:left-8">
            <FiChevronLeft size={32} />
          </button>
          <img
            src={images[index].image.url}
            alt={images[index].title || "Gallery image"}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
          />
          <button aria-label="Next image" onClick={next} className="absolute right-3 text-white/70 hover:text-white sm:right-8">
            <FiChevronRight size={32} />
          </button>
        </div>
      )}
    </>
  );
};

export default Lightbox;
