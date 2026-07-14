import express from "express";
import { loginAdmin, getMe } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
import Admin from "../models/Admin.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/me", protect, getMe);

// TEMPORARY route to create the first admin without running the seed script.
// Visit this URL once in the browser after deploying, then DELETE this route.
router.get("/create-admin-temp", async (req, res) => {
  try {
    const exists = await Admin.findOne({ email: "admin@cafe.com" });
    if (exists) {
      return res.json({ message: "Admin already exists", email: exists.email });
    }
    const admin = await Admin.create({
      name: "Cafe Admin",
      email: "admin@cafe.com",
      password: "YourPasswordHere123",
    });
    res.json({ message: "Admin created successfully", email: admin.email });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
