import {
  SET_BROADCASTS,
  LOADING_DATA,
  ROGER_BROADCAST,
  UNROGER_BROADCAST,
  DELETE_BROADCAST,
} from "../types";

const initialState = {
  broadcasts: [],
  broadcast: {},
  loading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_BROADCASTS:
      return {
        ...state,
        broadcasts: action.payload,
        loading: false,
      };
    case ROGER_BROADCAST:
    case UNROGER_BROADCAST:
      let index = state.broadcasts.findIndex(
        (broadcast) => broadcast.broadcastId === action.payload.broadcastId
      );
      state.broadcasts[index] = action.payload;
      return {
        ...state,
      };
    case DELETE_BROADCAST:
      let indexDelete = state.broadcasts.findIndex(
        (broadcast) => broadcast.broadcastId === action.payload
      );
      state.broadcasts.splice(indexDelete, 1);
      return {
        ...state,
      };
    default:
      return state;
  }
}
