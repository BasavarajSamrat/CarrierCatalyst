import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "https://carriercatalyst-7.onrender.com", // Set your deployed backend URL here
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`, // Add the token from localStorage
  },
});

export default axiosInstance;
