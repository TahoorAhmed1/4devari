import { combineReducers } from "@reduxjs/toolkit";
import users from "./users";
import addproperty from "./cloudinaryUpload";
import property from "./property";
import project from "./project";
import propertyQueries from "./propertyQueries";
import chat from "./chats";
import event from "./analytic";

const combinedReducer = combineReducers({
  users,
  addproperty,
  property,
  project,
  propertyQueries,
  chat,
  event,
});

export { combinedReducer };
