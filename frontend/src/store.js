import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import {
  postCreateReducer,
  postListReducer,
  postDetailsReducer,
  commentAddReducer,
  postLikeReducer,
  postUnlikeReducer,
  postRepostReducer,
  postUnrepostReducer,
  repostListReducer,
} from "./reducers/postReducers";
import {
  userDetailsReducer,
  userRegisterReducer,
  userSigninReducer,
} from "./reducers/userReducers";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};
const reducer = combineReducers({
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  postCreate: postCreateReducer,
  postList: postListReducer,
  repostList: repostListReducer,
  postDetails: postDetailsReducer,
  userDetails: userDetailsReducer,
  commentAdd: commentAddReducer,
  postLike: postLikeReducer,
  postUnlike: postUnlikeReducer,
  postRepost: postRepostReducer,
  postUnrepost: postUnrepostReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
