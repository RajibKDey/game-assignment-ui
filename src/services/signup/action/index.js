import { ACTION_TYPES, SAGA_ACTIONS } from "../../../constants";

export const signup = (data) => ({
  type: SAGA_ACTIONS.SIGNUP,
  payload: data,
});

export const resetSignup = () => ({
  type: ACTION_TYPES.SIGNUP_RESET,
});
