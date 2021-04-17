import Axios from "axios";
import {
  POST_LIST_FAIL,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_CREATE_FAIL,
  POST_DETAILS_SUCCESS,
  POST_DETAILS_REQUEST,
  POST_DETAILS_FAIL,
  POST_COMMENT_ADD_REQUEST,
  POST_COMMENT_ADD_SUCCESS,
  POST_COMMENT_ADD_FAIL,
  POST_LIKE_ADD_REQUEST,
  POST_LIKE_ADD_SUCCESS,
  POST_LIKE_ADD_FAIL,
} from "../constants/postConstants";

export const listPosts = ({ profile = "", post = "" }) => async (dispatch) => {
  dispatch({
    type: POST_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      `/api/posts?profile=${profile}&post=${post}`
    );
    dispatch({ type: POST_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: POST_LIST_FAIL, payload: error.message });
  }
};

export const detailsPost = (postId) => async (dispatch) => {
  dispatch({ type: POST_DETAILS_REQUEST, payload: postId });
  try {
    const { data } = await Axios.get(`/api/posts/${postId}`);
    dispatch({ type: POST_DETAILS_SUCCESS, payload: data });
    console.log(data);
  } catch (error) {
    dispatch({
      type: POST_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createPost = (post) => async (dispatch, getState) => {
  dispatch({ type: POST_CREATE_REQUEST, payload: { post } });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      "/api/posts",
      { post },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    console.log(data);
    dispatch({
      type: POST_CREATE_SUCCESS,
      payload: data.post,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: POST_CREATE_FAIL, payload: message });
  }
};

export const addComment = (postId, comment) => async (dispatch, getState) => {
  dispatch({ type: POST_COMMENT_ADD_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      `/api/posts/${postId}/comments`,
      {
        comment: comment,
      },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: POST_COMMENT_ADD_SUCCESS,
      payload: data.comment,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: POST_COMMENT_ADD_FAIL, payload: message });
  }
};

export const addLike = (postId) => async (dispatch, getState) => {
  dispatch({ type: POST_LIKE_ADD_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      `/api/posts/${postId}`,
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: POST_LIKE_ADD_SUCCESS,
      payload: data.comment,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: POST_LIKE_ADD_FAIL, payload: message });
  }
};
