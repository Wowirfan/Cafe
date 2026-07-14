import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as settingsApi from "../../api/settingsApi.js";
import { useSettings } from "../../context/SettingsContext.jsx";

const SiteSettings = () => {
  const { settings, refresh } = useSettings();
  const [form, setForm] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [heroFile, setHeroFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [heroPreview, setHeroPreview] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (settings) setForm(JSON.parse(JSON.stringify(settings)));
  }, [settings]);

  if (!form) return <p className="text-stone-400">Loading settings…</p>;

  const update = (path, value) => {
    setForm((prev) => {
      const next = { ...prev };
      const keys = path.split(".");
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) {
        obj[keys[i]] = { ...obj[keys[i]] };
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const handleSaveText = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await settingsApi.updateSettings(form);
      await refresh();
      toast.success("Settings saved — live on the site now");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const handleLogoFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setLogoFile(f);
    setLogoPreview(URL.createObjectURL(f));
  };

  const handleHeroFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setHeroFile(f);
    setHeroPreview(URL.createObjectURL(f));
  };

  const uploadLogo = async () => {
    if (!logoFile) return;
    const fd = new FormData();
    fd.append("image", logoFile);
    try {
      await settingsApi.updateLogo(fd);
      await refresh();
      toast.success("Logo updated");
      setLogoFile(null);
      setLogoPreview(null);
    } catch {
      toast.error("Failed to upload logo");
    }
  };

  const uploadHero = async () => {
    if (!heroFile) return;
    const fd = new FormData();
    fd.append("image", heroFile);
    try {
      await settingsApi.updateHeroImage(fd);
      await refresh();
      toast.success("Hero image updated");
      setHeroFile(null);
      setHeroPreview(null);
    } catch {
      toast.error("Failed to upload hero image");
    }
  };

  const inputClass = "w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm dark:border-stone-700 dark:bg-stone-800";
  const cardClass = "rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-100 dark:bg-stone-900 dark:ring-stone-800";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold">Site Settings</h1>
        <p className="mt-1 text-sm text-stone-500">Everything here updates the live website instantly.</p>
      </div>

      {/* Branding images */}
      <div className={`${cardClass} grid grid-cols-1 gap-6 sm:grid-cols-2`}>
        <div>
          <h2 className="mb-3 font-semibold">Logo</h2>
          <img src={logoPreview || form.logo?.url || "https://placehold.co/80x80"} alt="Logo preview" className="mb-3 h-20 w-20 rounded-full object-cover" />
          <input type="file" accept="image/*" onChange={handleLogoFile} className="text-sm" />
          {logoFile && <button onClick={uploadLogo} className="btn-primary mt-3 !px-4 !py-2 text-xs">Upload Logo</button>}
        </div>
        <div>
          <h2 className="mb-3 font-semibold">Hero Background Image</h2>
          <img src={heroPreview || form.heroImage?.url || "https://placehold.co/160x90"} alt="Hero preview" className="mb-3 h-24 w-full rounded-xl object-cover" />
          <input type="file" accept="image/*" onChange={handleHeroFile} className="text-sm" />
          {heroFile && <button onClick={uploadHero} className="btn-primary mt-3 !px-4 !py-2 text-xs">Upload Hero Image</button>}
        </div>
      </div>

      <form onSubmit={handleSaveText} className="space-y-8">
        {/* Branding text */}
        <div className={cardClass}>
          <h2 className="mb-4 font-semibold">Branding</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Website name</label>
              <input value={form.websiteName} onChange={(e) => update("websiteName", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Tagline</label>
              <input value={form.tagline} onChange={(e) => update("tagline", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Hero heading</label>
              <input value={form.heroHeading} onChange={(e) => update("heroHeading", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Hero subheading</label>
              <input value={form.heroSubheading} onChange={(e) => update("heroSubheading", e.target.value)} className={inputClass} />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className={cardClass}>
          <h2 className="mb-4 font-semibold">Contact Details</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium">Address</label>
              <input value={form.address} onChange={(e) => update("address", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Phone</label>
              <input value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Email</label>
              <input value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium">Google Maps embed URL</label>
              <input value={form.mapEmbedUrl} onChange={(e) => update("mapEmbedUrl", e.target.value)} className={inputClass} placeholder="https://www.google.com/maps/embed?..." />
            </div>
          </div>
        </div>

        {/* Social */}
        <div className={cardClass}>
          <h2 className="mb-4 font-semibold">Social Media</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Instagram handle (display)</label>
              <input value={form.instagramHandle} onChange={(e) => update("instagramHandle", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Instagram URL</label>
              <input value={form.social?.instagram} onChange={(e) => update("social.instagram", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Facebook URL</label>
              <input value={form.social?.facebook} onChange={(e) => update("social.facebook", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Twitter / X URL</label>
              <input value={form.social?.twitter} onChange={(e) => update("social.twitter", e.target.value)} className={inputClass} />
            </div>
          </div>
        </div>

        {/* Theme */}
        <div className={cardClass}>
          <h2 className="mb-4 font-semibold">Theme Colors</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {["primary", "secondary", "accent", "background"].map((key) => (
              <div key={key}>
                <label className="mb-1.5 block text-sm font-medium capitalize">{key}</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={form.theme?.[key]} onChange={(e) => update(`theme.${key}`, e.target.value)} className="h-10 w-10 cursor-pointer rounded-lg border border-stone-300 dark:border-stone-700" />
                  <input value={form.theme?.[key]} onChange={(e) => update(`theme.${key}`, e.target.value)} className={`${inputClass} !py-2`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? "Saving…" : "Save All Changes"}
        </button>
      </form>
    </div>
  );
};

export default SiteSettings;
