import { put, takeLatest } from "redux-saga/effects";
import Axios from "axios";
import { ACTION_TYPES, API_END_POINTS, SAGA_ACTIONS } from "../../../constants";

function* workLogin(action) {
  yield put({ type: ACTION_TYPES.LOGIN_STARTED });
  try {
    const resultData = yield Axios.post(
      `${API_END_POINTS.LOGIN}`,
      action.payload,
      { headers: { isAuthRequired: true, "Content-Type": "application/json" } }
    );
    yield put({
      type: ACTION_TYPES.LOGIN_SUCCESS,
      payload: resultData.data,
    });
  } catch (err) {
    yield put({ type: ACTION_TYPES.LOGIN_ERROR, payload: err.response });
  }
}

export default function* watchLogin() {
  yield takeLatest(SAGA_ACTIONS.LOGIN, workLogin);
}
