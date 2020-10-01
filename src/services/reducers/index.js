import { combineReducers } from "redux";
import loginReducer from "../login/reducer";
import signupReducer from "../signup/reducer";
import todayAttemptReducer from "../todayAttempt/reducer";
import highScoreReducer from "../highScore/reducer";
import saveScoreReducer from "../score/reducer";

const rootReducer = combineReducers({
  login: loginReducer,
  signup: signupReducer,
  todayAttempt: todayAttemptReducer,
  highScore: highScoreReducer,
  saveScore: saveScoreReducer,
});

export default rootReducer;
