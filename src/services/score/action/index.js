import { ACTION_TYPES, SAGA_ACTIONS } from "../../../constants";

export const saveScore = (data) => ({
  type: SAGA_ACTIONS.SAVE_SCORE,
  payload: data,
});

export const resetSaveScore = () => ({
  type: ACTION_TYPES.SAVE_SCORE_RESET,
});
