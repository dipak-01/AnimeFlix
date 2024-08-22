import { configureStore } from "@reduxjs/toolkit";
import homePageReducer from "./slice/homePageSlice";
import animeInfoReducer from "./slice/animeInfoSlice";
import { userDataReducer, updateUserDataReducer } from "./slice/userSlice";

export const store = configureStore({
  reducer: {
    homePage: homePageReducer,
    animeInfo: animeInfoReducer,
    userData: userDataReducer,
    updateUserDate: updateUserDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
