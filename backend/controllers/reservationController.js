import asyncHandler from "express-async-handler";
import Reservation from "../models/Reservation.js";

// @desc    Create a reservation (public booking form)
// @route   POST /api/reservations
// @access  Public
export const createReservation = asyncHandler(async (req, res) => {
  const { name, phone, email, date, time, guests, notes } = req.body;

  if (!name || !phone || !email || !date || !time || !guests) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }

  const reservation = await Reservation.create({
    name,
    phone,
    email,
    date,
    time,
    guests,
    notes,
  });

  res.status(201).json({
    success: true,
    message: "Reservation received — we'll confirm shortly.",
    reservation,
  });
});

// @desc    Get all reservations (admin)
// @route   GET /api/reservations
// @access  Private (admin)
export const getReservations = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const filter = status ? { status } : {};
  const reservations = await Reservation.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, count: reservations.length, reservations });
});

// @desc    Update reservation status
// @route   PUT /api/reservations/:id
// @access  Private (admin)
export const updateReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);
  if (!reservation) {
    res.status(404);
    throw new Error("Reservation not found");
  }
  if (req.body.status) reservation.status = req.body.status;
  await reservation.save();
  res.json({ success: true, reservation });
});

// @desc    Delete reservation
// @route   DELETE /api/reservations/:id
// @access  Private (admin)
export const deleteReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);
  if (!reservation) {
    res.status(404);
    throw new Error("Reservation not found");
  }
  await reservation.deleteOne();
  res.json({ success: true, message: "Reservation deleted" });
});
