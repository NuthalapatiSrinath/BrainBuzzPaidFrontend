import apiClient from "./apiClient";

// Auth Routes
export const login = (credentials) =>
  apiClient.post("/auth/login", credentials);
export const register = (userData) =>
  apiClient.post("/auth/register", userData);

// You can add all your other backend routes here
// export const getCurrentAffairs = () => apiClient.get('/current-affairs');
// ...etc
