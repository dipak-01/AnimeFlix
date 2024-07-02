import axios from "axios";

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
export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  console.log(response.data);
  return response.data;
};
export const user = async () => {
  const response = await axios.get(`${API_URL}/user`);
  console.log(response.data);
  return response.data;
};
