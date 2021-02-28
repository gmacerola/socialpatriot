import {
  SET_BROADCASTS,
  LOADING_DATA,
  ROGER_BROADCAST,
  UNROGER_BROADCAST,
  DELETE_BROADCAST,
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

export const deleteBroadcast = (broadcastId) => (dispatch) => {
  axios
    .delete(`/broadcast/${broadcastId}`)
    .then(() => {
      dispatch({ type: DELETE_BROADCAST, payload: broadcastId });
    })
    .catch((err) => console.log(err));
};
