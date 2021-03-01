import {
  SET_BROADCASTS,
  LOADING_DATA,
  ROGER_BROADCAST,
  UNROGER_BROADCAST,
  DELETE_BROADCAST,
  SET_ERRORS,
  CLEAR_ERRORS,
  POST_BROADCAST,
  LOADING_UI,
  SET_BROADCAST,
  STOP_LOADING_UI,
} from "../types";
import axios from "axios";

// Get all broadcasts
export const getBroadcasts = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/broadcasts")
    .then((res) => {
      dispatch({
        type: SET_BROADCASTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_BROADCASTS,
        payload: [],
      });
    });
};

// Get a broadcast
export const getBroadcast = (broadcastId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/broadcast/${broadcastId}`)
    .then((res) => {
      dispatch({
        type: SET_BROADCAST,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

// Post a broadcast
export const postBroadcast = (newBroadcast) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/broadcast", newBroadcast)
    .then((res) => {
      dispatch({
        type: POST_BROADCAST,
        payload: res.data,
      });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Roger a Broadcast
export const rogerBroadcast = (broadcastId) => (dispatch) => {
  axios
    .get(`/broadcast/${broadcastId}/roger`)
    .then((res) => {
      dispatch({
        type: ROGER_BROADCAST,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// UnRoger a Broadcast
export const unRogerBroadcast = (broadcastId) => (dispatch) => {
  axios
    .get(`/broadcast/${broadcastId}/unRoger`)
    .then((res) => {
      dispatch({
        type: UNROGER_BROADCAST,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// Delete a broadcast
export const deleteBroadcast = (broadcastId) => (dispatch) => {
  axios
    .delete(`/broadcast/${broadcastId}`)
    .then(() => {
      dispatch({ type: DELETE_BROADCAST, payload: broadcastId });
    })
    .catch((err) => console.log(err));
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
