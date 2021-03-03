import {
  SET_BROADCASTS,
  LOADING_DATA,
  ROGER_BROADCAST,
  UNROGER_BROADCAST,
  DELETE_BROADCAST,
  POST_BROADCAST,
  SET_BROADCAST,
  SUBMIT_SOUNDOFF,
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
    case SET_BROADCAST:
      return {
        ...state,
        broadcast: action.payload,
      };
    case ROGER_BROADCAST:
    case UNROGER_BROADCAST:
      let index = state.broadcasts.findIndex(
        (broadcast) => broadcast.broadcastId === action.payload.broadcastId
      );
      state.broadcasts[index] = action.payload;
      if (state.broadcast.broadcastId === action.payload.broadcastId) {
        state.broadcast = action.payload;
      }
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
    case POST_BROADCAST:
      return {
        ...state,
        broadcasts: [action.payload, ...state.broadcasts],
      };
    case SUBMIT_SOUNDOFF:
      let indexSoundoff = state.broadcasts.findIndex(
        (broadcast) => broadcast.broadcastId === action.payload.broadcastId
      );
      state.broadcasts[indexSoundoff].soundOffCount =
        state.broadcasts[indexSoundoff].soundOffCount + 1;
      return {
        ...state,
        broadcast: {
          ...state.broadcast,
          soundOffCount: state.broadcast.soundOffCount + 1,
          soundoffs: [action.payload, ...state.broadcast.soundoffs],
        },
      };
    default:
      return state;
  }
}
