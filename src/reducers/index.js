import { combineReducers } from "redux";
import apiReducer from "./api";
import apiFitnessReducer from "./apiFitnessReducer";
import apiInterviewScriptsReducer from "./apiInterviewScriptsReducer";

export default combineReducers({
  apiReducer,
  apiFitnessReducer,
  apiInterviewScriptsReducer
});
