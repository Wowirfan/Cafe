import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading.jsx";
import { useSettings } from "../context/SettingsContext.jsx";

const values = [
  { title: "Sourced with care", body: "We work directly with small farms to bring in beans and leaves at their peak." },
  { title: "Roasted in-house", body: "Every batch is roasted on-site in small quantities for maximum freshness." },
  { title: "Made for lingering", body: "Our space is designed for slow mornings, long conversations, and quiet work." },
];

const About = () => {
  const { settings } = useSettings();

  return (
    <div className="pb-24">
      <section className="container-px mx-auto grid max-w-7xl gap-12 pt-20 lg:grid-cols-2 lg:items-center">
        <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <p className="section-eyebrow mb-3">Our Story</p>
          <h1 className="font-display text-4xl font-semibold sm:text-5xl">
            More than coffee — a place to belong
          </h1>
          <p className="mt-6 text-stone-500 dark:text-stone-400">
            {settings?.websiteName || "Brew & Bloom"} started as a single espresso cart and grew into a
            neighborhood favorite. We still roast in small batches, bake fresh every morning, and treat every
            cup like it's the only one we're making that day.
          </p>
        </motion.div>
        <motion.img
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1200&auto=format&fit=crop"
          alt="Café interior"
          className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl"
        />
      </section>

      <section className="container-px mx-auto mt-24 max-w-7xl">
        <SectionHeading eyebrow="What We Believe" title="Our Values" />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl bg-stone-50 p-7 dark:bg-stone-900"
            >
              <span className="font-display text-3xl text-primary">0{i + 1}</span>
              <h3 className="mt-3 font-display text-lg font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">{v.body}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
