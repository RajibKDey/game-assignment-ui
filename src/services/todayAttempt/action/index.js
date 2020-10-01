import { ACTION_TYPES, SAGA_ACTIONS } from "../../../constants";

export const todayAttempt = (data) => ({
  type: SAGA_ACTIONS.TODAY_ATTEMPT,
  payload: data,
});

export const resetTodayAttempt = () => ({
  type: ACTION_TYPES.TODAY_ATTEMPT_RESET,
});
