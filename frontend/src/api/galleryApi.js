import api from "./axios.js";

export const getGalleryImages = () => api.get("/gallery");
export const addGalleryImage = (formData) =>
  api.post("/gallery", formData, { headers: { "Content-Type": "multipart/form-data" } });
export const deleteGalleryImage = (id) => api.delete(`/gallery/${id}`);
