import React from "react";
import { useSettings } from "../context/SettingsContext.jsx";

const MapEmbed = ({ height = "420px" }) => {
  const { settings } = useSettings();
  const src =
    settings?.mapEmbedUrl ||
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.086!2d-122.419!3d37.774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1";

  return (
    <div className="overflow-hidden rounded-2xl shadow-sm ring-1 ring-stone-200 dark:ring-stone-800" style={{ height }}>
      <iframe
        title="Cafe location"
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default MapEmbed;
