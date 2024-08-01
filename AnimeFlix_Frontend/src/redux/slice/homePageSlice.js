import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchHomePage = createAsyncThunk("fetchHomePage", async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_ANIME_URL}/anime/home`,
    {
      crossdomain: true,
    },
  );
  return response;
});

const homePageSlice = createSlice({
  name: "homePage",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHomePage.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchHomePage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchHomePage.rejected, (state, action) => {
        console.log("Error", action.payload);
        state.isError = true;
    });
  },
});

export default homePageSlice.reducer;