import axios from "axios";
import { triggerLogout } from "../provider/authService";

const api = axios.create({ baseURL: "http://localhost:8080" });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response.status === 401 &&
      !error.config.url.includes("/auth/login")
    ) {
      triggerLogout();
    }

    return Promise.reject(error);
  }
);

export default api;
