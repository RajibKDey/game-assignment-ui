import { ACTION_TYPES } from "../../../constants";

const initialState = {
  loading: false,
  success: false,
  message: "",
  data: "",
  error: false,
  code: false,
};

export default function highScoreReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.HIGH_SCORE_STARTED:
      return {
        ...state,
        loading: true,
      };
    case ACTION_TYPES.HIGH_SCORE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        data: action.payload.data,
        message: action.payload.message,
        code: true,
      };
    case ACTION_TYPES.HIGH_SCORE_RESET:
      return {
        ...state,
        code: false,
      };
    case ACTION_TYPES.HIGH_SCORE_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload.message,
      };
    default:
      return state;
  }
}
