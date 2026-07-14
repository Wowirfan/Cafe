import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiPlus, FiTrash2, FiEyeOff, FiEye } from "react-icons/fi";
import * as testimonialApi from "../../api/testimonialApi.js";

const emptyForm = { customerName: "", rating: 5, message: "", avatarUrl: "" };

const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = () => testimonialApi.getTestimonials().then((res) => setTestimonials(res.data.testimonials)).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await testimonialApi.createTestimonial(form);
      toast.success("Testimonial added");
      setForm(emptyForm);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add testimonial");
    } finally {
      setSaving(false);
    }
  };

  const toggleVisible = async (t) => {
    try {
      await testimonialApi.updateTestimonial(t._id, { isVisible: !t.isVisible });
      load();
    } catch {
      toast.error("Failed to update testimonial");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;
    try {
      await testimonialApi.deleteTestimonial(id);
      toast.success("Testimonial deleted");
      load();
    } catch {
      toast.error("Failed to delete testimonial");
    }
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Testimonials</h1>
      <p className="mt-1 text-sm text-stone-500">Curate what customer reviews appear on the homepage.</p>

      <form onSubmit={handleAdd} className="mt-6 grid grid-cols-1 gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-100 dark:bg-stone-900 dark:ring-stone-800 sm:grid-cols-2">
        <input required placeholder="Customer name" value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} className="rounded-xl border border-stone-300 px-4 py-2.5 text-sm dark:border-stone-700 dark:bg-stone-800" />
        <select value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} className="rounded-xl border border-stone-300 px-4 py-2.5 text-sm dark:border-stone-700 dark:bg-stone-800">
          {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} stars</option>)}
        </select>
        <textarea required placeholder="Review message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={2} className="rounded-xl border border-stone-300 px-4 py-2.5 text-sm dark:border-stone-700 dark:bg-stone-800 sm:col-span-2" />
        <input placeholder="Avatar image URL (optional)" value={form.avatarUrl} onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })} className="rounded-xl border border-stone-300 px-4 py-2.5 text-sm dark:border-stone-700 dark:bg-stone-800 sm:col-span-2" />
        <button type="submit" disabled={saving} className="btn-primary sm:col-span-2 disabled:opacity-60">
          <FiPlus className="mr-2" /> {saving ? "Adding…" : "Add Testimonial"}
        </button>
      </form>

      <div className="mt-8 space-y-3">
        {loading ? (
          <p className="text-center text-stone-400">Loading…</p>
        ) : testimonials.length === 0 ? (
          <p className="text-center text-stone-400">No testimonials yet.</p>
        ) : (
          testimonials.map((t) => (
            <div key={t._id} className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-100 dark:bg-stone-900 dark:ring-stone-800">
              <div>
                <p className="font-medium">{t.customerName} · {t.rating}★</p>
                <p className="text-sm text-stone-500">{t.message}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => toggleVisible(t)} className="grid h-8 w-8 place-items-center rounded-lg bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700" aria-label="Toggle visibility">
                  {t.isVisible ? <FiEye size={14} /> : <FiEyeOff size={14} />}
                </button>
                <button onClick={() => handleDelete(t._id)} className="grid h-8 w-8 place-items-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/40">
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageTestimonials;
