import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  ROGER_BROADCAST,
  UNROGER_BROADCAST,
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  rogers: [],
  bulletins: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case ROGER_BROADCAST:
      return {
        ...state,
        rogers: [
          ...state.rogers,
          {
            userHandle: state.credentials.handle,
            broadcastId: action.payload.broadcastId,
          },
        ],
      };
    case UNROGER_BROADCAST:
      return {
        ...state,
        rogers: state.rogers.filter(
          (roger) => roger.broadcastId !== action.payload.broadcastId
        ),
      };
    default:
      return state;
  }
}
