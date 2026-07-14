import asyncHandler from "express-async-handler";
import Testimonial from "../models/Testimonial.js";

// @desc    Get visible testimonials
// @route   GET /api/testimonials
export const getTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find({ isVisible: true }).sort({ createdAt: -1 });
  res.json({ success: true, testimonials });
});

// @desc    Create testimonial
// @route   POST /api/testimonials
// @access  Private (admin)
export const createTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.create(req.body);
  res.status(201).json({ success: true, testimonial });
});

// @desc    Update testimonial
// @route   PUT /api/testimonials/:id
// @access  Private (admin)
export const updateTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!testimonial) {
    res.status(404);
    throw new Error("Testimonial not found");
  }
  res.json({ success: true, testimonial });
});

// @desc    Delete testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private (admin)
export const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
  if (!testimonial) {
    res.status(404);
    throw new Error("Testimonial not found");
  }
  res.json({ success: true, message: "Testimonial deleted" });
});
