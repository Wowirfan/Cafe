import api from "./axios.js";

export const sendContactMessage = (data) => api.post("/contact", data);
export const getContactMessages = () => api.get("/contact");
export const updateContactMessage = (id, data) => api.put(`/contact/${id}`, data);
export const deleteContactMessage = (id) => api.delete(`/contact/${id}`);
