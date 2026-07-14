import express from "express";
import {
  createContactMessage,
  getContactMessages,
  updateContactMessage,
  deleteContactMessage,
} from "../controllers/contactController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", createContactMessage);
router.get("/", protect, getContactMessages);
router.put("/:id", protect, updateContactMessage);
router.delete("/:id", protect, deleteContactMessage);

export default router;
