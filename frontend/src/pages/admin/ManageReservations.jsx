import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiTrash2 } from "react-icons/fi";
import * as reservationApi from "../../api/reservationApi.js";

const STATUSES = ["pending", "confirmed", "cancelled"];
const badgeClass = {
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
  confirmed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  cancelled: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
};

const ManageReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const load = () => reservationApi.getReservations(filter ? { status: filter } : {}).then((res) => setReservations(res.data.reservations)).finally(() => setLoading(false));
  useEffect(() => { load(); }, [filter]);

  const handleStatusChange = async (id, status) => {
    try {
      await reservationApi.updateReservation(id, { status });
      toast.success("Reservation updated");
      load();
    } catch {
      toast.error("Failed to update reservation");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this reservation?")) return;
    try {
      await reservationApi.deleteReservation(id);
      toast.success("Reservation deleted");
      load();
    } catch {
      toast.error("Failed to delete reservation");
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold">Reservations</h1>
          <p className="mt-1 text-sm text-stone-500">Manage incoming table bookings.</p>
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-xl border border-stone-300 px-4 py-2 text-sm dark:border-stone-700 dark:bg-stone-800">
          <option value="">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-stone-100 dark:bg-stone-900 dark:ring-stone-800">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-stone-200 text-stone-500 dark:border-stone-800">
              <th className="p-4">Guest</th>
              <th className="p-4">Contact</th>
              <th className="p-4">Date & Time</th>
              <th className="p-4">Guests</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="p-6 text-center text-stone-400">Loading…</td></tr>
            ) : reservations.length === 0 ? (
              <tr><td colSpan={6} className="p-6 text-center text-stone-400">No reservations found.</td></tr>
            ) : (
              reservations.map((r) => (
                <tr key={r._id} className="border-b border-stone-100 last:border-0 dark:border-stone-800">
                  <td className="p-4 font-medium">{r.name}</td>
                  <td className="p-4 text-stone-500">{r.phone}<br />{r.email}</td>
                  <td className="p-4">{r.date} · {r.time}</td>
                  <td className="p-4">{r.guests}</td>
                  <td className="p-4">
                    <select
                      value={r.status}
                      onChange={(e) => handleStatusChange(r._id, e.target.value)}
                      className={`rounded-full border-0 px-3 py-1 text-xs font-medium capitalize ${badgeClass[r.status]}`}
                    >
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleDelete(r._id)} className="grid h-8 w-8 place-items-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/40">
                      <FiTrash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageReservations;
