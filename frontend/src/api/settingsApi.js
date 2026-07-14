import api from "./axios.js";

export const getSettings = () => api.get("/settings");
export const updateSettings = (data) => api.put("/settings", data);
export const updateLogo = (formData) =>
  api.put("/settings/logo", formData, { headers: { "Content-Type": "multipart/form-data" } });
export const updateHeroImage = (formData) =>
  api.put("/settings/hero-image", formData, { headers: { "Content-Type": "multipart/form-data" } });
