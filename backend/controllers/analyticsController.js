import asyncHandler from "express-async-handler";
import Reservation from "../models/Reservation.js";
import MenuItem from "../models/MenuItem.js";
import GalleryImage from "../models/GalleryImage.js";
import ContactMessage from "../models/ContactMessage.js";

// @desc    Dashboard summary numbers
// @route   GET /api/analytics
// @access  Private (admin)
export const getAnalytics = asyncHandler(async (req, res) => {
  const [
    totalReservations,
    pendingReservations,
    totalMenuItems,
    totalGalleryImages,
    unreadMessages,
  ] = await Promise.all([
    Reservation.countDocuments(),
    Reservation.countDocuments({ status: "pending" }),
    MenuItem.countDocuments(),
    GalleryImage.countDocuments(),
    ContactMessage.countDocuments({ read: false }),
  ]);

  const recentReservations = await Reservation.find().sort({ createdAt: -1 }).limit(5);

  res.json({
    success: true,
    stats: {
      totalReservations,
      pendingReservations,
      totalMenuItems,
      totalGalleryImages,
      unreadMessages,
    },
    recentReservations,
  });
});
