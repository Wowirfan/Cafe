import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle.jsx";
import { useSettings } from "../context/SettingsContext.jsx";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/menu", label: "Menu" },
  { to: "/gallery", label: "Gallery" },
  { to: "/reservation", label: "Reservation" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const { settings } = useSettings();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface/90 shadow-sm backdrop-blur-md dark:bg-stone-950/90"
          : "bg-transparent"
      }`}
    >
      <nav className="container-px mx-auto flex h-20 max-w-7xl items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          {settings?.logo?.url ? (
            <img src={settings.logo.url} alt={settings.websiteName} className="h-10 w-10 rounded-full object-cover" />
          ) : (
            <span className="grid h-10 w-10 place-items-center rounded-full bg-primary font-display text-lg text-white">
              {settings?.websiteName?.[0] || "B"}
            </span>
          )}
          <span className="font-display text-xl font-semibold">{settings?.websiteName || "Brew & Bloom"}</span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide transition-colors hover:text-primary ${
                    isActive ? "text-primary" : "text-stone-600 dark:text-stone-300"
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          <ThemeToggle />
          <Link to="/reservation" className="btn-primary">
            Reserve a Table
          </Link>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button aria-label="Toggle menu" onClick={() => setOpen((o) => !o)}>
            {open ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-stone-200 bg-surface px-5 pb-6 pt-2 dark:border-stone-800 dark:bg-stone-950 lg:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-3 text-sm font-medium ${
                      isActive ? "bg-primary/10 text-primary" : "text-stone-600 dark:text-stone-300"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link to="/reservation" onClick={() => setOpen(false)} className="btn-primary mt-4 w-full">
            Reserve a Table
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
