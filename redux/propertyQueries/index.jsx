import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { request } from "../request";

const initialState = {
  loading: false,
  queryProperty: {},
  residentialQueryProperty: {},
  error: "",
};

// export const getQueryProperty = createAsyncThunk(
//   "property/getQueryProperty",
//   async (payload, thunkAPI) => {
//     const response = await request
//       .get(`/property?purpose=${payload?.purpose}&type=${payload?.type}&subtype=${payload?.subtype}?nPerPage=${payload?.perpage ? payload?.perpage : 10}&pageNumber=${payload?.pageNumer ? payload?.pageNumer : 1}${payload?.sortVar ? `?sort=${payload?.sortVar}` : ""}`, payload)
//       .then((response) => response.data);
//     return response;
//   }
// );

export const getQueryProperty = createAsyncThunk(
  "property/getQueryProperty",
  async (payload, thunkAPI) => {
    const queryParams = {
      subtype: payload?.subtype || [],
      address: payload?.address || "",
      purpose: payload?.purpose || "",
      type: payload?.type || "",
      city: payload?.city || "",
      location: payload?.location || "",
      nPerPage: payload?.perPage || 10,
      pageNumber: payload?.pageNumber || 1,
      sortVar: payload?.sortVar || "",
      minAreaSize: payload?.minArea || "",
      maxAreaSize: payload?.maxArea || "",
      minPrice: payload?.minPrice || "",
      maxPrice: payload?.maxPrice || "",
    };

    const response = await request
      .get("/property", { params: queryParams })
      .then((response) => response.data);

    return response;
  }
);

export const getResidentialQueryProperty = createAsyncThunk(
  "property/getResidentialQueryProperty",
  async (payload, thunkAPI) => {
    const queryParams = {
      subtype: payload?.subtype || [],
      address: payload?.address || "",
      purpose: payload?.purpose || "",
      city: payload?.city || "",
      location: payload?.location || "",
      nPerPage: payload?.perPage || 10,
      pageNumber: payload?.pageNumber || 1,
      sortVar: payload?.sortVar || "",
      minAreaSize: payload?.minArea || "",
      maxAreaSize: payload?.maxArea || "",
      minPrice: payload?.minPrice || "",
      maxPrice: payload?.maxPrice || "",
    };
    const response = await request
      .get(`/property/residential`, { params: queryParams }, payload)
      .then((response) => response.data);
    return response;
  }
);

// export const getResidentialQueryProperty = createAsyncThunk(
//     "property/getResidentialQueryProperty",
//     async (payload, thunkAPI) => {
//       const response = await request
//         .get(`/property/residential?purpose=${payload?.purpose}&subtype=${payload?.subtype}?nPerPage=${payload?.perpage ? payload?.perpage : 10}&pageNumber=${payload?.pageNumer ? payload?.pageNumer : 1}${payload?.sortVar ? `?sort=${payload?.sortVar}` : ""}`, payload)
//         .then((response) => response.data);
//       return response;
//     }
//   );

const propertyQuerySlice = createSlice({
  name: "addQueryProperty",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      state.queryProperty = action.payload.propertyQueries.queryProperty
        ? action.payload.propertyQueries.queryProperty
        : state.propertyQueries;
      state.residentialQueryProperty = action.payload.propertyQueries
        .residentialQueryProperty
        ? action.payload.propertyQueries.residentialQueryProperty
        : state.propertyQueries;
    });

    builder.addCase(getQueryProperty.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getQueryProperty.fulfilled, (state, action) => {
      state.loading = false;
      state.queryProperty = action.payload;
      state.error = "";
    });
    builder.addCase(getQueryProperty.rejected, (state, action) => {
      state.loading = false;
      state.queryProperty = {};
      state.error = action.error.message;
    });

    builder.addCase(getResidentialQueryProperty.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getResidentialQueryProperty.fulfilled, (state, action) => {
      state.loading = false;
      state.residentialQueryProperty = action.payload;
      state.error = "";
    });
    builder.addCase(getResidentialQueryProperty.rejected, (state, action) => {
      state.loading = false;
      state.residentialQueryProperty = {};
      state.error = action.error.message;
    });
  },
});

export default propertyQuerySlice.reducer;
