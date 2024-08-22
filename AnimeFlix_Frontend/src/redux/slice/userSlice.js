import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const getToken = () => localStorage.getItem("token");
const API_URL = `${import.meta.env.VITE_BACKEND_SERVER_PORT}`;

// Fetch user data
export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async () => {
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
      handleAxiosError(error);
      return null;
    }
  },
);

// Update user data
export const updateUserData = createAsyncThunk(
  "user/updateUserData",
  async ({ userName, oldPassword, newPassword, avatarUrl }) => {
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

      const response = await axios.post(
        `${API_URL}/user`,
        { userName, oldPassword, newPassword, avatarUrl },
        config,
      );

      return response.data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  },
);

// Helper function to handle Axios errors
const handleAxiosError = (error) => {
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
};

// Create user data slice
const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        console.log("Error", action.payload);
        state.isError = true;
      });
  },
});

// Create update user data slice
const updateUserDataSlice = createSlice({
  name: "updateUserData",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        console.log("Error", action.payload);
        state.isError = true;
      });
  },
});

export const userDataReducer = userDataSlice.reducer;
export const updateUserDataReducer = updateUserDataSlice.reducer;
