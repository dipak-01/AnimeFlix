import { configureStore } from "@reduxjs/toolkit";
import homePageReducer from "./slice/homePageSlice";
import animeInfoReducer from "./slice/animeInfoSlice";

export const store = configureStore({
  reducer: {
    homePage: homePageReducer,
    animeInfo: animeInfoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
