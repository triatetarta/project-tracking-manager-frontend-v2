import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./model";

export const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    toggleAccount: (state) => {
      state.accountOpen = !state.accountOpen;
    },
    closeAccount: (state) => {
      state.accountOpen = false;
    },
  },
});

export const { toggleAccount, closeAccount } = headerSlice.actions;
export default headerSlice.reducer;
