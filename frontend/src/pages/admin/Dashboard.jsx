import React, { useEffect, useState } from "react";
import { FiCalendar, FiCoffee, FiImage, FiMail, FiClock } from "react-icons/fi";
import * as analyticsApi from "../../api/analyticsApi.js";

const StatCard = ({ icon: Icon, label, value, tint }) => (
  <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-100 dark:bg-stone-900 dark:ring-stone-800">
    <div className={`mb-4 grid h-11 w-11 place-items-center rounded-xl ${tint}`}>
      <Icon size={19} />
    </div>
    <p className="text-2xl font-semibold">{value}</p>
    <p className="text-sm text-stone-500">{label}</p>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    analyticsApi.getAnalytics().then((res) => {
      setStats(res.data.stats);
      setRecent(res.data.recentReservations);
    });
  }, []);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Dashboard</h1>
      <p className="mt-1 text-sm text-stone-500">A quick snapshot of what's happening at your café.</p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard icon={FiCalendar} label="Total Reservations" value={stats?.totalReservations ?? "—"} tint="bg-primary/10 text-primary" />
        <StatCard icon={FiClock} label="Pending Reservations" value={stats?.pendingReservations ?? "—"} tint="bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400" />
        <StatCard icon={FiCoffee} label="Menu Items" value={stats?.totalMenuItems ?? "—"} tint="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400" />
        <StatCard icon={FiImage} label="Gallery Images" value={stats?.totalGalleryImages ?? "—"} tint="bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400" />
        <StatCard icon={FiMail} label="Unread Messages" value={stats?.unreadMessages ?? "—"} tint="bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400" />
      </div>

      <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-100 dark:bg-stone-900 dark:ring-stone-800">
        <h2 className="mb-4 font-semibold">Recent Reservations</h2>
        {recent.length === 0 ? (
          <p className="text-sm text-stone-500">No reservations yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 dark:border-stone-800">
                  <th className="pb-2 pr-4">Name</th>
                  <th className="pb-2 pr-4">Date</th>
                  <th className="pb-2 pr-4">Time</th>
                  <th className="pb-2 pr-4">Guests</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((r) => (
                  <tr key={r._id} className="border-b border-stone-100 last:border-0 dark:border-stone-800">
                    <td className="py-2.5 pr-4">{r.name}</td>
                    <td className="py-2.5 pr-4">{r.date}</td>
                    <td className="py-2.5 pr-4">{r.time}</td>
                    <td className="py-2.5 pr-4">{r.guests}</td>
                    <td className="py-2.5 capitalize">{r.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
