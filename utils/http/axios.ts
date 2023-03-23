import axios from "axios";

const customFetch = axios.create({
  baseURL: "http://localhost:8000/api",
});

// customFetch.interceptors.request.use((config) => {
//   const user = getUserFromLocalStorage();

//   if (user) {
//     const token = getTokenFromLocalStorage();
//     config.headers["Authorization"] = `Bearer ${token}`;
//   }
//   return config;
// });

export default customFetch;
