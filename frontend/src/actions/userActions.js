import Axios from "axios";

import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNOUT,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_FAIL,
  USER_FOLLOW_REQUEST,
  USER_FOLLOW_SUCCESS,
  USER_FOLLOW_FAIL,
  USER_UNFOLLOW_REQUEST,
  USER_UNFOLLOW_SUCCESS,
  USER_UNFOLLOW_FAIL,
} from "../constants/userConstants";

export const register = (
  username,
  email,
  password,
  name,
  lastname,
  description
) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post("/api/users/register", {
      username,
      email,
      password,
      name,
      lastname,
      description,
    });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post("/api/users/signin", { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsUser = (username) => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: username });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/users/${username}`, {
      headers: { Authorization: `Bearer ${userInfo?.token}` },
    });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_DETAILS_FAIL, payload: message });
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_SIGNOUT });
  document.location.href = "/";
};

export const followUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_FOLLOW_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(
      `/api/users/${userId}/follow`,
      { username: userInfo.username },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: USER_FOLLOW_SUCCESS,
      payload: data,
    });
    console.log("data", data);
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_FOLLOW_FAIL, payload: message });
  }
};

export const unfollowUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_UNFOLLOW_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(
      `/api/users/${userId}/unfollow`,
      { username: userInfo.username },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: USER_UNFOLLOW_SUCCESS,
      payload: data,
    });
    console.log("data", data);
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_UNFOLLOW_FAIL, payload: message });
  }
};
