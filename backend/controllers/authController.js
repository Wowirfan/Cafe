import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Admin from "../models/Admin.js";

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

// @desc    Login admin
// @route   POST /api/auth/login
// @access  Public
export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide email and password");
  }

  const admin = await Admin.findOne({ email: email.toLowerCase() });

  if (admin && (await admin.matchPassword(password))) {
    res.json({
      success: true,
      admin: { id: admin._id, name: admin.name, email: admin.email },
      token: generateToken(admin._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Get logged-in admin profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
  res.json({ success: true, admin: req.admin });
});
let admin = await Admin.findOne({ email: email.toLowerCase() });

if (!admin) {
  if (
    email.toLowerCase() === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    admin = await Admin.create({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      name: "Administrator",
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }
}
