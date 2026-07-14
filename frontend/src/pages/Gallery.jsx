import React, { useEffect, useState } from "react";
import * as galleryApi from "../api/galleryApi.js";
import Lightbox from "../components/Lightbox.jsx";
import SectionHeading from "../components/SectionHeading.jsx";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    galleryApi.getGalleryImages().then((res) => setImages(res.data.images)).finally(() => setLoading(false));
  }, []);

  return (
    <div className="container-px mx-auto max-w-7xl pb-24 pt-16">
      <SectionHeading eyebrow="A Look Inside" title="Gallery" subtitle="Moments from our café — the space, the drinks, the people." />
      <div className="mt-12">
        {loading ? (
          <div className="py-20 text-center text-stone-400">Loading gallery…</div>
        ) : images.length === 0 ? (
          <div className="py-20 text-center text-stone-400">No images yet — check back soon.</div>
        ) : (
          <Lightbox images={images} />
        )}
      </div>
    </div>
  );
};

export default Gallery;
