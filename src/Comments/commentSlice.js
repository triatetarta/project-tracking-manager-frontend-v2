import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentService from "./commentService";
import { initialState } from "./model";

// Get Single Ticket Comments
export const getSingleTicketComments = createAsyncThunk(
  "comments/getSingleTicketComments",
  async (ticketId, thunkAPI) => {
    try {
      return await commentService.getSingleTicketComments(ticketId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create ticket comment
export const createComment = createAsyncThunk(
  "comments/create",
  async (commentData, thunkAPI) => {
    try {
      return await commentService.createComment(commentData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete ticket comment
export const deleteComment = createAsyncThunk(
  "comments/delete",
  async (commentId, thunkAPI) => {
    try {
      return await commentService.deleteComment(commentId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update ticket comment
export const updateComment = createAsyncThunk(
  "comments/update",
  async ({ commentId, commentData }, thunkAPI) => {
    try {
      return await commentService.updateComment(commentId, commentData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSingleTicketComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleTicketComments.fulfilled, (state, action) => {
        const { comments, count } = action.payload;

        state.isLoading = false;
        state.isSuccess = true;
        state.comments = comments;
        state.count = count;
      })
      .addCase(getSingleTicketComments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments.push(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments = state.comments.filter(
          (comment) => comment._id !== action.payload.id
        );
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        const { _id, comment: text } = action.payload;
        const comment = state.comments.find((item) => item._id === _id);
        comment.comment = text;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = commentSlice.actions;
export default commentSlice.reducer;
