import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./model";
import ticketService from "./ticketService";

// Crete new Ticket
export const createTicket = createAsyncThunk(
  "tickets/create",
  async (ticketData, thunkAPI) => {
    try {
      return await ticketService.createTicket(ticketData);
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

// Get all tickets
export const getTickets = createAsyncThunk(
  "tickets/getTickets",
  async (_, thunkAPI) => {
    try {
      return await ticketService.getTickets();
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

// Get single Ticket
export const getTicket = createAsyncThunk(
  "tickets/getSingle",
  async (ticketId, thunkAPI) => {
    try {
      return await ticketService.getTicket(ticketId);
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

// Delete ticket
export const deleteTicket = createAsyncThunk(
  "tickets/delete",
  async (ticketId, thunkAPI) => {
    try {
      return await ticketService.deleteTicket(ticketId);
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

// Update ticket
export const updateTicket = createAsyncThunk(
  "tickets/update",
  async ({ ticketId, ticketData }, thunkAPI) => {
    try {
      return await ticketService.updateTicket(ticketId, ticketData);
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
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTicket.fulfilled, (state) => {
        state.isLoading = false;
        state.createSuccess = true;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tickets = action.payload;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ticket = action.payload;
      })
      .addCase(getTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deleteSuccess = true;

        if (action.payload) {
          state.tickets = state?.tickets?.filter(
            (ticket) => ticket._id !== action.payload._id
          );
        }
      })
      .addCase(deleteTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateTicket.pending, (state) => {
        state.updateSuccess = false;
        state.isLoading = true;
      })
      .addCase(updateTicket.fulfilled, (state, action) => {
        const updatedTicked = state?.tickets?.find(
          (item) => item._id === action.payload._id
        );

        if (updatedTicked) {
          if (action.payload.description) {
            updatedTicked.description = action.payload.description;
          }
          if (action.payload.status) {
            updateTicket.status = action.payload.status;
          }
        }

        state.updateSuccess = true;
        state.isLoading = false;
      })
      .addCase(updateTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;
