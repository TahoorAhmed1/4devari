import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { request } from "../request";

const initialState = {
  loading: false,
  images: [],
  videos: [],
  documents: [],
  addPropertyData: {},
  error: "",
};

export const uploadImages = createAsyncThunk(
  "upload/uploadImages",
  async (payload, thunkAPI) => {
    const response = await request
      .post("https://api.cloudinary.com/v1_1/dttbpzogu/image/upload", payload)
      .then((response) => response.data);
    return response;
  }
);

export const uploadVideos = createAsyncThunk(
  "upload/uploadVideos",
  async (payload, thunkAPI) => {
    const response = await request
      .post("https://api.cloudinary.com/v1_1/dttbpzogu/video/upload", payload)
      .then((response) => response.data);
    return response;
  }
);

export const uploadDocuments = createAsyncThunk(
  "upload/uploadDocuments",
  async (payload, thunkAPI) => {
    const response = await request
      .post("https://api.cloudinary.com/v1_1/dguh6qtem/auto/upload", payload)
      .then((response) => response.data);
    return response;
  }
);

export const addPropertySubmit = createAsyncThunk(
  "upload/addPropertySubmit",
  async (payload, thunkAPI) => {
    const response = await request
      .post(".api/submit", payload)
      .then((response) => response.data);
    return response;
  }
);

const cloudinaryUploadSlice = createSlice({
  name: "cloudinaryUpload",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      // console.log("HYDRATE", action.payload);

      state.images = action?.payload?.cloudinaryUpload?.images
        ? action?.payload?.cloudinaryUpload?.images
        : state?.images;
    });
    builder.addCase(uploadImages.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(uploadImages.fulfilled, (state, action) => {
      state.loading = false;
      state.images = action.payload;
      state.error = "";
    });
    builder.addCase(uploadImages.rejected, (state, action) => {
      state.loading = false;
      state.images = [];
      state.error = action.error.message;
    });

    builder.addCase(uploadVideos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(uploadVideos.fulfilled, (state, action) => {
      state.loading = false;
      state.videos = action.payload;
      state.error = "";
    });
    builder.addCase(uploadVideos.rejected, (state, action) => {
      state.loading = false;
      state.videos = [];
      state.error = action.error.message;
    });

    builder.addCase(uploadDocuments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(uploadDocuments.fulfilled, (state, action) => {
      state.loading = false;
      state.documents = action.payload;
      state.error = "";
    });
    builder.addCase(uploadDocuments.rejected, (state, action) => {
      state.loading = false;
      state.documents = [];
      state.error = action.error.message;
    });

    builder.addCase(addPropertySubmit.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addPropertySubmit.fulfilled, (state, action) => {
      state.loading = false;
      state.addPropertyData = action.payload;
      state.error = "";
    });
    builder.addCase(addPropertySubmit.rejected, (state, action) => {
      state.loading = false;
      state.documents = [];
      state.error = action.error.message;
    });
  },
});

export default cloudinaryUploadSlice.reducer;
