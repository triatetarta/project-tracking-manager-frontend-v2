import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./model";

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openTicketModal: (state) => {
      state.ticketModalOpen = true;
    },
    closeTicketModal: (state) => {
      state.ticketModalOpen = false;
    },
    openCommentModal: (state) => {
      state.commentModalOpen = true;
    },
    closeCommentModal: (state) => {
      state.commentModalOpen = false;
    },
    setCommentId: (state, action) => {
      state.commentId = action.payload;
    },
  },
});

export const {
  openTicketModal,
  closeTicketModal,
  openCommentModal,
  closeCommentModal,
  setCommentId,
} = modalSlice.actions;
export default modalSlice.reducer;
