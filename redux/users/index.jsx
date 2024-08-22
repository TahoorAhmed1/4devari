import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { request } from "../request";
import { removeEmptyFields } from "../../utils";
import { message } from "antd";

const initialState = {
  loading: false,
  loadingUser: false,

  users: [],
  userData: {},
  userPassword: {},
  posts: [],
  updatePost: false,
  error: "",

  usersLikedProperties: {},
  loadingLikedProperties: false,

  usersLikedProjects: {},
  loadingLikedProjects: false,

  builders: {},
  loadingBuilders: false,

  feature_builders: {},
  feature_loadingBuilders: false,

  agencies: {},
  loadingAgengies: false,

  EliteAgencies: {},
  loadingEliteAgengies: false,

  allStaff: {},
  loadingAllStaff: false,
};

export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (_, thunkAPI) => {
    const response = await request
      .get("users")
      .then((response) => response.data);
    if (response) {
      await thunkAPI.dispatch(fetchPosts());
      await thunkAPI.dispatch(updatePostRequest());
    }
    return response;
  }
);
export const getUsersLikedProperties = createAsyncThunk(
  "user/getUsersLikedProperties",
  async ({userId, query}, thunkAPI) => {
    const response = await request
      .get(`user/likedProperties/${userId}${query?.length > 0 ? `?${query}` : ""}`)
      .then((response) => response.data);
    return response;
  }
);
export const getUsersLikedProjects = createAsyncThunk(
  "user/getUsersLikedProjects",
  async ({userId, query}, thunkAPI) => {
    const response = await request
      .get(`user/likedProjects/${userId}${query?.length > 0 ? `?${query}` : ""}`)
      .then((response) => response.data);
    return response;
  }
);
export const fetchUsersById = createAsyncThunk(
  "user/fetchUsersById",
  async (userId, thunkAPI) => {
    const response = await request
      .get(`user/${userId}`)
      .then((response) => response.data);
    return response;
  }
);
export const fetchAgentById = createAsyncThunk(
  "user/allStaffOfAgency/fetchAgentById",
  async (agentId, thunkAPI) => {
    const response = await request
      .get(`/user/allStaffOfAgency/${agentId}`)
      .then((response) => response.data);
    return response;
  }
);
export const fetchAllStaff = createAsyncThunk(
  "user/allStaff",
  async (thunkAPI) => {
    const response = await request
      .get(`/user/allStaff`)
      .then((response) => response.data);
    return response;
  }
);
export const updateUserById = createAsyncThunk(
  "user/updateUserById",
  async ({ userId, accessToken, payload }, thunkAPI) => {
    message.open({
      type: "loading",
      content: "updating account information",
      duration: 0,
    });
    removeEmptyFields(payload);
    try {
      const response = await request
        .patch(`user/${userId}`, payload, {
          headers: {
            "x-access-token": `${accessToken}`,
          },
        })
        .then((response) => response.data);

      message.destroy();
      message.success(`Account updated successfully`);
      return response;
    } catch (error) {
      message.destroy();
      message.error("Invalid request");
    }
  }
);
export const addUserSearch = createAsyncThunk(
  "user/addUserSearch",
  async ({ userId, accessToken, payload }, thunkAPI) => {
    removeEmptyFields(payload);
    try {
      const response = await request
        .patch(`user/search/${userId}`, payload, {
          headers: {
            "x-access-token": `${accessToken}`,
          },
        })
        .then((response) => response.data);
      return response;
    } catch (error) {
      console.log("Error", error);
    }
  }
);
export const updateLikedSearch = createAsyncThunk(
  "user/updateLikedSearch",
  async ({ userId, accessToken, payload, refetchQuery }, thunkAPI) => {
    removeEmptyFields(payload);
    try {
      const response = await request
        .patch(`user/search/${userId}`, payload, {
          headers: {
            "x-access-token": `${accessToken}`,
          },
        })
        .then((response) => response.data);
        
      await thunkAPI.dispatch(fetchUsersById(userId))
      if(refetchQuery){
        await thunkAPI.dispatch(getUsersLikedProperties({userId}))
        await thunkAPI.dispatch(getUsersLikedProjects({userId}))
      }

      return response;
    } catch (error) {
      console.log("Error", error);
    }
  }
);
export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async ({ userId, accessToken, payload }, thunkAPI) => {
    message.open({
      type: "loading",
      content: "updating account password",
      duration: 0,
    });
    try {
      const response = await request
        .patch(`/user/changePassword/${userId}`, payload, {
          headers: {
            "x-access-token": `${accessToken}`,
          },
        })
        .then((response) => response.data);

      message.destroy();
      message.success(`Password updated successfully`);
      return response;
    } catch (error) {
      message.destroy();
      message.error("Invalid request");
    }
  }
);
export const fetchPosts = createAsyncThunk("user/fetchPosts", (_, thunkAPI) => {
  return request.get("posts").then((response) => response.data);
});
export const fetchbuilders = createAsyncThunk(
  "user/allBuilders/fetchbuilders",
  async (query, thunkAPI) => {
    const response = await request
      .get(`/user/allBuilders${query?.length > 0 ? `?${query}` : ""}`)
      .then((response) => response.data);
    return response;
  }
);
export const fetchfeaturebuilders = createAsyncThunk(
  "user/allBuilders/fetchfeaturebuilders",
  async (thunkAPI) => {
    const response = await request
      .get("/user/allBuilders")
      .then((response) => response.data);
    return response;
  }
);
export const fetchAllagencies = createAsyncThunk(
  "user/allAgencies/fetchAllagencies",
  async (query, thunkAPI) => {
    const response = await request
      .get(`/user/allAgencies${query?.length > 0 ? `?${query}` : ""}`)
      .then((response) => response.data);
    return response;
  }
);
export const fetchEliteagencies = createAsyncThunk(
  "user/allAgencies/fetchEliteagencies",
  async (query, thunkAPI) => {
    const response = await request
      .get(`/user/allAgencies?verificationType=elite${query?.length > 0 ? `&${query}` : ""}`)
      .then((response) => response.data);
    return response;
  }
);

export const addSubscription = createAsyncThunk(
  "user/addSubscription",
  async ({ accessToken, payload }, thunkAPI) => {
    try {
      const response = await request
        .post(`subscription`, payload, {
          headers: {
            "x-access-token": `${accessToken}`,
          },
        })
        .then((response) => response.data);
      message.success(`Subscribed successfully!`, 3);
      return response;
    } catch (error) {
      console.log("Error", error);
      message.error(`${error?.response?.data?.message || "Invalid request"}`, 3);
    }
  }
);

export const sendContactDetail = createAsyncThunk(
  "user/sendContactDetail",
  async ({ accessToken, payload }, thunkAPI) => {
    try {
      const response = await request
        .post(`/user/sendContactEmail`, payload, {
          headers: {
            "x-access-token": `${accessToken}`,
          },
        })
        .then((response) => response.data);
      message.success(`Submitted successfully!`, 3);
      return response;
    } catch (error) {
      console.log("Error", error);
      message.error(`${error?.response?.data?.message || "Invalid request"}`, 3);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updatePostRequest: (state) => {
      state.updatePost = true;
    },
    updateUserState: (state, action) => {
      state[action?.payload?.key] = action?.payload?.value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      // console.log("HYDRATE", action.payload);

      state.updatePost = action.payload.users.updatePost
        ? action.payload.users.updatePost
        : state.updatePost;
      state.users =
        action.payload.users.users.length > 0
          ? action.payload.users.users
          : state.users;
      state.posts =
        action.payload.users.posts.length > 0
          ? action.payload.users.posts
          : state.posts;
    });
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
    builder.addCase(fetchUsersById.pending, (state) => {
      state.loading = true;
      state.loadingUser = true;
    });
    builder.addCase(fetchUsersById.fulfilled, (state, action) => {
      state.loading = false;
      state.loadingUser = false;
      state.userData = action.payload;
    });
    builder.addCase(fetchUsersById.rejected, (state, action) => {
      state.loading = false;
      state.loadingUser = false;
      state.error = action.error.message;
    });

    builder.addCase(getUsersLikedProperties.pending, (state) => {
      state.loadingLikedProperties = true;
    });
    builder.addCase(getUsersLikedProperties.fulfilled, (state, action) => {
      state.loadingLikedProperties = false;
      state.usersLikedProperties = action.payload;
    });
    builder.addCase(getUsersLikedProperties.rejected, (state, action) => {
      state.loadingLikedProperties = false;
      state.error = action.error.message;
      state.usersLikedProperties = {};
    });

    builder.addCase(getUsersLikedProjects.pending, (state) => {
      state.loadingLikedProjects = true;
    });
    builder.addCase(getUsersLikedProjects.fulfilled, (state, action) => {
      state.loadingLikedProjects = false;
      state.usersLikedProjects = action.payload;
    });
    builder.addCase(getUsersLikedProjects.rejected, (state, action) => {
      state.loadingLikedProjects = false;
      state.error = action.error.message;
      state.usersLikedProjects = {};
    });

    builder.addCase(fetchAgentById.pending, (state) => {
      state.loading = true;
      state.loadingUser = true;
    });
    builder.addCase(fetchAgentById.fulfilled, (state, action) => {
      state.loading = false;
      state.loadingUser = false;
      state.agentData = action.payload;
    });
    builder.addCase(fetchAgentById.rejected, (state, action) => {
      state.loading = false;
      state.loadingUser = false;
      state.error = action.error.message;
    });

    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
      state.error = "";
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.posts = [];
      state.error = action.error.message;
    });

    // Builders
    builder.addCase(fetchbuilders.pending, (state) => {
      state.loadingBuilders = true;
    });
    builder.addCase(fetchbuilders.fulfilled, (state, action) => {
      state.loadingBuilders = false;
      state.builders = action.payload;
      state.error = "";
    });
    builder.addCase(fetchbuilders.rejected, (state, action) => {
      state.loadingBuilders = false;
      state.builders = {};
      state.error = action.error.message;
    });
    // Feature Builders
    builder.addCase(fetchfeaturebuilders.pending, (state) => {
      state.feature_loadingBuilders = true;
    });
    builder.addCase(fetchfeaturebuilders.fulfilled, (state, action) => {
      state.feature_loadingBuilders = false;
      state.feature_builders = action.payload;
      state.error = "";
    });
    builder.addCase(fetchfeaturebuilders.rejected, (state, action) => {
      state.feature_loadingBuilders = false;
      state.feature_builders = {};
      state.error = action.error.message;
    });
    // Agencies
    builder.addCase(fetchAllagencies.pending, (state) => {
      state.loadingAgengies = true;
    });
    builder.addCase(fetchAllagencies.fulfilled, (state, action) => {
      state.loadingAgengies = false;
      state.agencies = action.payload;
      state.error = "";
    });
    builder.addCase(fetchAllagencies.rejected, (state, action) => {
      state.loadingAgengies = false;
      state.agencies = {};
      state.error = action.error.message;
    });
    // EliteAgencies
    builder.addCase(fetchEliteagencies.pending, (state) => {
      state.loadingEliteAgengies = true;
    });
    builder.addCase(fetchEliteagencies.fulfilled, (state, action) => {
      state.loadingEliteAgengies = false;
      state.EliteAgencies = action.payload;
      state.error = "";
    });
    builder.addCase(fetchEliteagencies.rejected, (state, action) => {
      state.loadingEliteAgengies = false;
      state.EliteAgencies = {};
      state.error = action.error.message;
    });
    // Staff
    builder.addCase(fetchAllStaff.pending, (state) => {
      state.loadingAllStaff = true;
    });
    builder.addCase(fetchAllStaff.fulfilled, (state, action) => {
      state.loadingAllStaff = false;
      state.allStaff = action.payload;
      state.error = "";
    });
    builder.addCase(fetchAllStaff.rejected, (state, action) => {
      state.loadingAllStaff = false;
      state.allStaff = {};
      state.error = action.error.message;
    });
  },
});

export const { updatePostRequest, updateUserState } = userSlice.actions;

export default userSlice.reducer;
