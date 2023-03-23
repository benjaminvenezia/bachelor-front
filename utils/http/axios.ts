import axios from "axios";
import { getValueFor } from "../secureStore";

const customFetch = axios.create({
  baseURL: "http://localhost:8000/api",
});

customFetch.interceptors.request.use((config) => {
  const token = getValueFor("token");

  config.headers["Authorization"] = `Bearer ${token}`;

  return config;
});

export default customFetch;
