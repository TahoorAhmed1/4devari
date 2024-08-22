import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { request } from "../request";
import { removeEmptyFields } from "../../utils";
import { message } from "antd";

const initialState = {
  loading: false,
  error: "",

  projectPoints: [],
  projects: [],
  loadingProjects: false,
  loadingProjectPoints: false,

  userProjects: [],
  loadingUserProjects: false,
  
};

export const fetchProjects = createAsyncThunk(
  "project/fetchProjects",
  async (query, thunkAPI) => {
    const response = await request
      .get(`project${query?.length > 0 ? `?${query}` : ""}`)
      .then((response) => response.data);
    return response;
  }
);

export const fetchProjectPoints = createAsyncThunk(
  "project/fetchProjectPoints",
  async (query, thunkAPI) => {
    const response = await request
      .get(`project/points${query?.length > 0 ? `?${query}` : ""}`)
      .then((response) => response.data);
    return response;
  }
);

// USER PROPERIES REQUEST

export const fetchUserProjects = createAsyncThunk(
  "project/fetchUserProjects",
  async ({ id, query }, thunkAPI) => {
    const response = await request
      .get(`project/user/${id}${query?.length > 0 ? `?${query}` : ""}`)
      .then((response) => response.data);
    return response;
  }
);


const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    updateProjectState: (state, action) => {
      state[action?.payload?.key] = action?.payload?.value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      // console.log("HYDRATE", action.payload);
    });

    builder.addCase(fetchProjects.pending, (state) => {
      state.loadingProjects = true;
    });
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.loadingProjects = false;
      state.projects = action.payload;
      state.error = "";
    });
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.loadingProjects = false;
      state.projects = [];
      state.error = action.error.message;
    });

    builder.addCase(fetchProjectPoints.pending, (state) => {
      state.loadingProjectPoints = true;
    });
    builder.addCase(fetchProjectPoints.fulfilled, (state, action) => {
      state.loadingProjectPoints = false;
      state.projectPoints = action.payload;
      state.error = "";
    });
    builder.addCase(fetchProjectPoints.rejected, (state, action) => {
      state.loadingProjectPoints = false;
      state.projectPoints = [];
      state.error = action.error.message;
    });

    // User Reducers

    builder.addCase(fetchUserProjects.pending, (state) => {
      state.loadingUserProjects = true;
      state.loading = true;
    });
    builder.addCase(fetchUserProjects.fulfilled, (state, action) => {
      state.loadingUserProjects = false;
      state.loading = false;
      state.userProjects = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUserProjects.rejected, (state, action) => {
      state.loadingUserProjects = false;
      state.loading = false;
      state.userProjects = [];
      state.error = action.error.message;
    });

  },
});

export const { updateProjectState } = projectSlice.actions;

export default projectSlice.reducer;
