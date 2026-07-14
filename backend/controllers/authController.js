import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

// @desc    Login admin (hardcoded credentials — no DB lookup)
// @route   POST /api/auth/login
// @access  Public
export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@cafe.com" && password === "admin") {
    return res.json({
      success: true,
      admin: {
        id: "temp-admin",
        name: "Administrator",
        email: "admin@cafe.com",
      },
      token: generateToken("temp-admin"),
    });
  }

  res.status(401);
  throw new Error("Invalid email or password");
});

// @desc    Get logged-in admin profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    admin: req.admin,
  });
});
