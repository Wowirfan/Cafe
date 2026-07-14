import React from "react";
import { FiMapPin, FiPhone, FiMail, FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi";
import ContactForm from "../components/ContactForm.jsx";
import MapEmbed from "../components/MapEmbed.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { useSettings } from "../context/SettingsContext.jsx";

const Contact = () => {
  const { settings } = useSettings();

  return (
    <div className="container-px mx-auto max-w-7xl pb-24 pt-16">
      <SectionHeading eyebrow="Get in Touch" title="Contact Us" subtitle="Questions, feedback, or catering requests — we'd love to hear from you." />

      <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-stone-100 dark:bg-stone-900 dark:ring-stone-800 sm:p-10">
          <ContactForm />
        </div>

        <div className="flex flex-col gap-8">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <FiMapPin className="mt-1 shrink-0 text-primary" />
              <span>{settings?.address}</span>
            </div>
            <div className="flex items-center gap-3">
              <FiPhone className="shrink-0 text-primary" />
              <span>{settings?.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <FiMail className="shrink-0 text-primary" />
              <span>{settings?.email}</span>
            </div>
            <div className="flex gap-3 pt-2">
              {settings?.social?.instagram && (
                <a href={settings.social.instagram} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
                  <FiInstagram size={17} />
                </a>
              )}
              {settings?.social?.facebook && (
                <a href={settings.social.facebook} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
                  <FiFacebook size={17} />
                </a>
              )}
              {settings?.social?.twitter && (
                <a href={settings.social.twitter} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
                  <FiTwitter size={17} />
                </a>
              )}
            </div>
          </div>
          <MapEmbed height="320px" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
