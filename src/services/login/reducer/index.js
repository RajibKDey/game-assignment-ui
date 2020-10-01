import { ACTION_TYPES } from "../../../constants";

function addAuthDetailsToLocalStorage(accessToken) {
  localStorage.setItem("accessToken", accessToken);
}

const initialState = {
  accessToken: localStorage.getItem("accessToken") || undefined,
  isAuthenticated: localStorage.getItem("accessToken") ? true : false,
  loading: false,
  success: false,
  message: "",
  error: false,
  code: false,
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_STARTED:
      return {
        ...state,
        loading: true,
      };
    case ACTION_TYPES.LOGIN_SUCCESS:
      let accessToken = action.payload ? action.payload.data : undefined;
      addAuthDetailsToLocalStorage(accessToken);
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        accessToken: accessToken,
        isAuthenticated: true,
        message: action.payload.message,
        code: true,
      };
    case ACTION_TYPES.LOGIN_RESET:
      return {
        ...state,
        code: false,
      };
    case ACTION_TYPES.LOGIN_ERROR:
      return {
        success: action.payload.success,
        ...state,
        code: true,
        loading: false,
        error: true,
        message: action.payload.message,
      };
    case ACTION_TYPES.UN_AUTH_ERROR:
      localStorage.clear();
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        accessToken: undefined,
        error: true,
        message: "Session Timeout! Please SignIn Again",
      };
    default:
      return state;
  }
}
