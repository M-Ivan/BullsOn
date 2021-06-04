import {
  COMMENT_LIKE_FAIL,
  COMMENT_LIKE_REQUEST,
  COMMENT_LIKE_RESET,
  COMMENT_LIKE_SUCCESS,
  COMMENT_UNLIKE_FAIL,
  COMMENT_UNLIKE_REQUEST,
  COMMENT_UNLIKE_RESET,
  COMMENT_UNLIKE_SUCCESS,
} from "../constants/commentConstants";

export const commentLikeReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMENT_LIKE_REQUEST:
      return { loading: true };
    case COMMENT_LIKE_SUCCESS:
      return { loading: false, success: true, like: action.payload };
    case COMMENT_LIKE_FAIL:
      return { loading: false, error: action.payload };
    case COMMENT_LIKE_RESET:
      return {};
    default:
      return state;
  }
};

export const commentUnlikeReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMENT_UNLIKE_REQUEST:
      return { loading: true };
    case COMMENT_UNLIKE_SUCCESS:
      return { loading: false, success: true, like: action.payload };
    case COMMENT_UNLIKE_FAIL:
      return { loading: false, error: action.payload };
    case COMMENT_UNLIKE_RESET:
      return {};
    default:
      return state;
  }
};
