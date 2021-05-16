import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import postsReducer from "./postsReducer";

export default combineReducers({
  errors: errorReducer,
  posts: postsReducer
});
