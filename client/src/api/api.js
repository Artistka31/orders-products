import axios from "axios";

console.log("API", import.meta.env.VITE_API_URL);

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
