import apiClient from "./apiClient";

// ---------------------------
// Auth Routes
// ---------------------------
export const login = (credentials) =>
  apiClient.post("/auth/login", credentials);
export const register = (userData) =>
  apiClient.post("/auth/register", userData);
export const forgotPassword = (email) =>
  apiClient.post("/auth/forgot-password", email);
export const resetPassword = (data) =>
  apiClient.post("/auth/reset-password", data);

// ---------------------------
// Current Affairs Routes
// ---------------------------
export const getAllCategories = () =>
  apiClient.get("/currentaffairs/categories");

export const getCategoryLanding = (categoryKey) =>
  apiClient.get(`/currentaffairs/${categoryKey}`);

// ... add any other routes here

export const getArticlesList = (categoryKey, subId) =>
  apiClient.get(`/currentaffairs/${categoryKey}/${subId}/articles`);

export const getArticleDetail = (categoryKey, subId, articleId) =>
  apiClient.get(`/currentaffairs/${categoryKey}/${subId}/${articleId}`);

// ---------------------------
// You can add all your other routes here
// ---------------------------
