import React, { useState } from "react";
import toast from "react-hot-toast";
import * as reservationApi from "../api/reservationApi.js";

const initialState = { name: "", phone: "", email: "", date: "", time: "", guests: 2, notes: "" };

const ReservationForm = () => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^[\d+\-()\s]{7,}$/.test(form.phone)) e.phone = "Enter a valid phone number";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.date) e.date = "Choose a date";
    if (!form.time) e.time = "Choose a time";
    if (!form.guests || form.guests < 1) e.guests = "At least 1 guest";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await reservationApi.createReservation(form);
      toast.success("Reservation received — we'll confirm shortly!");
      setForm(initialState);
      setErrors({});
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-primary/40 dark:bg-stone-900 ${
      errors[field] ? "border-red-400" : "border-stone-300 dark:border-stone-700"
    }`;

  return (
    <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div>
        <label className="mb-1.5 block text-sm font-medium">Full name</label>
        <input name="name" value={form.name} onChange={handleChange} className={inputClass("name")} placeholder="Jane Doe" />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Phone</label>
        <input name="phone" value={form.phone} onChange={handleChange} className={inputClass("phone")} placeholder="+1 555 123 4567" />
        {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
      </div>
      <div className="sm:col-span-2">
        <label className="mb-1.5 block text-sm font-medium">Email</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} className={inputClass("email")} placeholder="jane@example.com" />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Date</label>
        <input name="date" type="date" min={new Date().toISOString().split("T")[0]} value={form.date} onChange={handleChange} className={inputClass("date")} />
        {errors.date && <p className="mt-1 text-xs text-red-500">{errors.date}</p>}
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Time</label>
        <input name="time" type="time" value={form.time} onChange={handleChange} className={inputClass("time")} />
        {errors.time && <p className="mt-1 text-xs text-red-500">{errors.time}</p>}
      </div>
      <div className="sm:col-span-2">
        <label className="mb-1.5 block text-sm font-medium">Number of guests</label>
        <input name="guests" type="number" min={1} max={20} value={form.guests} onChange={handleChange} className={inputClass("guests")} />
        {errors.guests && <p className="mt-1 text-xs text-red-500">{errors.guests}</p>}
      </div>
      <div className="sm:col-span-2">
        <label className="mb-1.5 block text-sm font-medium">Special requests (optional)</label>
        <textarea name="notes" rows={3} value={form.notes} onChange={handleChange} className={inputClass("notes")} placeholder="Window seat, allergies, celebration…" />
      </div>
      <button type="submit" disabled={submitting} className="btn-primary sm:col-span-2 disabled:opacity-60">
        {submitting ? "Booking…" : "Confirm Reservation"}
      </button>
    </form>
  );
};

export default ReservationForm;
