import React, { useEffect, useState } from "react";
import { FiStar } from "react-icons/fi";
import * as testimonialApi from "../api/testimonialApi.js";
import SectionHeading from "./SectionHeading.jsx";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    testimonialApi.getTestimonials().then((res) => setTestimonials(res.data.testimonials)).catch(() => {});
  }, []);

  if (!testimonials.length) return null;

  return (
    <section className="bg-stone-50 py-24 dark:bg-stone-900">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading eyebrow="Loved by Regulars" title="What Our Guests Say" />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t._id} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-100 dark:bg-stone-800 dark:ring-stone-700">
              <div className="mb-3 flex gap-1 text-secondary">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <FiStar key={i} fill="currentColor" size={14} />
                ))}
              </div>
              <p className="text-sm text-stone-600 dark:text-stone-300">"{t.message}"</p>
              <div className="mt-5 flex items-center gap-3">
                {t.avatarUrl ? (
                  <img src={t.avatarUrl} alt={t.customerName} className="h-9 w-9 rounded-full object-cover" />
                ) : (
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {t.customerName[0]}
                  </span>
                )}
                <span className="text-sm font-semibold">{t.customerName}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
