import axios from "axios";

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://jsonplaceholder.typicode.com";

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth tokens, logging, etc.
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request in development
    if (import.meta.env.DEV) {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    }

    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling responses and errors
apiClient.interceptors.response.use(
  (response) => {
    // Log response in development
    if (import.meta.env.DEV) {
      console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
    }

    return response;
  },
  (error) => {
    // Handle common error cases
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - redirect to login or clear token
          localStorage.removeItem("authToken");
          window.location.href = "/login";
          break;
        case 403:
          console.error("❌ Forbidden: You do not have permission to access this resource");
          break;
        case 404:
          console.error("❌ Not Found: The requested resource was not found");
          break;
        case 500:
          console.error("❌ Server Error: Internal server error occurred");
          break;
        default:
          console.error(`❌ API Error: ${status} - ${data?.message || "Unknown error"}`);
      }
    } else if (error.request) {
      // Network error
      console.error("❌ Network Error: No response received from server");
    } else {
      // Other error
      console.error("❌ Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
