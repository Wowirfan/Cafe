import React from "react";
import { Link } from "react-router-dom";
import { FiInstagram, FiFacebook, FiTwitter, FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import { useSettings } from "../context/SettingsContext.jsx";

const Footer = () => {
  const { settings } = useSettings();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-200 bg-stone-50 pt-16 dark:border-stone-800 dark:bg-stone-900">
      <div className="container-px mx-auto grid max-w-7xl gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="font-display text-xl font-semibold">{settings?.websiteName || "Brew & Bloom"}</span>
          <p className="mt-3 text-sm text-stone-500 dark:text-stone-400">
            {settings?.tagline || "Coffee, crafted with care."}
          </p>
          <div className="mt-5 flex gap-3">
            {settings?.social?.instagram && (
              <a href={settings.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
                <FiInstagram size={16} />
              </a>
            )}
            {settings?.social?.facebook && (
              <a href={settings.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
                <FiFacebook size={16} />
              </a>
            )}
            {settings?.social?.twitter && (
              <a href={settings.social.twitter} target="_blank" rel="noreferrer" aria-label="Twitter" className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
                <FiTwitter size={16} />
              </a>
            )}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-stone-500">Explore</h4>
          <ul className="space-y-2 text-sm">
            {[
              ["Home", "/"],
              ["About", "/about"],
              ["Menu", "/menu"],
              ["Gallery", "/gallery"],
              ["Reservation", "/reservation"],
              ["Contact", "/contact"],
            ].map(([label, to]) => (
              <li key={to}>
                <Link to={to} className="text-stone-600 hover:text-primary dark:text-stone-400">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-stone-500">Visit Us</h4>
          <ul className="space-y-3 text-sm text-stone-600 dark:text-stone-400">
            <li className="flex items-start gap-2">
              <FiMapPin className="mt-0.5 shrink-0 text-primary" /> {settings?.address}
            </li>
            <li className="flex items-center gap-2">
              <FiPhone className="shrink-0 text-primary" /> {settings?.phone}
            </li>
            <li className="flex items-center gap-2">
              <FiMail className="shrink-0 text-primary" /> {settings?.email}
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-stone-500">Hours</h4>
          <ul className="space-y-2 text-sm text-stone-600 dark:text-stone-400">
            <li className="flex justify-between"><span>Mon – Fri</span><span>7:00 – 20:00</span></li>
            <li className="flex justify-between"><span>Saturday</span><span>8:00 – 21:00</span></li>
            <li className="flex justify-between"><span>Sunday</span><span>8:00 – 18:00</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-stone-200 py-6 text-center text-xs text-stone-500 dark:border-stone-800">
        © {year} {settings?.websiteName || "Brew & Bloom"}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
