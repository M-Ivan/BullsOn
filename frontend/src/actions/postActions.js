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
  POST_UNLIKE_ADD_SUCCESS,
  POST_UNLIKE_ADD_REQUEST,
  POST_UNLIKE_ADD_FAIL,
  POST_UNREPOST_ADD_SUCCESS,
  POST_UNREPOST_ADD_REQUEST,
  POST_REPOST_ADD_FAIL,
  POST_REPOST_ADD_SUCCESS,
  POST_REPOST_ADD_REQUEST,
  POST_UNREPOST_ADD_FAIL,
  USER_REPOST_LIST_FAIL,
  USER_REPOST_LIST_REQUEST,
  USER_REPOST_LIST_SUCCESS,
} from "../constants/postConstants";

export const listPosts = ({ profile = "", post = "", repost = "" }) => async (
  dispatch
) => {
  dispatch({
    type: POST_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      `/api/posts?profile=${profile}&repost=${repost}&post=${post}`
    );
    dispatch({ type: POST_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: POST_LIST_FAIL, payload: error.message });
  }
};

export const listReposts = ({ profile = "" }) => async (dispatch) => {
  dispatch({
    type: USER_REPOST_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/posts/reposts?profile=${profile}`);
    dispatch({ type: USER_REPOST_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_REPOST_LIST_FAIL, payload: error.message });
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

export const likePost = (postId) => async (dispatch, getState) => {
  dispatch({ type: POST_LIKE_ADD_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(
      `/api/posts/${postId}/likes`,
      { username: userInfo.username },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: POST_LIKE_ADD_SUCCESS,
      payload: data,
    });
    console.log("data", data);
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: POST_LIKE_ADD_FAIL, payload: message });
  }
};

export const unlikePost = (postId) => async (dispatch, getState) => {
  dispatch({ type: POST_UNLIKE_ADD_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(
      `/api/posts/${postId}/unlike`,
      { username: userInfo.username },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: POST_UNLIKE_ADD_SUCCESS,
      payload: data,
    });
    console.log("data", data);
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: POST_UNLIKE_ADD_FAIL, payload: message });
  }
};

export const repostPost = (postId) => async (dispatch, getState) => {
  dispatch({ type: POST_REPOST_ADD_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(
      `/api/posts/${postId}/repost`,
      { username: userInfo.username },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: POST_REPOST_ADD_SUCCESS,
      payload: data,
    });
    console.log("data", data);
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: POST_REPOST_ADD_FAIL, payload: message });
  }
};

export const unrepostPost = (postId) => async (dispatch, getState) => {
  dispatch({ type: POST_UNREPOST_ADD_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(
      `/api/posts/${postId}/unrepost`,
      { username: userInfo.username },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: POST_UNREPOST_ADD_SUCCESS,
      payload: data,
    });
    console.log("data", data);
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: POST_UNREPOST_ADD_FAIL, payload: message });
  }
};
