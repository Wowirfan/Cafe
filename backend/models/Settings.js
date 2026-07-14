import mongoose from "mongoose";

/**
 * Single-document collection holding every editable "site config" value —
 * this is what makes the admin dashboard able to change branding, hero
 * content, theme colors, and contact/social info without touching code.
 */
const settingsSchema = new mongoose.Schema(
  {
    websiteName: { type: String, default: "Brew & Bloom" },
    tagline: { type: String, default: "Coffee, crafted with care." },
    logo: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    heroImage: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    heroHeading: { type: String, default: "Welcome to Brew & Bloom" },
    heroSubheading: {
      type: String,
      default: "Small-batch coffee and all-day breakfast in the heart of the city.",
    },
    address: { type: String, default: "123 Main Street, Springfield" },
    phone: { type: String, default: "+1 (555) 123-4567" },
    email: { type: String, default: "hello@brewandbloom.com" },
    mapEmbedUrl: { type: String, default: "" },
    instagramHandle: { type: String, default: "@brewandbloom" },
    social: {
      instagram: { type: String, default: "" },
      facebook: { type: String, default: "" },
      twitter: { type: String, default: "" },
      tiktok: { type: String, default: "" },
    },
    theme: {
      primary: { type: String, default: "#6F4E37" }, // coffee brown
      secondary: { type: String, default: "#C7A17A" }, // latte tan
      accent: { type: String, default: "#2E6F4E" }, // botanical green
      background: { type: String, default: "#FBF7F2" },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Settings", settingsSchema);
