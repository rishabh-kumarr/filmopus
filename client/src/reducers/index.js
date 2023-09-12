import { combineReducers } from "redux";

import posts from "./posts";
import auth from "./auth";

// Used in useSelector in Posts/Posts.js - state.posts
export const reducers = combineReducers({ posts, auth }); 
