import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiPlus, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import * as menuApi from "../../api/menuApi.js";

const CATEGORIES = ["Coffee", "Tea", "Cold Drinks", "Desserts", "Snacks", "Breakfast"];
const emptyForm = { name: "", description: "", price: "", category: "Coffee", isFeatured: false, isAvailable: true };

const ManageMenu = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => menuApi.getMenuItems().then((res) => setItems(res.data.items)).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setImageFile(null);
    setPreview(null);
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingId(item._id);
    setForm({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      isFeatured: item.isFeatured,
      isAvailable: item.isAvailable,
    });
    setPreview(item.image?.url || null);
    setImageFile(null);
    setModalOpen(true);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (imageFile) fd.append("image", imageFile);

      if (editingId) {
        await menuApi.updateMenuItem(editingId, fd);
        toast.success("Menu item updated");
      } else {
        await menuApi.createMenuItem(fd);
        toast.success("Menu item added");
      }
      setModalOpen(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save item");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this menu item? This can't be undone.")) return;
    try {
      await menuApi.deleteMenuItem(id);
      toast.success("Item deleted");
      load();
    } catch {
      toast.error("Failed to delete item");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">Menu Items</h1>
          <p className="mt-1 text-sm text-stone-500">Add, edit, or remove items — changes appear on the site instantly.</p>
        </div>
        <button onClick={openCreate} className="btn-primary !px-5 !py-2.5">
          <FiPlus className="mr-2" /> Add Item
        </button>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-stone-100 dark:bg-stone-900 dark:ring-stone-800">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-stone-200 text-stone-500 dark:border-stone-800">
              <th className="p-4">Item</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="p-6 text-center text-stone-400">Loading…</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={5} className="p-6 text-center text-stone-400">No menu items yet.</td></tr>
            ) : (
              items.map((item) => (
                <tr key={item._id} className="border-b border-stone-100 last:border-0 dark:border-stone-800">
                  <td className="flex items-center gap-3 p-4">
                    <img src={item.image?.url || "https://placehold.co/60x60"} alt={item.name} className="h-10 w-10 rounded-lg object-cover" />
                    <div>
                      <p className="font-medium">{item.name}{item.isFeatured && <span className="ml-2 rounded-full bg-secondary/20 px-2 py-0.5 text-xs text-primary">Featured</span>}</p>
                    </div>
                  </td>
                  <td className="p-4">{item.category}</td>
                  <td className="p-4">${Number(item.price).toFixed(2)}</td>
                  <td className="p-4">{item.isAvailable ? "Available" : "Sold out"}</td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEdit(item)} className="grid h-8 w-8 place-items-center rounded-lg bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700">
                        <FiEdit2 size={14} />
                      </button>
                      <button onClick={() => handleDelete(item._id)} className="grid h-8 w-8 place-items-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/40">
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 dark:bg-stone-900">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">{editingId ? "Edit Item" : "Add Item"}</h2>
              <button onClick={() => setModalOpen(false)}><FiX size={20} /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Image</label>
                {preview && <img src={preview} alt="Preview" className="mb-2 h-32 w-32 rounded-xl object-cover" />}
                <input type="file" accept="image/*" onChange={handleFile} className="text-sm" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Name</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm dark:border-stone-700 dark:bg-stone-800" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm dark:border-stone-700 dark:bg-stone-800" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Price ($)</label>
                  <input required type="number" min="0" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm dark:border-stone-700 dark:bg-stone-800" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm dark:border-stone-700 dark:bg-stone-800">
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} />
                  Featured on homepage
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.isAvailable} onChange={(e) => setForm({ ...form, isAvailable: e.target.checked })} />
                  Available
                </label>
              </div>
              <button type="submit" disabled={saving} className="btn-primary w-full disabled:opacity-60">
                {saving ? "Saving…" : "Save Item"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMenu;
