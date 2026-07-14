import express from "express";
import {
  getGalleryImages,
  addGalleryImage,
  deleteGalleryImage,
} from "../controllers/galleryController.js";
import { protect } from "../middleware/auth.js";
import { uploadGalleryImage } from "../middleware/upload.js";

const router = express.Router();

router.get("/", getGalleryImages);
router.post("/", protect, uploadGalleryImage.single("image"), addGalleryImage);
router.delete("/:id", protect, deleteGalleryImage);

export default router;
