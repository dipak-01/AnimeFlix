import axios from "axios";
const getToken = () => localStorage.getItem("token");

const API_URL = `${import.meta.env.VITE_BACKEND_SERVER_PORT}`;

export const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      email,
      password,
    });
     return response.data;
  } catch (error) {
    if (error.response) {
     
      console.error("Server Error:", error.response.data);
      throw new Error(error.response.data.message || "Registration failed");
    } else if (error.request) {
       
      console.error("Network Error:", error.request);
      throw new Error("Network error, please try again later");
    } else {
     
      console.error("Error:", error.message);
      throw new Error(error.message);
    }
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
     return response.data;
  } catch (error) {
    if (error.response) {
       
      console.error("Server Error:", error.response.data);
      throw new Error(error.response.data.message || "Login failed");
    } else if (error.request) {
       
      console.error("Network Error:", error.request);
      throw new Error("Network error, please try again later");
    } else {
      // Something else happened
      console.error("Error:", error.message);
      throw new Error(error.message);
    }
  }
};
export const fetchUserData = async () => {
  const token = getToken();

  if (!token) {
    console.error("No token found");
    return null;
  }
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${API_URL}/user`, config);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error data:", error.response.data);
      console.error("Error status:", error.response.status);
      console.error("Error headers:", error.response.headers);
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    console.error("Error config:", error.config);

    return null;
  }
};
