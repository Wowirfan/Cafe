import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as menuApi from "../api/menuApi.js";
import MenuCard from "./MenuCard.jsx";
import SectionHeading from "./SectionHeading.jsx";

const FeaturedMenu = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    menuApi
      .getMenuItems({ featured: true })
      .then((res) => setItems(res.data.items.slice(0, 4)))
      .catch(() => {});
  }, []);

  if (!items.length) return null;

  return (
    <section className="container-px mx-auto max-w-7xl py-24">
      <SectionHeading eyebrow="Fan Favorites" title="Featured on the Menu" subtitle="A few things our regulars never skip." />
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <MenuCard key={item._id} item={item} />
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link to="/menu" className="btn-outline">
          View Full Menu
        </Link>
      </div>
    </section>
  );
};

export default FeaturedMenu;
