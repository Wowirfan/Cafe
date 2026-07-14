import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiUpload, FiTrash2 } from "react-icons/fi";
import * as galleryApi from "../../api/galleryApi.js";

const ManageGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);

  const load = () => galleryApi.getGalleryImages().then((res) => setImages(res.data.images)).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Choose an image first");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("image", file);
      fd.append("title", title);
      await galleryApi.addGalleryImage(fd);
      toast.success("Image uploaded");
      setFile(null);
      setPreview(null);
      setTitle("");
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this image?")) return;
    try {
      await galleryApi.deleteGalleryImage(id);
      toast.success("Image deleted");
      load();
    } catch {
      toast.error("Failed to delete image");
    }
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Gallery</h1>
      <p className="mt-1 text-sm text-stone-500">Upload images to showcase your café's space, drinks, and moments.</p>

      <form onSubmit={handleUpload} className="mt-6 flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-100 dark:bg-stone-900 dark:ring-stone-800 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label className="mb-1.5 block text-sm font-medium">Image</label>
          <input type="file" accept="image/*" onChange={handleFile} className="text-sm" />
        </div>
        <div className="flex-1">
          <label className="mb-1.5 block text-sm font-medium">Caption (optional)</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm dark:border-stone-700 dark:bg-stone-800" placeholder="Latte art, corner seating…" />
        </div>
        {preview && <img src={preview} alt="Preview" className="h-16 w-16 rounded-lg object-cover" />}
        <button type="submit" disabled={uploading} className="btn-primary !px-5 !py-2.5 disabled:opacity-60">
          <FiUpload className="mr-2" /> {uploading ? "Uploading…" : "Upload"}
        </button>
      </form>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {loading ? (
          <p className="col-span-full text-center text-stone-400">Loading…</p>
        ) : images.length === 0 ? (
          <p className="col-span-full text-center text-stone-400">No images yet.</p>
        ) : (
          images.map((img) => (
            <div key={img._id} className="group relative aspect-square overflow-hidden rounded-xl">
              <img src={img.image.url} alt={img.title || "Gallery"} className="h-full w-full object-cover" />
              <button
                onClick={() => handleDelete(img._id)}
                className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-lg bg-red-600/90 text-white opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="Delete image"
              >
                <FiTrash2 size={14} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageGallery;
