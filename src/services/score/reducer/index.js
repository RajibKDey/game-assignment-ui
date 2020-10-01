import { ACTION_TYPES } from "../../../constants";

const initialState = {
  loading: false,
  success: false,
  message: "",
  error: false,
  code: false,
};

export default function saveScoreReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.SAVE_SCORE_STARTED:
      return {
        ...state,
        loading: true,
      };
    case ACTION_TYPES.SAVE_SCORE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        message: action.payload.message,
        code: true,
      };
    case ACTION_TYPES.SAVE_SCORE_RESET:
      return {
        ...state,
        code: false,
      };
    case ACTION_TYPES.SAVE_SCORE_ERROR:
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
