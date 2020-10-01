import { all } from "redux-saga/effects";
import watchLogin from "../login/saga";
import watchSignup from "../signup/saga";
import watchTodayAttempt from "../todayAttempt/saga";
import watchHighScore from "../highScore/saga";
import watchSaveScore from "../score/saga";

export default function* rootSaga() {
  yield all([
    watchLogin(),
    watchSignup(),
    watchTodayAttempt(),
    watchHighScore(),
    watchSaveScore(),
  ]);
}
