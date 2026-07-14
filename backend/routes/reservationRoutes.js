import express from "express";
import {
  createReservation,
  getReservations,
  updateReservation,
  deleteReservation,
} from "../controllers/reservationController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", createReservation);
router.get("/", protect, getReservations);
router.put("/:id", protect, updateReservation);
router.delete("/:id", protect, deleteReservation);

export default router;
