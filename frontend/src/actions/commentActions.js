import {
  COMMENT_LIKE_REQUEST,
  COMMENT_LIKE_SUCCESS,
  COMMENT_LIKE_FAIL,
  COMMENT_UNLIKE_REQUEST,
  COMMENT_UNLIKE_SUCCESS,
  COMMENT_UNLIKE_FAIL,
} from "../constants/commentConstants";
import Axios from "axios";

export const likeComment =
  (postId, commentId) => async (dispatch, getState) => {
    dispatch({ type: COMMENT_LIKE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.put(
        `/api/posts/${postId}/comments/${commentId}/likes`,
        { username: userInfo.username },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: COMMENT_LIKE_SUCCESS,
        payload: data,
      });
      console.log("data", data);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: COMMENT_LIKE_FAIL, payload: message });
    }
  };

export const unlikeComment =
  (postId, commentId) => async (dispatch, getState) => {
    dispatch({ type: COMMENT_UNLIKE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.put(
        `/api/posts/${postId}/comments/${commentId}/unlike`,
        { username: userInfo.username },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: COMMENT_UNLIKE_SUCCESS,
        payload: data,
      });
      console.log("data", data);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: COMMENT_UNLIKE_FAIL, payload: message });
    }
  };
