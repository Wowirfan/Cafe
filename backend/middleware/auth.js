import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized — no token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = { id: decoded.id, email: "admin@cafe.com", name: "Administrator" };
    next();
  } catch (err) {
    res.status(401);
    throw new Error("Not authorized — invalid or expired token");
  }
});
