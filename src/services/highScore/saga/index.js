import { put, takeLatest, select } from "redux-saga/effects";
import Axios from "axios";
import { ACTION_TYPES, API_END_POINTS, SAGA_ACTIONS } from "../../../constants";

function* workHighScore(action) {
  yield put({ type: ACTION_TYPES.HIGH_SCORE_STARTED });
  const accessToken = yield select((state) => state.login.accessToken);
  try {
    const resultData = yield Axios.get(`${API_END_POINTS.HIGH_SCORE}`, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": accessToken,
      },
    });
    yield put({
      type: ACTION_TYPES.HIGH_SCORE_SUCCESS,
      payload: resultData.data,
    });
  } catch (err) {
    yield put({
      type: ACTION_TYPES.HIGH_SCORE_ERROR,
      payload: err.response,
    });
  }
}

export default function* watchHighScore() {
  yield takeLatest(SAGA_ACTIONS.HIGH_SCORE, workHighScore);
}
