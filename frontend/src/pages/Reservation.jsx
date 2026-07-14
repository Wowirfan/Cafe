import React from "react";
import { motion } from "framer-motion";
import ReservationForm from "../components/ReservationForm.jsx";
import SectionHeading from "../components/SectionHeading.jsx";

const Reservation = () => (
  <div className="container-px mx-auto max-w-4xl pb-24 pt-16">
    <SectionHeading eyebrow="Book a Table" title="Reserve Your Spot" subtitle="Tell us when you're coming and we'll have a table ready." />
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-12 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-stone-100 dark:bg-stone-900 dark:ring-stone-800 sm:p-10"
    >
      <ReservationForm />
    </motion.div>
  </div>
);

export default Reservation;
