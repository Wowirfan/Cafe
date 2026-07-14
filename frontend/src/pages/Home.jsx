import React from "react";
import Hero from "../components/Hero.jsx";
import FeaturedMenu from "../components/FeaturedMenu.jsx";
import Testimonials from "../components/Testimonials.jsx";
import InstagramSection from "../components/InstagramSection.jsx";
import MapEmbed from "../components/MapEmbed.jsx";
import SectionHeading from "../components/SectionHeading.jsx";

const Home = () => (
  <>
    <Hero />
    <FeaturedMenu />
    <Testimonials />
    <InstagramSection />
    <section className="container-px mx-auto max-w-7xl pb-24">
      <SectionHeading eyebrow="Find Us" title="Come Say Hello" />
      <div className="mt-10">
        <MapEmbed />
      </div>
    </section>
  </>
);

export default Home;
