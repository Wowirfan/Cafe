import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSettings } from "../context/SettingsContext.jsx";

const Hero = () => {
  const { settings } = useSettings();

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${settings?.heroImage?.url || "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1920&auto=format&fit=crop"})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />

      <div className="container-px relative z-10 mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-secondary"
        >
          {settings?.tagline || "Coffee, crafted with care."}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-2xl font-display text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl"
        >
          {settings?.heroHeading || "Welcome to Brew & Bloom"}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-5 max-w-xl text-base text-stone-200 sm:text-lg"
        >
          {settings?.heroSubheading}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-9 flex flex-wrap gap-4"
        >
          <Link to="/reservation" className="btn-primary">
            Reserve a Table
          </Link>
          <Link to="/menu" className="btn-outline text-white">
            View Menu
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
