import React, { useEffect, useState } from "react";
import { FiInstagram } from "react-icons/fi";
import * as galleryApi from "../api/galleryApi.js";
import { useSettings } from "../context/SettingsContext.jsx";

/**
 * Uses the gallery collection as a stand-in "Instagram grid" — avoids
 * needing an Instagram API integration while giving the same visual effect.
 * Swap in the real Instagram Graph API here if the client wants live posts.
 */
const InstagramSection = () => {
  const { settings } = useSettings();
  const [images, setImages] = useState([]);

  useEffect(() => {
    galleryApi.getGalleryImages().then((res) => setImages(res.data.images.slice(0, 6))).catch(() => {});
  }, []);

  if (!images.length) return null;

  return (
    <section className="py-24">
      <div className="container-px mx-auto max-w-7xl text-center">
        <p className="section-eyebrow mb-3">Follow Along</p>
        <h2 className="font-display text-3xl font-semibold sm:text-4xl">{settings?.instagramHandle}</h2>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {images.map((img) => (
            <a
              key={img._id}
              href={settings?.social?.instagram || "#"}
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square overflow-hidden rounded-xl"
            >
              <img src={img.image.url} alt={img.title || "Gallery"} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
                <FiInstagram size={22} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
