import React, { useState } from "react";
import toast from "react-hot-toast";
import * as contactApi from "../api/contactApi.js";

const initialState = { name: "", email: "", subject: "", message: "" };

const ContactForm = () => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim() || form.message.trim().length < 10) e.message = "Message should be at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await contactApi.sendContactMessage(form);
      toast.success("Message sent — we'll reply soon!");
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
    <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Name</label>
          <input name="name" value={form.name} onChange={handleChange} className={inputClass("name")} placeholder="Your name" />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} className={inputClass("email")} placeholder="you@example.com" />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Subject (optional)</label>
        <input name="subject" value={form.subject} onChange={handleChange} className={inputClass("subject")} placeholder="How can we help?" />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Message</label>
        <textarea name="message" rows={5} value={form.message} onChange={handleChange} className={inputClass("message")} placeholder="Write your message…" />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
      </div>
      <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-60">
        {submitting ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
};

export default ContactForm;
