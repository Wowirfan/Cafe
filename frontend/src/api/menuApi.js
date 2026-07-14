import api from "./axios.js";

export const getMenuItems = (params) => api.get("/menu", { params });
export const getMenuItem = (id) => api.get(`/menu/${id}`);
export const createMenuItem = (formData) =>
  api.post("/menu", formData, { headers: { "Content-Type": "multipart/form-data" } });
export const updateMenuItem = (id, formData) =>
  api.put(`/menu/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
export const deleteMenuItem = (id) => api.delete(`/menu/${id}`);
