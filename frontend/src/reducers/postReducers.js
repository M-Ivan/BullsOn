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

export const likeAddReducer = (state = {}, action) => {
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
