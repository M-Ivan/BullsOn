import {
  COMMENT_LIKE_REQUEST,
  COMMENT_LIKE_SUCCESS,
  COMMENT_LIKE_FAIL,
  COMMENT_UNLIKE_REQUEST,
  COMMENT_UNLIKE_SUCCESS,
  COMMENT_UNLIKE_FAIL,
  COMMENT_DELETE_REQUEST,
  COMMENT_DELETE_SUCCESS,
  COMMENT_DELETE_FAIL,
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
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: COMMENT_UNLIKE_FAIL, payload: message });
    }
  };

export const deleteComment =
  (postId, commentId) => async (dispatch, getState) => {
    dispatch({ type: COMMENT_DELETE_REQUEST, payload: postId, commentId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = Axios.delete(
        `/api/posts/${postId}/comments/${commentId}`,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: COMMENT_DELETE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: COMMENT_DELETE_FAIL, payload: message });
    }
  };
