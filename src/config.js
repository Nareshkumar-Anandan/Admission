// src/config.js
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const AUTH_API = `${API_BASE_URL}/api/auth`;
export const APPLICATION_API = `${API_BASE_URL}/api/application`;
export const USER_API = `${API_BASE_URL}/api/user`;
export const ADMIN_API = `${API_BASE_URL}/api/admin`;
export const PAYMENT_API = `${API_BASE_URL}/api/payment`;
export const UPLOADS_URL = `${API_BASE_URL}/uploads`;
