import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { request } from "../request";
import { removeEmptyFields } from "../../utils";
import { message } from "antd";

const initialState = {
  loadingChats: false,
  userInbox: {},
  iUserData : {},
  chatsByUserIdData: [],
  messagesByChatIdData: [],
  messagesByUserIdsData: {},
};

export const fetchIUserById = createAsyncThunk(
  "inbox/fetchIUserById",
  async (userId, thunkAPI) => {
    const response = await request
      .get(`user/${userId}`)
      .then((response) => response.data);
    return response;
  }
);

export const postMessage = createAsyncThunk(
  "inbox/postMessage",
  async (payload, thunkAPI) => {
    const response = await request
      .post("/inbox/sendMessage", payload)
      .then((response) => response.data);
    return response;
  }
);

export const getUserInbox = createAsyncThunk(
  "inbox/getUserInbox",
  async (userId, thunkAPI) => {
    const response = await request
      .get(`/inbox/chats/inboxByUserId/${userId}`)
      .then((response) => response.data);
    return response;
  }
);

export const chatsByUserId = createAsyncThunk(
  "inbox/chatsByUserId",
  async (userId, thunkAPI) => {
    const response = await request
      .get(`/inbox/chats/user/${userId}`)
      .then((response) => response.data);
    return response;
  }
);
export const messagesByChatId = createAsyncThunk(
  "inbox/messagesByChatId",
  async (chatId, thunkAPI) => {
    const response = await request
      .get(`/inbox/chats/messagesByChatId/${chatId}`)
      .then((response) => response.data);
    return response;
  }
);
export const messagesByUserIds = createAsyncThunk(
  "inbox/messagesByUserIds",
  async (query, thunkAPI) => {
    const response = await request
      .get(`/inbox/chats/messagesByUserIds?user1=${query?.user1}&user2=${query?.user2}`)
      .then((response) => response.data);
    return response;
  }
);
export const createInbox = createAsyncThunk(
  "inbox/createInbox",
  async (payload, thunkAPI) => {
    const response = await request
      .post("/inbox/createInbox", payload)
      .then((response) => response.data);
    return response;
  }
);

export const deleteChat = createAsyncThunk(
  "inbox/deleteChat",
  async (payload, thunkAPI) => {
    const response = await request
      .delete(`/inbox/user/${payload?.userId}/inboxUser/${payload?.inboxUserId}`)
      .then((response) => response.data);
    return response;
  }
);
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    updateChatState: (state, action) => {
      state[action?.payload?.key] = action?.payload?.value;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(HYDRATE, (state, action) => {
    //   // console.log("HYDRATE", action.payload);

    //   state.updatePost = action.payload.users.updatePost
    //     ? action.payload.users.updatePost
    //     : state.updatePost;
    //   state.users =
    //     action.payload.users.users.length > 0
    //       ? action.payload.users.users
    //       : state.users;
    //   state.posts =
    //     action.payload.users.posts.length > 0
    //       ? action.payload.users.posts
    //       : state.posts;
    // });
    // chatsByUserIdData: {},
    // messagesByChatIdData: {},
    // messagesByUserIdsData: {},

    builder.addCase(fetchIUserById.pending, (state) => {
      state.loadingChats = true;
    });
    builder.addCase(fetchIUserById.fulfilled, (state, action) => {
      state.loadingChats = false;
      state.iUserData = action.payload;
    });
    builder.addCase(fetchIUserById.rejected, (state, action) => {
      state.loadingChats = false;
      state.error = action.error.message;
      state.iUserData = {};
    });

    builder.addCase(chatsByUserId.pending, (state) => {
      state.loadingChats = true;
    });
    builder.addCase(chatsByUserId.fulfilled, (state, action) => {
      state.loadingChats = false;
      state.chatsByUserIdData = action.payload;
      state.error = "";
    });
    builder.addCase(chatsByUserId.rejected, (state, action) => {
      state.loadingChats = false;
      state.chatsByUserIdData = [];
      state.error = action.error.message;
    });

    builder.addCase(getUserInbox.pending, (state) => {
      state.loadingChats = true;
    });
    builder.addCase(getUserInbox.fulfilled, (state, action) => {
      state.loadingChats = false;
      state.userInbox = action.payload;
      state.error = "";
    });
    builder.addCase(getUserInbox.rejected, (state, action) => {
      state.loadingChats = false;
      state.userInbox = {};
      state.error = action.error.message;
    });

    builder.addCase(messagesByChatId.pending, (state) => {
      state.loadingChats = true;
    });
    builder.addCase(messagesByChatId.fulfilled, (state, action) => {
      state.loadingChats = false;
      state.messagesByChatIdData = action.payload;
    });
    builder.addCase(messagesByChatId.rejected, (state, action) => {
      state.loadingChats = false;
      state.messagesByChatIdData = [];
      state.error = action.error.message;
    });
    builder.addCase(messagesByUserIds.pending, (state) => {
      state.loadingChats = true;
    });
    builder.addCase(messagesByUserIds.fulfilled, (state, action) => {
      state.loadingChats = false;
      state.messagesByUserIdsData = action.payload;
    });
    builder.addCase(messagesByUserIds.rejected, (state, action) => {
      state.loadingChats = false
      state.error = action.error.message;
      state.messagesByUserIdsData = {}
    });
  },
});

export const { updateChatState } = chatSlice.actions;

export default chatSlice.reducer;
