import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./model";
import projectService from "./projectService";

// Crete new Project
export const createProject = createAsyncThunk(
  "projects/create",
  async (projectData, thunkAPI) => {
    try {
      return await projectService.createProject(projectData);
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

// Get all projects
export const getAllProjects = createAsyncThunk(
  "projects/getAllProjects",
  async (_, thunkAPI) => {
    try {
      return await projectService.getAllProjects();
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

export const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.isCreatedSuccess = false;
      state.message = "";
    },
    openNewProjectModal: (state) => {
      state.newProjectModalOpen = true;
    },
    closeNewProjectModal: (state) => {
      state.newProjectModalOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isCreatedSuccess = true;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projects = action.payload;
      })
      .addCase(getAllProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, openNewProjectModal, closeNewProjectModal } =
  projectSlice.actions;
export default projectSlice.reducer;
