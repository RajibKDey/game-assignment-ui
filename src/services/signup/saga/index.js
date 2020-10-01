import { put, takeLatest } from "redux-saga/effects";
import Axios from "axios";
import { ACTION_TYPES, API_END_POINTS, SAGA_ACTIONS } from "../../../constants";

function* workSignup(action) {
  yield put({ type: ACTION_TYPES.SIGNUP_STARTED });
  try {
    const resultData = yield Axios.post(
      `${API_END_POINTS.SIGNUP}`,
      action.payload,
      { headers: { "Content-Type": "application/json" } }
    );
    yield put({
      type: ACTION_TYPES.SIGNUP_SUCCESS,
      payload: resultData.data,
    });
  } catch (err) {
    yield put({ type: ACTION_TYPES.SIGNUP_ERROR, payload: err.response });
  }
}

export default function* watchSignup() {
  yield takeLatest(SAGA_ACTIONS.SIGNUP, workSignup);
}
