import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { HYDRATE } from "next-redux-wrapper";
import { request } from "../request";

const initialState = {
  loadingEvents: false,
  eventData: {},
  analyticsData: [],

  reachDataByDate: {},
  loadingReachEvents: false,

  error: ""
};

export const addEvent = createAsyncThunk(
  "event/addEvent",
  async ({userId ,payload}, thunkAPI) => {
    const response = await request
      .post(`/event/${userId}`, payload)
      .then((response) => response.data);
    return response;
  }
);

export const getEventsOfUser = createAsyncThunk(
  "event/getEventsOfUser",
  async ({userId ,query}, thunkAPI) => {
    const response = await request
      .get(`/event/${userId}${query?.length > 0 ? `?${query}` : ""}`)
      .then((response) => response.data);
    return response;
  }
);

export const getAnalyticEventsOfUser = createAsyncThunk(
  "event/getAllAnalyticEventsOfUser",
  async ({userId ,query}, thunkAPI) => {
    const response = await request
      .get(`/event/analytics/${userId}${query?.length > 0 ? `?${query}` : ""}`)
      .then((response) => response.data);
    return response;
  }
);

export const getReachOfUserByDate = createAsyncThunk(
  "event/getReachOfUserByDate",
  async ({userId ,query}, thunkAPI) => {
    const response = await request
      .get(`/event/analytics/day/${userId}${query?.length > 0 ? `?${query}` : ""}`)
      .then((response) => response.data);
    return response;
  }
);

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    updateEventState: (state, action) => {
      state[action?.payload?.key] = action?.payload?.value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEventsOfUser.pending, (state) => {
      state.loadingEvents = true;
    });
    builder.addCase(getEventsOfUser.fulfilled, (state, action) => {
      state.loadingEvents = false;
      state.eventData = action.payload;
      state.error = "";
    });
    builder.addCase(getEventsOfUser.rejected, (state, action) => {
      state.loadingEvents = false;
      state.eventData = {};
      state.error = action.error.message;
    });
    builder.addCase(getAnalyticEventsOfUser.pending, (state) => {
      state.loadingEvents = true;
    });
    builder.addCase(getAnalyticEventsOfUser.fulfilled, (state, action) => {
      state.loadingEvents = false;
      state.analyticsData = action.payload;
      state.error = "";
    });
    builder.addCase(getAnalyticEventsOfUser.rejected, (state, action) => {
      state.loadingEvents = false;
      state.analyticsData = [];
      state.error = action.error.message;
    });

    builder.addCase(getReachOfUserByDate.pending, (state) => {
      state.loadingReachEvents = true;
    });
    builder.addCase(getReachOfUserByDate.fulfilled, (state, action) => {
      state.loadingReachEvents = false;
      state.reachDataByDate = action.payload;
      state.error = "";
    });
    builder.addCase(getReachOfUserByDate.rejected, (state, action) => {
      state.loadingReachEvents = false;
      state.reachDataByDate = {};
      state.error = action.error.message;
    });
  },
});

export const { updateEventState } = eventSlice.actions;

export default eventSlice.reducer;
