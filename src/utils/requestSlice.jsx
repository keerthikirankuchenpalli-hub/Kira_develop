import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: {
    requests: [], 
  },
  reducers: {
    addRequests: (state, action) => {
      state.requests = Array.isArray(action.payload)
        ? action.payload
        : [];
    },
  },
});

export const { addRequests } = requestSlice.actions;
export default requestSlice.reducer;
