import multer from "multer";
import { makeStorage } from "../config/cloudinary.js";

// Separate upload middlewares per Cloudinary folder, so gallery/menu/logo/hero
// images stay organized in the media library.
export const uploadMenuImage = multer({ storage: makeStorage("menu") });
export const uploadGalleryImage = multer({ storage: makeStorage("gallery") });
export const uploadBrandingImage = multer({ storage: makeStorage("branding") });
