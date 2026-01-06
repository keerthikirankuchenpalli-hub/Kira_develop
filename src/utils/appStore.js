import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedslice";
import connectionsReducer from "./connectionsSlice";
import requestReducer from "./RequestSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,   
    feed: feedReducer,
    connections: connectionsReducer,
    requests: requestReducer,
  },
});

export default appStore;
