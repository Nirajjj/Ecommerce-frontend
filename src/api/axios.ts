import axios from "axios";
import toast from "react-hot-toast";
axios.defaults.withCredentials = true;
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      url: error.config?.url,
    });

    // Scenario A: Network failure or Timeout (Backend is completely unreachable)
    if (!error.response) {
      // Execute global UI trigger here (e.g., toast.error("Network Error: Check your connection"))
      return Promise.reject(
        new Error("Network Error. Please check your connection."),
      );
    }

    // Scenario B: Unauthorized (Token expired or invalid)
    if (error.response.status === 401) {
      localStorage.removeItem("accessToken");
      // window.location.href = "/login"; // Force redirect to login page immediately
    }

    // Scenario C: Server Crashed
    if (error.response.status >= 500) {
      // Execute global UI trigger here (e.g., toast.error("Server is down. Try again later"))
      toast.error("Server is down. Try again later");
    }
    // Return error for React Query to handle
    return Promise.reject(error);
  },
);
export default api;
