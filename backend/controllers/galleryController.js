import asyncHandler from "express-async-handler";
import GalleryImage from "../models/GalleryImage.js";
import { cloudinary } from "../config/cloudinary.js";

// @desc    Get all gallery images
// @route   GET /api/gallery
export const getGalleryImages = asyncHandler(async (req, res) => {
  const images = await GalleryImage.find().sort({ order: 1, createdAt: -1 });
  res.json({ success: true, count: images.length, images });
});

// @desc    Upload gallery image(s)
// @route   POST /api/gallery
// @access  Private (admin)
export const addGalleryImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("No image file provided");
  }

  const image = await GalleryImage.create({
    title: req.body.title || "",
    image: { url: req.file.path, publicId: req.file.filename },
  });

  res.status(201).json({ success: true, image });
});

// @desc    Delete gallery image
// @route   DELETE /api/gallery/:id
// @access  Private (admin)
export const deleteGalleryImage = asyncHandler(async (req, res) => {
  const image = await GalleryImage.findById(req.params.id);
  if (!image) {
    res.status(404);
    throw new Error("Image not found");
  }

  await cloudinary.uploader.destroy(image.image.publicId).catch(() => {});
  await image.deleteOne();
  res.json({ success: true, message: "Image deleted" });
});
