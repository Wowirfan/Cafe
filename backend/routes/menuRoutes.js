import express from "express";
import {
  getMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuController.js";
import { protect } from "../middleware/auth.js";
import { uploadMenuImage } from "../middleware/upload.js";

const router = express.Router();

router.get("/", getMenuItems);
router.get("/:id", getMenuItem);
router.post("/", protect, uploadMenuImage.single("image"), createMenuItem);
router.put("/:id", protect, uploadMenuImage.single("image"), updateMenuItem);
router.delete("/:id", protect, deleteMenuItem);

export default router;
