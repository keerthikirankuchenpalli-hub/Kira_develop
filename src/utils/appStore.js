import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedslice";

const appStore = configureStore({
  reducer: {
    user: userReducer,   // put the reducer inside this object
    feed: feedReducer,
  },
});

export default appStore;
