import Axios from "axios";
import {
  POST_LIST_FAIL,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_CREATE_FAIL,
} from "../constants/postConstants";

export const listPosts = ({ author = "", post = "" }) => async (dispatch) => {
  dispatch({
    type: POST_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      `/api/posts?author=${author}&post=${post}`
    );
    dispatch({ type: POST_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: POST_LIST_FAIL, payload: error.message });
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
