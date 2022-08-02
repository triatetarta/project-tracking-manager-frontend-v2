import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./model";

export const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.createSuccess = false;
      state.deleteSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {},
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;
