import axios from "axios";
const getToken = () => localStorage.getItem("token");

const API_URL = `${import.meta.env.VITE_BACKEND_SERVER_PORT}`;
export const register = async (username, email, password) => {
  const response = await axios.post(`${API_URL}/register`, {
    username,
    email,
    password,
  });
  console.log(response.data);
  return response.data;
};
export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  console.log(response.data);

  return response.data;
};
export const fetchUserData = async () => {
  const token = getToken();
  console.log(token);
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
