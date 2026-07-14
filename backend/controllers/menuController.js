import asyncHandler from "express-async-handler";
import MenuItem from "../models/MenuItem.js";
import { cloudinary } from "../config/cloudinary.js";

// @desc    Get all menu items (supports ?category= & ?search=)
// @route   GET /api/menu
// @access  Public
export const getMenuItems = asyncHandler(async (req, res) => {
  const { category, search, featured } = req.query;
  const filter = {};

  if (category && category !== "All") filter.category = category;
  if (featured === "true") filter.isFeatured = true;
  if (search) filter.$text = { $search: search };

  const items = await MenuItem.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, count: items.length, items });
});

// @desc    Get single menu item
// @route   GET /api/menu/:id
export const getMenuItem = asyncHandler(async (req, res) => {
  const item = await MenuItem.findById(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error("Menu item not found");
  }
  res.json({ success: true, item });
});

// @desc    Create menu item
// @route   POST /api/menu
// @access  Private (admin)
export const createMenuItem = asyncHandler(async (req, res) => {
  const { name, description, price, category, isFeatured, isAvailable } = req.body;

  const item = await MenuItem.create({
    name,
    description,
    price,
    category,
    isFeatured: isFeatured === "true" || isFeatured === true,
    isAvailable: isAvailable === undefined ? true : isAvailable,
    image: req.file
      ? { url: req.file.path, publicId: req.file.filename }
      : undefined,
  });

  res.status(201).json({ success: true, item });
});

// @desc    Update menu item
// @route   PUT /api/menu/:id
// @access  Private (admin)
export const updateMenuItem = asyncHandler(async (req, res) => {
  const item = await MenuItem.findById(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error("Menu item not found");
  }

  const fields = ["name", "description", "price", "category", "isFeatured", "isAvailable"];
  fields.forEach((f) => {
    if (req.body[f] !== undefined) item[f] = req.body[f];
  });

  // Replace image if a new one was uploaded
  if (req.file) {
    if (item.image?.publicId) {
      await cloudinary.uploader.destroy(item.image.publicId).catch(() => {});
    }
    item.image = { url: req.file.path, publicId: req.file.filename };
  }

  await item.save();
  res.json({ success: true, item });
});

// @desc    Delete menu item
// @route   DELETE /api/menu/:id
// @access  Private (admin)
export const deleteMenuItem = asyncHandler(async (req, res) => {
  const item = await MenuItem.findById(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error("Menu item not found");
  }

  if (item.image?.publicId) {
    await cloudinary.uploader.destroy(item.image.publicId).catch(() => {});
  }
  await item.deleteOne();
  res.json({ success: true, message: "Menu item deleted" });
});
