import { api } from "./api";

export const getDefaultBangumi = () => api.get("/bangumi");