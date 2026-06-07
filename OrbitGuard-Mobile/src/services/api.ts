import axios from "axios";

export const api = axios.create({
  baseURL: "https://orbitguard-api-deploy.onrender.com/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});