import axios from "axios";
const getToken = () => localStorage.getItem("token");

const API_URL = "http://localhost:3000";
export const register = async (username, email, password) => {
  const response = await axios.post(`${API_URL}/register`, {
    username,
    email,
    password,
  });
  console.log(response.data);
  return response.data;
};
export const watchData = async (animeId, episodeId, token) => {
  console.log(animeId);
  const tokenn = getToken();

  if (!animeId || !episodeId || !tokenn) {
    console.error("Invalid parameters: ", { animeId, episodeId, tokenn });
    throw new Error("Invalid parameters");
  }
  try {
    const response = await axios.post(
      `${API_URL}/watchdata`,
      { animeId, episodeId }, // Assuming the API expects animeId and episodeId in the request body
      {
        headers: {
          Authorization: `Bearer ${tokenn}`, // Ensure token is correctly obtained and passed
        },
      }
    );
    console.log(response.data);
    return response.data; // It's usually more useful to return just the data part of the response
  } catch (error) {
    console.error("An error occurred:", error.response || error); // Log the error or handle it appropriately
    throw error; // Rethrowing the error might be more useful than just returning it
  }
};
export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  console.log(response.data);

  return response.data;
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
