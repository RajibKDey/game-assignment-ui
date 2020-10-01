import { ACTION_TYPES } from "../../../constants";

const initialState = {
  loading: false,
  success: false,
  message: "",
  error: false,
  code: false,
};

export default function signupReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.SIGNUP_STARTED:
      return {
        ...state,
        loading: true,
      };
    case ACTION_TYPES.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        message: action.payload.message,
        code: true,
      };
    case ACTION_TYPES.SIGNUP_RESET:
      return {
        ...state,
        code: false,
      };
    case ACTION_TYPES.SIGNUP_ERROR:
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
