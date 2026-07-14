import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      required: true,
      enum: ["Coffee", "Tea", "Cold Drinks", "Desserts", "Snacks", "Breakfast"],
    },
    image: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    isFeatured: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

menuItemSchema.index({ name: "text", description: "text" });

export default mongoose.model("MenuItem", menuItemSchema);
