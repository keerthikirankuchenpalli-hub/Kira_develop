import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedslice";
import connectionsReducer from "./connectionsSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,   // put the reducer inside this object
    feed: feedReducer,
    connections: connectionsReducer,
  },
});

export default appStore;
