import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    message: { type: String, required: true },
    avatarUrl: { type: String, default: "" },
    isVisible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Testimonial", testimonialSchema);
