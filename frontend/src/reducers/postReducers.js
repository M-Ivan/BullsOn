import {
  POST_CREATE_REQUEST,
  POST_CREATE_RESET,
  POST_CREATE_SUCCESS,
  POST_CREATE_FAIL,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_LIST_FAIL,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  POST_DETAILS_FAIL,
  POST_COMMENT_ADD_FAIL,
  POST_COMMENT_ADD_REQUEST,
  POST_COMMENT_ADD_SUCCESS,
  POST_COMMENT_ADD_RESET,
  POST_LIKE_ADD_REQUEST,
  POST_LIKE_ADD_SUCCESS,
  POST_LIKE_ADD_FAIL,
  POST_LIKE_ADD_RESET,
  POST_UNLIKE_ADD_RESET,
  POST_UNLIKE_ADD_FAIL,
  POST_UNLIKE_ADD_SUCCESS,
  POST_UNLIKE_ADD_REQUEST,
  POST_REPOST_ADD_REQUEST,
  POST_REPOST_ADD_SUCCESS,
  POST_REPOST_ADD_FAIL,
  POST_REPOST_ADD_RESET,
  POST_UNREPOST_ADD_REQUEST,
  POST_UNREPOST_ADD_SUCCESS,
  POST_UNREPOST_ADD_FAIL,
  POST_UNREPOST_ADD_RESET,
  USER_REPOST_LIST_REQUEST,
  USER_REPOST_LIST_SUCCESS,
  USER_REPOST_LIST_FAIL,
} from "../constants/postConstants";

export const postListReducer = (
  state = { loading: true, posts: [] },
  action
) => {
  switch (action.type) {
    case POST_LIST_REQUEST:
      return { loading: true };
    case POST_LIST_SUCCESS:
      return { loading: false, posts: action.payload };
    case POST_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const repostListReducer = (
  state = { loading: true, reposts: [] },
  action
) => {
  switch (action.type) {
    case USER_REPOST_LIST_REQUEST:
      return { loading: true };
    case USER_REPOST_LIST_SUCCESS:
      return { loading: false, reposts: action.payload };
    case USER_REPOST_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case POST_DETAILS_REQUEST:
      return { loading: true };
    case POST_DETAILS_SUCCESS:
      return { loading: false, post: action.payload };
    case POST_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_CREATE_REQUEST:
      return { loading: true };
    case POST_CREATE_SUCCESS:
      return { loading: false, success: true, post: action.payload };
    case POST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case POST_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const commentAddReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_COMMENT_ADD_REQUEST:
      return { loading: true };
    case POST_COMMENT_ADD_SUCCESS:
      return { loading: false, success: true, comment: action.payload };
    case POST_COMMENT_ADD_FAIL:
      return { loading: false, error: action.payload };
    case POST_COMMENT_ADD_RESET:
      return {};
    default:
      return state;
  }
};

export const postLikeReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_LIKE_ADD_REQUEST:
      return { loading: true };
    case POST_LIKE_ADD_SUCCESS:
      return { loading: false, success: true, like: action.payload };
    case POST_LIKE_ADD_FAIL:
      return { loading: false, error: action.payload };
    case POST_LIKE_ADD_RESET:
      return {};
    default:
      return state;
  }
};

export const postUnlikeReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_UNLIKE_ADD_REQUEST:
      return { loading: true };
    case POST_UNLIKE_ADD_SUCCESS:
      return { loading: false, success: true, like: action.payload };
    case POST_UNLIKE_ADD_FAIL:
      return { loading: false, error: action.payload };
    case POST_UNLIKE_ADD_RESET:
      return {};
    default:
      return state;
  }
};

export const postRepostReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_REPOST_ADD_REQUEST:
      return { loading: true };
    case POST_REPOST_ADD_SUCCESS:
      return { loading: false, success: true, like: action.payload };
    case POST_REPOST_ADD_FAIL:
      return { loading: false, error: action.payload };
    case POST_REPOST_ADD_RESET:
      return {};
    default:
      return state;
  }
};

export const postUnrepostReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_UNREPOST_ADD_REQUEST:
      return { loading: true };
    case POST_UNREPOST_ADD_SUCCESS:
      return { loading: false, success: true, like: action.payload };
    case POST_UNREPOST_ADD_FAIL:
      return { loading: false, error: action.payload };
    case POST_UNREPOST_ADD_RESET:
      return {};
    default:
      return state;
  }
};
