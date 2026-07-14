import mongoose from "mongoose";

const galleryImageSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    image: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("GalleryImage", galleryImageSchema);
