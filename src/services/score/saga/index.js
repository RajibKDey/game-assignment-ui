import { put, takeLatest, select } from "redux-saga/effects";
import Axios from "axios";
import { ACTION_TYPES, API_END_POINTS, SAGA_ACTIONS } from "../../../constants";

function* workSaveScore(action) {
  yield put({ type: ACTION_TYPES.SAVE_SCORE_STARTED });
  const accessToken = yield select((state) => state.login.accessToken);
  try {
    const resultData = yield Axios.post(
      `${API_END_POINTS.SAVE_SCORE}`,
      action.payload,
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": accessToken,
        },
      }
    );
    yield put({
      type: ACTION_TYPES.SAVE_SCORE_SUCCESS,
      payload: resultData.data,
    });
  } catch (err) {
    yield put({ type: ACTION_TYPES.SAVE_SCORE_ERROR, payload: err.response });
  }
}

export default function* watchSaveScore() {
  yield takeLatest(SAGA_ACTIONS.SAVE_SCORE, workSaveScore);
}
