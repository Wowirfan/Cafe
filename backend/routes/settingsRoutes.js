import express from "express";
import {
  getSettings,
  updateSettings,
  updateLogo,
  updateHeroImage,
} from "../controllers/settingsController.js";
import { protect } from "../middleware/auth.js";
import { uploadBrandingImage } from "../middleware/upload.js";

const router = express.Router();

router.get("/", getSettings);
router.put("/", protect, updateSettings);
router.put("/logo", protect, uploadBrandingImage.single("image"), updateLogo);
router.put("/hero-image", protect, uploadBrandingImage.single("image"), updateHeroImage);

export default router;
