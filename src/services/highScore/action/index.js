import { ACTION_TYPES, SAGA_ACTIONS } from "../../../constants";

export const highScore = (data) => ({
  type: SAGA_ACTIONS.HIGH_SCORE,
  payload: data,
});

export const resetHighScore = () => ({
  type: ACTION_TYPES.HIGH_SCORE_RESET,
});
