import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  FiGrid, FiCoffee, FiImage, FiCalendar, FiMessageSquare, FiStar,
  FiSettings, FiLogOut, FiMenu, FiX, FiExternalLink,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext.jsx";
import ThemeToggle from "../../components/ThemeToggle.jsx";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: FiGrid, end: true },
  { to: "/admin/menu", label: "Menu Items", icon: FiCoffee },
  { to: "/admin/gallery", label: "Gallery", icon: FiImage },
  { to: "/admin/reservations", label: "Reservations", icon: FiCalendar },
  { to: "/admin/testimonials", label: "Testimonials", icon: FiStar },
  { to: "/admin/messages", label: "Messages", icon: FiMessageSquare },
  { to: "/admin/settings", label: "Site Settings", icon: FiSettings },
];

const AdminLayout = () => {
  const { admin, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const SidebarContent = () => (
    <>
      <div className="mb-8 flex items-center justify-between">
        <span className="font-display text-lg font-semibold">Admin Panel</span>
        <button className="lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu">
          <FiX size={22} />
        </button>
      </div>
      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : "text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800"
              }`
            }
          >
            <Icon size={17} /> {label}
          </NavLink>
        ))}
      </nav>
      <a href="/" target="_blank" rel="noreferrer" className="mt-4 flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800">
        <FiExternalLink size={17} /> View Live Site
      </a>
      <button onClick={logout} className="mt-1 flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40">
        <FiLogOut size={17} /> Log Out
      </button>
    </>
  );

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950 lg:flex">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col bg-white p-5 dark:bg-stone-900 lg:flex">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      {open && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="w-64 flex flex-col bg-white p-5 dark:bg-stone-900">
            <SidebarContent />
          </div>
          <div className="flex-1 bg-black/40" onClick={() => setOpen(false)} />
        </div>
      )}

      <div className="flex-1">
        <header className="flex h-16 items-center justify-between border-b border-stone-200 bg-white px-5 dark:border-stone-800 dark:bg-stone-900 lg:px-8">
          <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
            <FiMenu size={22} />
          </button>
          <span className="hidden text-sm text-stone-500 lg:block">Signed in as {admin?.email}</span>
          <ThemeToggle />
        </header>
        <main className="p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
