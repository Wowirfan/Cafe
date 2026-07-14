/**
 * Run with: npm run seed
 * Creates the initial admin account (from .env) and default settings doc
 * if they don't already exist. Safe to run multiple times.
 */
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Admin from "../models/Admin.js";
import Settings from "../models/Settings.js";

dotenv.config();

const run = async () => {
  await connectDB();

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log(`Admin ${email} already exists — skipping.`);
  } else {
    await Admin.create({ name: "Cafe Admin", email, password });
    console.log(`Created admin account: ${email}`);
  }

  const settings = await Settings.findOne();
  if (!settings) {
    await Settings.create({});
    console.log("Created default settings document.");
  } else {
    console.log("Settings document already exists — skipping.");
  }

  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
