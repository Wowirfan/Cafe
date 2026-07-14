import api from "./axios.js";

export const getAnalytics = () => api.get("/analytics");
