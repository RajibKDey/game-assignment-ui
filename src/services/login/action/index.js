import { ACTION_TYPES, SAGA_ACTIONS } from "../../../constants";

export const login = (data) => ({
  type: SAGA_ACTIONS.LOGIN,
  payload: data,
});

export const resetLogin = () => ({
  type: ACTION_TYPES.LOGIN_RESET,
});

export const unAuthError = () => ({
  type: ACTION_TYPES.UN_AUTH_ERROR,
});
