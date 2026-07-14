import React from "react";
import { motion } from "framer-motion";

const SectionHeading = ({ eyebrow, title, subtitle, center = true }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.6 }}
    className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}
  >
    {eyebrow && <p className="section-eyebrow mb-3">{eyebrow}</p>}
    <h2 className="font-display text-3xl font-semibold sm:text-4xl">{title}</h2>
    {subtitle && <p className="mt-4 text-stone-500 dark:text-stone-400">{subtitle}</p>}
  </motion.div>
);

export default SectionHeading;
