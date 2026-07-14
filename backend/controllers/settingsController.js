import asyncHandler from "express-async-handler";
import Settings from "../models/Settings.js";
import { cloudinary } from "../config/cloudinary.js";

// Settings is a singleton document — fetch it, creating the default doc on first run.
const getOrCreateSettings = async () => {
  let settings = await Settings.findOne();
  if (!settings) settings = await Settings.create({});
  return settings;
};

// @desc    Get site settings (public — powers the whole front-end)
// @route   GET /api/settings
export const getSettings = asyncHandler(async (req, res) => {
  const settings = await getOrCreateSettings();
  res.json({ success: true, settings });
});

// @desc    Update text-based settings (name, tagline, contact, social, theme, map)
// @route   PUT /api/settings
// @access  Private (admin)
export const updateSettings = asyncHandler(async (req, res) => {
  const settings = await getOrCreateSettings();

  const editableFields = [
    "websiteName",
    "tagline",
    "heroHeading",
    "heroSubheading",
    "address",
    "phone",
    "email",
    "mapEmbedUrl",
    "instagramHandle",
  ];
  editableFields.forEach((f) => {
    if (req.body[f] !== undefined) settings[f] = req.body[f];
  });

  if (req.body.social) settings.social = { ...settings.social.toObject(), ...req.body.social };
  if (req.body.theme) settings.theme = { ...settings.theme.toObject(), ...req.body.theme };

  await settings.save();
  res.json({ success: true, settings });
});

// @desc    Upload/replace the logo
// @route   PUT /api/settings/logo
// @access  Private (admin)
export const updateLogo = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("No image provided");
  }
  const settings = await getOrCreateSettings();
  if (settings.logo?.publicId) {
    await cloudinary.uploader.destroy(settings.logo.publicId).catch(() => {});
  }
  settings.logo = { url: req.file.path, publicId: req.file.filename };
  await settings.save();
  res.json({ success: true, settings });
});

// @desc    Upload/replace the hero background image
// @route   PUT /api/settings/hero-image
// @access  Private (admin)
export const updateHeroImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("No image provided");
  }
  const settings = await getOrCreateSettings();
  if (settings.heroImage?.publicId) {
    await cloudinary.uploader.destroy(settings.heroImage.publicId).catch(() => {});
  }
  settings.heroImage = { url: req.file.path, publicId: req.file.filename };
  await settings.save();
  res.json({ success: true, settings });
});
