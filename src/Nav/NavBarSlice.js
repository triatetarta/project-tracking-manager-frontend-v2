import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./model";

export const NavBarSlice = createSlice({
  name: "navbar",
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

export const { toggleAccount, closeAccount } = NavBarSlice.actions;
export default NavBarSlice.reducer;
