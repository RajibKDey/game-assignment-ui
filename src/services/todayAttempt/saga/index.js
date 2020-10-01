import { put, takeLatest, select } from "redux-saga/effects";
import Axios from "axios";
import { ACTION_TYPES, API_END_POINTS, SAGA_ACTIONS } from "../../../constants";

function* workTodayAttempt(action) {
  yield put({ type: ACTION_TYPES.TODAY_ATTEMPT_STARTED });
  const accessToken = yield select((state) => state.login.accessToken);
  try {
    const resultData = yield Axios.get(`${API_END_POINTS.TODAY_ATTEMPT}`, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": accessToken,
      },
    });
    yield put({
      type: ACTION_TYPES.TODAY_ATTEMPT_SUCCESS,
      payload: resultData.data,
    });
  } catch (err) {
    yield put({
      type: ACTION_TYPES.TODAY_ATTEMPT_ERROR,
      payload: err.response,
    });
  }
}

export default function* watchTodayAttempt() {
  yield takeLatest(SAGA_ACTIONS.TODAY_ATTEMPT, workTodayAttempt);
}
