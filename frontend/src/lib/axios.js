import axios from "axios";

export const baseURL =
  import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api";

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});
