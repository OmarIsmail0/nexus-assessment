import axios from "axios";

// create a axios instance with default config

const baseUrl = import.meta.env.VITE_OMDB_API_URL;
console.log(baseUrl);
const agent = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// add a request interceptor
agent.interceptors.request.use((config) => {
  return config;
});

// add a response interceptor
agent.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { data, status } = error.response;
      switch (status) {
        case 401:
          console.warn("Unauthorized");
          break;
        case 403:
          console.error("Forbidden");
          break;
        case 404:
          console.error("Not Found");
          break;
        case 500:
          console.error("Internal Server Error");
          break;
        default:
          console.error(`API Error: ${status}: `, data?.message || "Unknown error");
          break;
      }
    } else if (error.request) {
      console.error("Network Error", error?.message || "Unknown error");
    } else {
      console.error("Error", error?.message || "Unknown error");
    }

    return Promise.reject(error);
  }
);

export default agent;
