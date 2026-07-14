import asyncHandler from "express-async-handler";
import ContactMessage from "../models/ContactMessage.js";

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
export const createContactMessage = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    res.status(400);
    throw new Error("Name, email, and message are required");
  }

  const contactMessage = await ContactMessage.create({ name, email, subject, message });
  res.status(201).json({
    success: true,
    message: "Message sent — we'll get back to you soon.",
    contactMessage,
  });
});

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private (admin)
export const getContactMessages = asyncHandler(async (req, res) => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 });
  res.json({ success: true, count: messages.length, messages });
});

// @desc    Mark message read / delete
// @route   PUT /api/contact/:id
export const updateContactMessage = asyncHandler(async (req, res) => {
  const msg = await ContactMessage.findById(req.params.id);
  if (!msg) {
    res.status(404);
    throw new Error("Message not found");
  }
  if (req.body.read !== undefined) msg.read = req.body.read;
  await msg.save();
  res.json({ success: true, message: msg });
});

// @route   DELETE /api/contact/:id
export const deleteContactMessage = asyncHandler(async (req, res) => {
  const msg = await ContactMessage.findById(req.params.id);
  if (!msg) {
    res.status(404);
    throw new Error("Message not found");
  }
  await msg.deleteOne();
  res.json({ success: true, message: "Message deleted" });
});
