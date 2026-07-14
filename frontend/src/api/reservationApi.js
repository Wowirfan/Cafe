import api from "./axios.js";

export const createReservation = (data) => api.post("/reservations", data);
export const getReservations = (params) => api.get("/reservations", { params });
export const updateReservation = (id, data) => api.put(`/reservations/${id}`, data);
export const deleteReservation = (id) => api.delete(`/reservations/${id}`);
