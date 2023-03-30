import axios from "axios";
import { getValueFor } from "../secureStore";

const customFetch = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

customFetch.interceptors.request.use(async (config) => {
  const token = await getValueFor("token");

  config.headers["Authorization"] = `Bearer ${token}`;

  return config;
});

export default customFetch;
