import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const getToken = () => localStorage.getItem("token");
const API_URL = `${import.meta.env.VITE_BACKEND_SERVER_PORT}`;
export const fetchUserData = createAsyncThunk("fetchUserData", async () => {
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
    const response =await axios.get(`${API_URL}/user`, config);
     
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
});

const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default userDataSlice.reducer;
